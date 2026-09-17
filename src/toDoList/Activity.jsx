import "./styling/Activity.css";

function Activity({ activity, listId }) {
  const filteredActivity = activity
    .filter((item) => item.list_id === listId)
    .sort(
      (a, b) =>
        new Date(b.created_at || b.createdAt) -
        new Date(a.created_at || a.createdAt),
    );

  const getTimeAgo = (dateString) => {
    if (!dateString) return "";

    const now = new Date();
    const date = new Date(dateString);

    const minutes = Math.floor((now - date) / 1000 / 60);

    if (minutes < 1) return "Just nu";
    if (minutes < 60) return `${minutes} min sedan`;

    const hours = Math.floor(minutes / 60);

    if (hours < 24) return `${hours} h sedan`;

    const days = Math.floor(hours / 24);

    return `${days} dagar sedan`;
  };

  const getActivityInfo = (activity) => {
    switch (activity.action_type) {
      case "task_created":
        return {
          icon: "➕",
          text: `${activity.user_username} skapade "${activity.entity_name}"`,
        };

      case "task_updated":
        return {
          icon: "✏️",
          text: `${activity.user_username} uppdaterade "${activity.entity_name}"`,
        };

      case "task_completed":
        return {
          icon: "✓",
          text: `${activity.user_username} slutförde "${activity.entity_name}"`,
        };

      case "points_earned":
        return {
          icon: "🏆",
          text: `${activity.user_username} tjänade ${activity.points} credits`,
        };

      default:
        return {
          icon: "•",
          text: "Ny aktivitet",
        };
    }
  };

  if (!filteredActivity.length) {
    return (
      <div className='activity-empty'>
        <p>Ingen aktivitet ännu</p>
      </div>
    );
  }

  return (
    <div className='activity-list'>
      {filteredActivity.map((activity) => {
        const info = getActivityInfo(activity);

        return (
          <div key={activity.id} className='activity-card'>
            <div className='activity-icon'>{info.icon}</div>

            <div className='activity-content'>
              <p className='activity-text'>{info.text}</p>

              <span className='activity-time'>
                {getTimeAgo(activity.created_at || activity.create_at)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Activity;
