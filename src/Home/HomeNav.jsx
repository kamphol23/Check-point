import "./HomeNav.css";

function HomeNav({ lists }) {
  const activeTasks = lists.filter((list) => list.working_on_id !== null);

  const activeGoals = lists.filter((list) => list.wantedRewardName);

  return (
    <div className='tracker-section'>
      <div className='tracker-header'>
        <h2>Den här veckan</h2>
      </div>

      <div className='tracker-container'>
        <div className='tracker-card'>
          <h2>300</h2>
          <p>Intjänade poäng</p>
        </div>

        <div className='tracker-card'>
          <h2>10</h2>
          <p>Klara uppgifter</p>
        </div>

        <div className='tracker-card'>
          <h2>{activeGoals.length}</h2>
          <p>Pågående mål</p>
        </div>

        <div className='tracker-card'>
          <h2>{activeTasks.length}</h2>
          <p>Pågående uppgifter</p>
        </div>
      </div>
    </div>
  );
}

export default HomeNav;
