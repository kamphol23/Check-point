import React from "react";
import "./styling/ListDisplay.css";
import { useState, useEffect } from "react";
import { getTodayStats } from "../api/lists";
import { Link } from "react-router-dom";

const ListDisplay = ({ lists }) => {
  const [availablePointsAndTasks, setAvailablePointsAndTasks] = useState({});

  const getGoalProgress = (points, wantedRewardPoints) => {
    if (!wantedRewardPoints || wantedRewardPoints === 0) {
      return 0;
    }

    const progress = (points / wantedRewardPoints) * 100;

    return Math.min(progress, 100).toFixed(2);
  };

  useEffect(() => {
    const fetchAvailablePoints = async () => {
      try {
        const data = await Promise.all(
          lists.map(async (list) => {
            const points = await getTodayStats(list.list_id);
            return { listId: list.list_id, points };
          }),
        );
        setAvailablePointsAndTasks(data);
      } catch (error) {
        console.error("Error fetching available points:", error);
      }
    };
    fetchAvailablePoints();
  }, [lists]);

  console.log("availablePointsAndTasks", availablePointsAndTasks);
  return (
    <div className='list-display'>
      {lists.map((list) => {
        const progress = getGoalProgress(list.points, list.wantedRewardCost);
        return (
          <Link
            key={list.list_id}
            to={`/ListDetail/${list.list_id}`}
            state={{ ListTitle: list.list_name }}
            className='list-display-link'>
            <div className='list-display-item'>
              <h3>{list.list_name}</h3>

              <div className='list-tasks'>
                <span>Dagens uppgifter</span>
                <strong>
                  {availablePointsAndTasks.find(
                    (p) => p.listId === list.list_id,
                  )?.points.task_count ?? 0}
                </strong>
              </div>

              <div className='list-points'>
                <span>⭐</span>
                <strong>
                  {availablePointsAndTasks.find(
                    (p) => p.listId === list.list_id,
                  )?.points.available_points ?? 0}
                </strong>
                <span>Möjliga poäng</span>
              </div>

              <div className='list-goal'>
                <div className='goal-header'>
                  <span>
                    🎯 {list.wantedRewardName ?? "Ingen önskad belöning"}
                  </span>

                  <span>{progress}%</span>
                </div>

                <div className='goal-points'>
                  {list.points ?? 0} / {list.wantedRewardCost ?? 0} ⭐
                </div>

                <div className='goal-progress'>
                  <div
                    className='goal-progress-bar'
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className='list-card-arrow'>→</div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ListDisplay;
