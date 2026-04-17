import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import getTodos from "../api/todos";
import isCompleted from "../api/isCompleted";

import CompletedTask from "./CompletedTask";
import DisplayTask from "./DisplayTask";
import AddTask from "./AddTask";

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

  
const completedHandler = async (todo) => {
  console.log("click", todo);
  
  try {
    await isCompleted(todo.id, !todo.completed);
    
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      )
    );


  } catch (error) {
    console.error("Error toggling todo:", error);
  }
 
  };


return (
  <div style={{ display: "flex", gap: "20px" }}>
    <div>
      <h1>{ListTitle}</h1>
      <AddTask setTasks={setTodos} listId={id} />
    </div>

      <DisplayTask
      notCompleted={notCompleted}
      completedHandler={completedHandler}
      />
      
      <CompletedTask 
        CompletedTask={completed} 
       completedHandler={completedHandler} 
      />

  </div>
);
}

export default ListDetail;