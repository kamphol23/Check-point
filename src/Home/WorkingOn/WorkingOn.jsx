import "./WorkingOn.css";

const WorkingOn = ({ lists }) => {
  const activeTasks = lists.filter((list) => list.working_on_id !== null);

  return (
    <div className='workingOn'>
      <div className='workingOn-header'>
        <h2> Pågående uppgifter</h2>
        <span>{activeTasks.length} aktiva</span>
      </div>

      {activeTasks.length > 0 ? (
        <div className='workingOn-list'>
          {activeTasks.map((list) => (
            <div key={list.working_on_id} className='workingOn-card'>
              <div className='workingOn-card-top'>
                <span className='workingOn-group'>{list.list_name}</span>
              </div>

              <h4>{list.working_on_task_name}</h4>

              <div className='workingOn-footer'>
                <span>Pågår just nu</span>
                <span>⚡ Aktiv</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='workingOn-empty'>
          <p>🎉 Inga uppgifter pågår just nu</p>
        </div>
      )}
    </div>
  );
};

export default WorkingOn;
