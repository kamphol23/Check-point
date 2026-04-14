import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import getTodos from "../api/todos";
import isCompleted from "../api/isCompleted";
import CompletedTask from "./CompletedTask";

function ListDetail() {
  const { id } = useParams();
  const location = useLocation();
  const {ListTitle} = location.state || {}; 

  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos(id);
        setTodos(data);
        
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };


    fetchTodos();
  }, [id]);

const completed = todos.filter(t => t.completed);
const notCompleted = todos.filter(t => !t.completed);
  
const toggleTodo = async (todo) => {
  try {
    await isCompleted(todo.id, !todo.completed);
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      )
    );
  } catch (error) {
    console.error("Error toggling todo:", error);
  }};


return (
  <div style={{ display: "flex", gap: "20px" }}>
    <div>
      <h1>{ListTitle}</h1>

      <h2>Not completed</h2>
{notCompleted.map((todo) => (
  <div key={todo.id}>
    <h2>{todo.title}</h2>
    <p>{todo.description}</p>
    <button onClick={() => toggleTodo(todo)}>
      Mark as Completed
    </button>
  </div>
))}
    </div>

<CompletedTask 
  completedTodos={completed} 
  toggleTodo={toggleTodo} 
/>
  </div>
);
}

export default ListDetail;