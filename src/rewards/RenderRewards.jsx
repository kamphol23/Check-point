import react from "react";
import Rewards from "./Rewards";

function RenderRewards({}) {
  return (
    <div className="rewards-container">
        <ol>
        {Rewards.map((reward, index) => (
            <li key={index} className="reward-item">
                <div className="reward-details">
                    <img src={reward.image} alt={reward.title} className="reward-image" />
                    <h3>{reward.title}</h3>
                    <p>{reward.description}</p>
                    <h3>Points: {reward.points}</h3>
                </div>
            </li>
        ))}
        <li className="reward-item">
            <div className="reward-details">
                <h3>Redeem your points</h3>
                <p>To redeem your points, please contact the admin.</p>
                <h3>Note: Points are non-transferable and non-refundable.</h3>
            </div>
        </li>
        </ol>
    </div>
  );
}
export default RenderRewards;