import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getTodayStats } from "../api/lists";

import "./styling/ListDisplay.css";

const ListDisplay = ({ lists }) => {
  const [todayStats, setTodayStats] = useState([]);

  useEffect(() => {
    const fetchTodayStats = async () => {
      try {
        const data = await Promise.all(
          lists.map(async (list) => ({
            listId: list.list_id,
            stats: await getTodayStats(list.list_id),
          })),
        );

        setTodayStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    if (lists.length) {
      fetchTodayStats();
    }
  }, [lists]);

  const getGoalProgress = (currentPoints, targetPoints) => {
    if (!targetPoints) return 0;

    return Math.min((currentPoints / targetPoints) * 100, 100);
  };

  return (
    <div className='list-display'>
      {lists.slice(0, 3).map((list) => {
        const stats =
          todayStats.find((item) => item.listId === list.list_id)?.stats || {};

        const progress = getGoalProgress(
          list.points || 0,
          list.wantedRewardCost || 0,
        );

        return (
          <Link
            key={list.list_id}
            to={`/ListDetail/${list.list_id}`}
            state={{
              ListTitle: list.list_name,
            }}
            className='list-display-link'>
            <div className='list-display-item'>
              <div className='list-card-arrow'>→</div>

              <h3>{list.list_name}</h3>

              <div className='list-tasks'>
                <span>Dagens uppgifter</span>

                <strong>{stats.task_count || 0}</strong>
              </div>

              <div className='list-points'>
                <strong>{stats.available_points || 0}</strong>

                <span>Credits möjliga idag</span>
              </div>

              <div className='list-goal'>
                <div className='goal-header'>
                  <span>{list.wantedRewardName || "Ingen aktiv belöning"}</span>

                  <span>{progress.toFixed(0)}%</span>
                </div>

                <div className='goal-points'>
                  {list.points || 0} / {list.wantedRewardCost || 0}
                </div>

                <div className='goal-progress'>
                  <div
                    className='goal-progress-bar'
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ListDisplay;
