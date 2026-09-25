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
        updatedTask.due_date,
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
        <div>
          <h1>{ListTitle}</h1>
        </div>

        <div className='list-meta'>
          <span>{todos.length} uppgifter totalt</span>

          <div className='member-list'>
            {membersOfList.map((member) => (
              <div key={member.userName} className='member-avatar'>
                {member.userName.charAt(0).toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      </header>

      <RewardDisplay lists={currentList ? [currentList] : []} />

      <div className='dashboard-stats'>
        <div className='stat-card'>
          <h3>{todos.length}</h3>
          <span>Totala uppgifter</span>
        </div>

        <div className='stat-card'>
          <h3>{workingTask ? 1 : 0}</h3>
          <span>Aktiv uppgift</span>
        </div>

        <div className='stat-card'>
          <h3>{completedTasks.length}</h3>
          <span>Klara uppgifter</span>
        </div>

        <div className='stat-card'>
          <h3>80</h3>
          <span>Credits kvar</span>
        </div>
      </div>

      {workingTask && (
        <section className='hero-task'>
          <div className='hero-task-header'>
            <span className='hero-badge'>⚡ Aktiv uppgift</span>
          </div>

          <TaskCard
            task={workingTask}
            onOpenTask={setSelectedTask}
            status='active'
          />
        </section>
      )}

      <div className='dashboard-layout'>
        <div className='main-content'>
          <section className='todo-section'>
            <div className='section-header'>
              <h2>Att göra</h2>

              <AddTask listId={listId} setTasks={setTodos} />
            </div>

            <div className='task-list'>
              {todoTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onOpenTask={setSelectedTask}
                  status='todo'
                />
              ))}
            </div>
          </section>

          <section className='activity-section'>
            <div className='section-header'>
              <h2>Aktivitet</h2>
            </div>

            <Activity activity={activity} listId={listId} />
          </section>
        </div>

        <aside className='right-sidebar'>
          <div className='sidebar-card'>
            <div className='card-header'>
              <h3>⏳ Väntar på godkännande</h3>
              <span>0</span>
            </div>

            <div className='empty-state'>Inga uppgifter väntar</div>
          </div>

          <div className='sidebar-card'>
            <div className='card-header'>
              <h3>🎁 Mina belöningar</h3>
            </div>

            <RewardDisplay lists={currentList ? [currentList] : []} />
          </div>

          <div className='sidebar-card add-reward-card'>
            <h3>Lägg till egen belöning</h3>

            <p>Har du något du vill spara till?</p>

            <button className='add-reward-btn'>+ Skapa belöning</button>
          </div>

          <div className='sidebar-card'>
            <h3>👥 Medlemmar</h3>

            <div className='member-list-vertical'>
              {membersOfList.map((member) => (
                <div key={member.userName} className='member-item'>
                  <div className='member-avatar'>
                    {member.userName.charAt(0).toUpperCase()}
                  </div>

                  <span>{member.userName}</span>
                </div>
              ))}
            </div>
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
            <TaskCard
              key={task.id}
              task={task}
              onOpenTask={setSelectedTask}
              status='completed'
            />
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
