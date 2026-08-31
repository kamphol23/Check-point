import { getActivity } from "../../api/activityLog";
import { useEffect, useState } from "react";
const History = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getActivity();
        setActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);
  console.log(activities);

  function getTimeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);

    const diffMinutes = Math.floor((now - date) / 1000 / 60);

    if (diffMinutes < 1) return "just nu";
    if (diffMinutes < 60) return `${diffMinutes} min sedan`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} h sedan`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} dagar sedan`;
  }

  const formatActivity = (activity) => {
    switch (activity.action_type) {
      case "task_created":
        return `📝 ${activity.user_username} skapade "${activity.entity_name}"   ${getTimeAgo(activity.create_at)}`;

      case "task_updated":
        return `✏️ ${activity.user_username} uppdaterade "${activity.entity_name}"`;

      case "task_completed":
        return `✅ ${activity.user_username} slutförde "${activity.entity_name}"`;

      case "points_earned":
        return `⭐ ${activity.user_username} tjänade ${activity.points} poäng`;

      default:
        return "Aktivitet";
    }
  };

  return (
    <div className='history'>
      <h1>History</h1>

      {activities.map((activity) => {
        return <div key={activity.id}>{formatActivity(activity)}</div>;
      })}
    </div>
  );
};

export default History;
