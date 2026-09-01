import { getActivity } from "../../api/activityLog";
import { useEffect, useState } from "react";
import "./History.css";

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

  function getTimeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);

    const diffMinutes = Math.floor((now - date) / 1000 / 60);

    if (diffMinutes < 1) return "Just nu";
    if (diffMinutes < 60) return `${diffMinutes} min sedan`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} h sedan`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} dagar sedan`;
  }

  const getActivityInfo = (activity) => {
    switch (activity.action_type) {
      case "task_created":
        return {
          icon: "📝",
          text: `${activity.user_username} skapade "${activity.entity_name}"`,
        };

      case "task_updated":
        return {
          icon: "✏️",
          text: `${activity.user_username} uppdaterade "${activity.entity_name}"`,
        };

      case "task_completed":
        return {
          icon: "✅",
          text: `${activity.user_username} slutförde "${activity.entity_name}"`,
        };

      case "points_earned":
        return {
          icon: "⭐",
          text: `${activity.user_username} tjänade ${activity.points} poäng`,
        };

      default:
        return {
          icon: "🔔",
          text: "Ny aktivitet",
        };
    }
  };

  return (
    <div className='history'>
      <div className='history-header'>
        <h2>📋 Senaste aktivitet</h2>
        <span>{activities.length} händelser</span>
      </div>

      <div className='history-list'>
        {activities.map((activity) => {
          const info = getActivityInfo(activity);

          return (
            <div key={activity.id} className='history-item'>
              <div className='history-icon'>{info.icon}</div>

              <div className='history-content'>
                <p>{info.text}</p>

                <div className='history-meta'>
                  <span>{activity.list_name}</span>
                  <span>•</span>
                  <span>{getTimeAgo(activity.create_at)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;
