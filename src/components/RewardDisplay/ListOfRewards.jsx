import { useState, useEffect } from "react";

import "./ListOfRewards.css";

function ListOfRewards({ lists }) {
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    const listNotEmpty = lists.filter((list) => list.wantedRewardName !== null);
    const sortedRewards = listNotEmpty.sort(
      (a, b) => a.wantedRewardCost - b.wantedRewardCost,
    );
    setRewards(sortedRewards);
  }, [lists]);

  const getProgress = (current, target) => {
    if (!target) return 0;
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className='list-of-rewards'>
      <div className='rewards-header'>
        <h2>Belöningar</h2>
      </div>

      {rewards.length === 0 ? (
        <p>Inga belöningar hittades.</p>
      ) : (
        <div>
          {rewards.map((reward, index) => (
            <div className='rewards-list-card' key={index}>
              <h3>{reward.wantedRewardName}</h3>

              <div className='reward-info'>
                <p>Poäng: {reward.points}</p>
                <p>Mål: {reward.wantedRewardCost}</p>
              </div>
              <div className='reward-list-progress'>
                <div
                  className='reward-progress-bar'
                  style={{
                    width: `${getProgress(reward.points, reward.wantedRewardCost)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListOfRewards;
