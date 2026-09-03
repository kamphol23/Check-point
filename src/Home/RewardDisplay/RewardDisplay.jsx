import { useState, useEffect } from "react";
import "./RewardDisplay.css";
function RewardDisplay({ lists }) {
  const [reward, setReward] = useState(null);

  useEffect(() => {
    if (!lists?.length) return;

    const rewards = lists
      .filter((list) => list.wantedRewardName && list.wantedRewardCost > 0)
      .map((list) => ({
        listName: list.list_name,
        rewardName: list.wantedRewardName,
        rewardCost: list.wantedRewardCost,
        currentPoints: list.points || 0,
        progress: ((list.points || 0) / list.wantedRewardCost) * 100,
      }))
      .sort((a, b) => b.progress - a.progress);

    setReward(rewards[0] || null);
  }, [lists]);

  const getProgress = (current, target) => {
    if (!target) return 0;
    return Math.min((current / target) * 100, 100);
  };

  if (!reward) {
    return (
      <div className='reward-display'>
        <h2>Nästa belöning</h2>
        <p>Inga aktiva belöningar hittades.</p>
      </div>
    );
  }

  return (
    <div className='reward-display'>
      <div className='reward-info'>
        <h2>{reward.rewardName}</h2>
        <p className='reward-points'>
          {reward.currentPoints} / {reward.rewardCost} ⭐
        </p>
      </div>

      <div className='reward-progress'>
        <div
          className='reward-progress-bar'
          style={{
            width: `${getProgress(reward.currentPoints, reward.rewardCost)}%`,
          }}></div>
      </div>
      <div>
        <h3>
          {getProgress(reward.currentPoints, reward.rewardCost).toFixed(1)}%
        </h3>
        <p>{reward.rewardCost - reward.currentPoints} kvar</p>
      </div>
    </div>
  );
}

export default RewardDisplay;
