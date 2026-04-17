import './TodoList.css'

const CompletedTask = ({CompletedTask,completedHandler,deleteHandler}) =>{

  if(CompletedTask.length === 0){
    return <p>No completed tasks yet.</p>;
  }
    return(
        <div>
        <h2>Completed</h2>
        {CompletedTask.map((todo) => (
          <div key={todo.id} className="completed-task">
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <button onClick={() => completedHandler(todo)}>Mark as Not Completed</button>
            <button onClick={() => deleteHandler(todo.id)}>Delete</button>  
          </div>
        ))}
       </div>
    )

}
export default CompletedTask