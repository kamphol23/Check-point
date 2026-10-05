import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import getTodos from "../api/todos";
import {
  updateTask,
  updateRewiveRequest,
  updateMemberWorkingOnTask,
} from "../api/addToDb";
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

  // Hitta den nuvarande listan som användaren står i
  const currentList = lists.find(
    (list) => String(list.list_id) === String(listId),
  );

  // Hämtar den tasken som anändaren jobbar på just nu
  const workingTask = todos.find(
    (task) =>
      task.id === currentList?.working_on_id &&
      !task.complet_request &&
      !task.completed,
  );
  const activeTask =
    workingTask && !workingTask.complet_request && !workingTask.completed
      ? workingTask
      : null;

  const onTakeNewTask = () => {
    // Här kopplar vi senare in API-anropet
    // som tilldelar en ny task till användaren.
  };
  // filterar alla task som inte är klara
  const todoTasks = todos.filter(
    (task) =>
      !task.completed &&
      !task.complet_request &&
      task.id !== currentList?.working_on_id,
  );

  // alla task som är klara
  const completedTasks = todos.filter((task) => task.completed);

  //filterar ut alla task som väntar på att bli godkända och lägger det i en list
  const listOfRewive = todos.filter((task) => task.complet_request === true);

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

  const handleStartTask = async (task) => {
    if (!currentList?.list_id || !task?.id) {
      console.error("Missing list or task");
      return;
    }

    try {
      await updateMemberWorkingOnTask(currentList.list_id, task.id, task.title);

      setLists((prev) =>
        prev.map((list) =>
          String(list.list_id) === String(currentList.list_id)
            ? {
                ...list,
                working_on_id: task.id,
                working_on_task_name: task.title,
              }
            : list,
        ),
      );

      setSelectedTask(null);
    } catch (error) {
      console.error("Error starting task:", error);
    }
  };

  const handleIsReadyForRewive = async (task) => {
    const newValue = !task.complet_request;

    try {
      await updateRewiveRequest(task.id, newValue);

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === task.id
            ? {
                ...todo,
                complet_request: newValue,
              }
            : todo,
        ),
      );
    } catch (error) {
      console.error("Kunde inte uppdatera review request:", error);
      throw error;
    }
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
          <span>Väntar granskning</span>
        </div>

        <div className='stat-card'>
          <h3>{currentList?.points ?? 0}</h3>
          <span>Credits</span>
        </div>
      </div>

      <section className='hero-task'>
        {activeTask ? (
          <>
            <div className='hero-task-header'>
              <span className='hero-badge'>⚡ Aktiv uppgift</span>

              <span className='hero-task-hint'>Jobba på den här uppgiften</span>
            </div>

            <TaskCard
              task={activeTask}
              onOpenTask={setSelectedTask}
              status='active'
            />
          </>
        ) : workingTask?.complet_request ? (
          <>
            <div className='hero-task-header'>
              <span className='hero-badge pending'>
                🕐 Väntar på godkännande
              </span>
            </div>

            <div className='hero-pending'>
              <div className='hero-pending-icon'>🕐</div>

              <div className='hero-pending-content'>
                <span className='hero-eyebrow'>Uppgift inskickad</span>

                <h2>{workingTask.title}</h2>

                <p>
                  Du har skickat uppgiften för godkännande. En admin behöver
                  kontrollera den innan den blir godkänd.
                </p>

                <div className='hero-pending-meta'>
                  <span>{workingTask.points} Credits</span>

                  <span>Väntar på admin</span>
                </div>
              </div>
            </div>

            <div className='hero-task-footer'>
              <button
                type='button'
                className='take-task-btn'
                onClick={onTakeNewTask}>
                <span>＋</span>
                Ta en ny uppgift
              </button>

              <span className='hero-footer-info'>
                Du kan fortsätta med en annan uppgift medan denna granskas.
              </span>
            </div>
          </>
        ) : (
          <>
            <div className='hero-empty'>
              <div className='hero-empty-icon'>✨</div>

              <div className='hero-empty-content'>
                <span className='hero-eyebrow'>Redo för nästa?</span>

                <h2>Ingen aktiv uppgift</h2>

                <p>Välj en uppgift från listan och börja samla Credits.</p>
              </div>

              <button
                type='button'
                className='take-task-btn primary'
                onClick={onTakeNewTask}>
                <span>＋</span>
                Ta en ny uppgift
              </button>
            </div>
          </>
        )}
      </section>

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
              <span>{listOfRewive.length}</span>
            </div>
            {listOfRewive.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onOpenTask={setSelectedTask}
                status='waiting'
              />
            ))}
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
        onRewive={handleIsReadyForRewive}
        onStartTask={handleStartTask}
        activeTaskId={currentList?.working_on_id}
      />
    </div>
  );
}

export default ListDetail;
