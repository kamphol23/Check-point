import getTodos from "../api/todos";

import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import displayTask from "./DisplayTask";
import completedTask from "./CompletedTask";

function ListDetail() {
  const listId = useParams().id;
  const location = useLocation();
  const { ListTitle } = location.state || {};
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const todos = await getTodos(listId);
        setTodo(todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodo();
  }, [listId]);
  console.log(todo);
  return (
    <div>
      <h2>{ListTitle}</h2>
      {todo != null &&
        todo.map((task) => (
          <div key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
        ))}
      <p>can see the list id</p>
      <p>can see the list name</p>
      <p>can see the the tracker of the rewards</p>
      <p> can see the task that should be completed today</p>
      <p> can see all the tasks</p>
      <p> can see the members of the list</p>
      <p>can see the task that you working on </p>
      <p>can see the history of the list </p>
      <p>can add new tasks to the list </p>
      <p>can update existing tasks </p>
    </div>
  );
}

export default ListDetail;
