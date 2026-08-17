import React from "react";
import "./styling/ListDisplay.css";

const ListDisplay = ({ lists }) => {
  const getGoalProgress = (points, wantedRewardPoints) => {
    if (!wantedRewardPoints || wantedRewardPoints === 0) {
      return 0;
    }

    const progress = (points / wantedRewardPoints) * 100;

    return Math.min(progress, 100).toFixed(2);
  };

  return (
    <div className='list-display'>
      {lists.map((list) => {
        const progress = getGoalProgress(list.points, list.wantedRewardCost);
        return (
          <div key={list.list_id} className='list-display-item'>
            <h3>{list.list_name}</h3>

            <div className='list-tasks'>
              <span>Dagens uppgifter</span>
              <strong>3 uppgifter</strong>
            </div>

            <div className='list-points'>
              <span>⭐</span>
              <strong>{list.points ?? 0}</strong>
              <span>poäng</span>
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
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListDisplay;
