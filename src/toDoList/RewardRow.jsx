import { TbGift, TbChevronRight } from "react-icons/tb";
import "./styling/RewardRow.css";

function RewardRow({ reward }) {
  if (!reward) return null;
  console.log("RewardRow rendered with reward:", reward);
  return (
    <button
      type='button'
      className='reward-row'
      aria-label={`Öppna belöningen ${reward.name}`}>
      <div className='reward-row-icon'>
        <TbGift size={23} />
      </div>

      <div className='reward-row-content'>
        <h3 className='reward-row-title'>{reward.name}</h3>
        {reward.description && (
          <p className='reward-row-description'>{reward.description}</p>
        )}
      </div>

      <span className='reward-row-credits'>{reward.value} Credits</span>

      <TbChevronRight
        className='reward-row-chevron'
        size={20}
        aria-hidden='true'
      />
    </button>
  );
}

export default RewardRow;
