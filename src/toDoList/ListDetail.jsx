import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import getTodos from "../api/todos";
import { updateTask } from "../api/addToDb";
import { getMemberLists, getListMembers } from "../api/lists";
import { getActivity } from "../api/activityLog";
import { deleteTask } from "../api/delete";

import RewardDisplay from "../components/RewardDisplay/RewardDisplay";
import TaskCard from "./TaskCard";
import EditTask from "../components/EditTask";
import AddTask from "./AddTask";
import Activity from "./Activity";

import "./styling/ListDetail.css";

function ListDetail() {
  const { id: listId } = useParams();
  const location = useLocation();

  const { ListTitle } = location.state || {};

  const [todos, setTodos] = useState([]);
  const [lists, setLists] = useState([]);
  const [membersOfList, setMembersOfList] = useState([]);
  const [activity, setActivity] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [todoData, listData, memberData, activityData] =
          await Promise.all([
            getTodos(listId),
            getMemberLists(),
            getListMembers(listId),
            getActivity(),
          ]);

        setTodos(todoData || []);
        setLists(listData || []);
        setMembersOfList(memberData || []);
        setActivity(activityData || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [listId]);

  const currentList = lists.find(
    (list) => String(list.list_id) === String(listId),
  );

  const workingTask = todos.find(
    (task) => task.id === currentList?.working_on_id,
  );

  const todoTasks = todos.filter(
    (task) => !task.completed && task.id !== currentList?.working_on_id,
  );

  const completedTasks = todos.filter((task) => task.completed);

  const handelUpdatedTask = async (updatedTask) => {
    if (!updatedTask.title.trim()) {
      return {
        success: false,
        error: "Titel får inte vara tom",
      };
    }

    if (updatedTask.points <= 0) {
      return {
        success: false,
        error: "Credits måste vara större än 0",
      };
    }

    try {
      const data = await updateTask(
        updatedTask.id,
        updatedTask.title,
        updatedTask.description,
        updatedTask.assigned_to,
        updatedTask.points,
      );

      setTodos((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
      );

      return { success: true };
    } catch (error) {
      console.log(error);

      return {
        success: false,
        error: "Kunde inte spara ändringarna",
      };
    }
  };
  const handleCompleteTask = async (task) => {
    // API-anrop
  };

  const handleReopenTask = async (task) => {
    // API-anrop
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);

      setTodos((prev) => prev.filter((task) => task.id !== taskId));

      setSelectedTask(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='list-detail'>
      <header className='list-header'>
        <h1>{ListTitle}</h1>

        <div className='list-meta'>
          <span>{todos.length} uppgifter totalt</span>

          <div className='member-list'>
            {membersOfList.map((member) => (
              <div key={member.userName} className='member-avatar'>
                {member.userName.charAt(0).toUpperCase()}
              </div>
            ))}

            <span className='member-count'>
              {membersOfList.length} medlemmar
            </span>
          </div>
        </div>
      </header>

      <RewardDisplay lists={currentList ? [currentList] : []} />

      <div className='task-layout'>
        <section className='todo-section'>
          <div className='section-header'>
            <h2>Att göra</h2>

            <AddTask listId={listId} setTasks={setTodos} />
          </div>

          <div className='task-list'>
            {todoTasks.map((task) => (
              <TaskCard
                task={task}
                onOpenTask={setSelectedTask}
                status={"todo"}
              />
            ))}
          </div>
        </section>

        <aside className='focus-panel'>
          <div className='side-section'>
            <h2>Aktiv uppgift</h2>
            <br />

            {workingTask ? (
              <TaskCard
                task={workingTask}
                onOpenTask={workingTask}
                status={"active"}
              />
            ) : (
              <div className='empty-state'>Ingen aktiv uppgift</div>
            )}
          </div>

          <div className='side-section'>
            <h3>Gruppmedlemmar</h3>

            <div className='member-row'>
              {membersOfList.map((member) => (
                <div key={member.userName} className='member-avatar'>
                  {member.userName.charAt(0).toUpperCase()}
                </div>
              ))}
            </div>
          </div>

          <div className='side-section'>
            <h3>Senaste aktivitet</h3>

            <Activity activity={activity} listId={listId} />
          </div>
        </aside>
      </div>

      <section className='completed-section'>
        <div className='section-header'>
          <h2>Klara uppgifter</h2>

          <span>{completedTasks.length} klara</span>
        </div>

        <div className='completed-grid'>
          {completedTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </section>
      <EditTask
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onSave={handelUpdatedTask}
        onDelete={handleDeleteTask}
        onComplete={handleCompleteTask}
        onReopen={handleReopenTask}
      />
    </div>
  );
}

export default ListDetail;
