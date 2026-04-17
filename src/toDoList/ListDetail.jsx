import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import getTodos from "../api/todos";
import isCompleted from "../api/isCompleted";

import CompletedTask from "./CompletedTask";
import DisplayTask from "./DisplayTask";
import AddTask from "./AddTask";
import { deleteTask } from "../api/delete";

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

  const deleteHandler = async (todoId) => {
    try {
      console.log("delete", todoId);
      await deleteTask(todoId);
      setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todoId));
    } catch (error) {
      console.error("Error deleting todo:", error);
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
      deleteHandler={deleteHandler}
      />
      
      <CompletedTask 
      CompletedTask={completed} 
       completedHandler={completedHandler} 
       deleteHandler={deleteHandler}
      />

  </div>
);
}

export default ListDetail;