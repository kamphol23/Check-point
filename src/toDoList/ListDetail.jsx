import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../api/supabaseClient";

function ListDetail() {
  const { id } = useParams();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("list_id", id);

      if (error) {
        console.error(error);
        return;
      }

      setTodos(data);
    };

    fetchTodos();
  }, [id]);

  console.log(todos);
  
  return (
    <div>
      <h1>Todos</h1>

      {todos.map((todo) => (
        <div key={todo.id}>{todo.description}</div>
      ))}
    </div>
  );
}

export default ListDetail;