import './TodoList.css'

const CompletedTask = ({completedTodos,toggleTodo}) =>{
   
    return(
        <div className='completed-task-wrapper'>
        <h2>Completed Task</h2>   
        {completedTodos.map((todo) => (
          <div key={todo.id} className="completed-task">
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <button onClick={() => toggleTodo(todo)}>Mark as Not Completed</button>
          </div>
        ))}
       </div>
    )
}
export default CompletedTask