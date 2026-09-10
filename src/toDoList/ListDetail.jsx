import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import getTodos from "../api/todos";
import { getMemberLists, getListMembers } from "../api/lists";

import RewardDisplay from "../components/RewardDisplay/RewardDisplay";
import TaskCard from "./TaskCard";
import EditTask from "../components/EditTask";
import AddTask from "./AddTask";

import "./styling/ListDetail.css";

function ListDetail() {
  const { id: listId } = useParams();
  const location = useLocation();

  const { ListTitle } = location.state || {};

  const [todos, setTodos] = useState([]);
  const [lists, setLists] = useState([]);
  const [membersOfList, setMemberOfList] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const todoData = await getTodos(listId);
      const listData = await getMemberLists();
      const allMembers = await getListMembers(listId);

      setTodos(todoData || []);
      setLists(listData);
      setMemberOfList(allMembers);
    };

    fetchData();
  }, [listId]);

  const activeList = lists[0];

  const todoTasks = todos.filter(
    (task) => !task.completed && task.id !== activeList?.working_on_id,
  );

  const workingTasks = todos.filter(
    (task) => task.id === activeList?.working_on_id,
  );

  const completedTasks = todos.filter((task) => task.completed);

  return (
    <div className='list-detail'>
      <div className='list-header'>
        <div>
          <h1>{ListTitle}</h1>

          <div className='list-meta'>
            <span>{todos.length} uppgifter totalt</span>

            <div className='member-list'>
              {membersOfList.map((member) => (
                <div className='member-avatar'>
                  {member.userName.charAt(0).toUpperCase()}
                </div>
              ))}

              <span className='member-count'>
                {membersOfList.length} medlemmar
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='list-stats'>
        <div className='stat-card todo'>
          <h3>{todoTasks.length}</h3>
          <span>Att göra</span>
        </div>

        <div className='stat-card progress'>
          <h3>{workingTasks.length}</h3>
          <span>Pågår</span>
        </div>

        <div className='stat-card completed'>
          <h3>{completedTasks.length}</h3>
          <span>Klara</span>
        </div>

        <div className='stat-card credits'>
          <h3>{activeList?.points || 0}</h3>
          <span>Credits</span>
        </div>
      </div>

      <RewardDisplay lists={lists} />

      <div className='task-board'>
        <section className='todo-list'>
          <div className='todo-list-header'>
            <h2>Att göra ({todoTasks.length})</h2>

            <AddTask listId={listId} setTasks={setTodos} />
          </div>

          <div className='task-list'>
            {todoTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={() => setSelectedTask(task)}
              />
            ))}
          </div>
        </section>

        <div className='right-panel'>
          <section className='active-task-card'>
            <div className='panel-header'>
              <h2>Aktiv uppgift</h2>
            </div>

            {workingTasks.length > 0 ? (
              workingTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={() => setSelectedTask(task)}
                />
              ))
            ) : (
              <p className='empty-state'>Ingen aktiv uppgift</p>
            )}
          </section>

          <section className='panel-card'>
            <div className='panel-header'>
              <h2>Klara ({completedTasks.length})</h2>
            </div>

            <div className='task-list'>
              {completedTasks.slice(0, 5).map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </section>
        </div>
      </div>

      <EditTask task={selectedTask} onClose={() => setSelectedTask(null)} />
    </div>
  );
}

export default ListDetail;
