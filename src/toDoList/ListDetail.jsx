import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import getTodos from "../api/todos";
import isCompleted from "../api/isCompleted";
import { deleteTask } from "../api/delete";
import { updateTask, updateListName } from "../api/addToDb";

import CompletedTask from "./CompletedTask";
import DisplayTask from "./DisplayTask";
import AddTask from "./AddTask";



function ListDetail() {
  const { id } = useParams();
  const location = useLocation();
  const {ListTitle} = location.state || {}; 
  const [todos, setTodos] = useState([]);
  const [editingListName, setEditingListName] = useState(false);
  const [newListName, setNewListName] = useState(ListTitle || '');
  
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos(id);
        console.log("I run");
        
        setTodos(data); 
        setNewListName(ListTitle || '');
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

  const updateTaskHandler = async (todoId, newTitle, newDescription) => {
    try {
      await updateTask(todoId, newTitle, newDescription);
      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t.id === todoId ? { ...t, title: newTitle, description: newDescription } : t
        )
      );
    }
      catch (error) { 
        console.error("Error updating todo:", error);
      }
  };

  const updateListNameHandler = async (listId, newName) => {
    try {
      await updateListName(listId, newName);
      
      
    } catch (error) {
      console.error("Error updating list name:", error);
    }
  };


return (
  <div style={{ display: "flex", gap: "20px" }}>
    <div>
      <h1>{newListName}</h1>
      {editingListName ? (
        <form onSubmit={(e) => {
          e.preventDefault();
          updateListNameHandler(id, newListName);
          setEditingListName(false);
        }}>
          <input
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="Edit list name"
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <button onClick={() => setEditingListName(true)}>Edit List Name</button>
      )}

      <AddTask setTasks={setTodos} listId={id} />
    </div>

      <DisplayTask
      notCompleted={notCompleted}
      completedHandler={completedHandler}
      deleteHandler={deleteHandler}
      updateTaskHandler={updateTaskHandler}
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