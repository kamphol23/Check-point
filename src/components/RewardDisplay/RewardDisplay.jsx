import { useEffect, useState } from "react";
import "./RewardDisplay.css";

function RewardDisplay({ lists }) {
  const [reward, setReward] = useState(null);

  useEffect(() => {
    if (!lists?.length) return;

    const closestReward = lists
      .filter((list) => list.wantedRewardName && list.wantedRewardCost > 0)
      .map((list) => {
        const currentPoints = list.points || 0;
        const rewardCost = list.wantedRewardCost;

        return {
          listName: list.list_name,
          rewardName: list.wantedRewardName,
          rewardCost,
          currentPoints,
          progress: Math.min((currentPoints / rewardCost) * 100, 100),
        };
      })
      .sort((a, b) => b.progress - a.progress)[0];

    setReward(closestReward || null);
  }, [lists]);

  if (!reward) {
    return (
      <div className='reward-display'>
        <h2>Nästa belöning</h2>
        <p>Inga aktiva belöningar hittades.</p>
      </div>
    );
  }

  const pointsLeft = Math.max(reward.rewardCost - reward.currentPoints, 0);

  return (
    <div className='reward-display'>
      <div className='reward-info'>
        <span className='reward-label'>Nästa belöning</span>

        <h2>{reward.rewardName}</h2>

        <p className='reward-points'>
          {reward.currentPoints.toLocaleString()} /{" "}
          {reward.rewardCost.toLocaleString()} Credits
        </p>
      </div>

      <div className='reward-progress-wrapper'>
        <div className='reward-progress'>
          <div
            className='reward-progress-bar'
            style={{
              width: `${reward.progress}%`,
            }}
          />
        </div>
      </div>

      <div className='reward-stats'>
        <h3>{Math.round(reward.progress)}%</h3>

        <p>
          {(reward.rewardCost - reward.currentPoints).toLocaleString()} kvar
        </p>
      </div>
    </div>
  );
}

export default RewardDisplay;
