import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../api/supabaseClient";
import CompletedTask from "./CompletedTask";

function ListDetail() {
  const { id } = useParams();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from("todos")
        .select("*") 
        .eq("list_id", id);

        console.log(typeof id);
        console.log("Data returned:", data);
      if (error) {
        console.error(error);
        return;
      }

      setTodos(data);
    };

    fetchTodos();
  }, [id]);

  const completedTodos = todos.filter(todo => todo.completed);
  const incompleteTodos = todos.filter(todo => !todo.completed);

  const toggleTodo = async (todo) => {
    const { data, error } = await supabase
      .from("todos")
      .update({ completed: !todo.completed })
      .eq("id", todo.id);

    if (error) {
      console.error(error);
      return;
    }

    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === todo.id ? { ...t, completed: !t.completed } : t))
    );
  };


return (
  <div style={{ display: "flex", gap: "20px" }}>
    
    {/* EJ KLARA TODOS */}
    <div style={{ flex: 1 }}>
      <h1>Att göra</h1>
      {incompleteTodos.map((todo) => (
        <div key={todo.id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <h2>{todo.title}</h2>
          <p>{todo.description}</p>
          <button onClick={() => toggleTodo(todo)}>
            Markera som klar
          </button>
        </div>
      ))}
    </div>

      < CompletedTask completedTasks={completedTodos} handleUnComplete={toggleTodo} />
  </div>
);
}

export default ListDetail;