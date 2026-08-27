import "./PersonalGoal.css";

function PersonalGoal({ goals }) {
  const getProgress = (current, target) => {
    if (!target) return 0;
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className='personal-goal'>
      <div className='personal-goal-header'>
        <h3>Personliga mål</h3>
      </div>

      {goals.length > 0 ? (
        <div className='goal-list'>
          {goals.map((goal, index) => {
            const progress = getProgress(
              goal.amount_done,
              goal.days_of_week.length,
            );

            return (
              <div key={goal.id} className='goal-card'>
                <div className='goal-content'>
                  <div className='goal-top'>
                    <div>
                      <h3>{goal.title}</h3>

                      <span>
                        {goal.days_of_week.length} /
                        {goal.amount_done === null ? 0 : goal.amount_done}
                      </span>
                    </div>

                    <div className='goal-right'>
                      <strong>{progress.toFixed(0)}%</strong>

                      <span>+{goal.points} ⭐</span>
                    </div>
                  </div>

                  <div className='goal-progress'>
                    <div
                      className={`goal-progress-bar goal-color-${(index % 3) + 1}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <div className='group-arrow'>›</div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Inga personliga mål hittades.</p>
      )}

      <button className='all-goals-btn'>Se alla mål →</button>
    </div>
  );
}

export default PersonalGoal;
