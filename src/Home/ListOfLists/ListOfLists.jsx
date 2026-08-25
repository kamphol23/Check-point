import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTodayStats } from "../../api/lists";

import "./ListOfLists.css";

function ListOfLists({ lists }) {
  const [availablePointsAndTasks, setAvailablePointsAndTasks] = useState([]);

  useEffect(() => {
    const fetchAvailablePoints = async () => {
      try {
        const data = await Promise.all(
          lists.map(async (list) => {
            const points = await getTodayStats(list.list_id);

            return {
              listId: list.list_id,
              points,
            };
          }),
        );

        setAvailablePointsAndTasks(data);
      } catch (error) {
        console.error("Error fetching available points:", error);
      }
    };

    fetchAvailablePoints();
  }, [lists]);

  const getStats = (listId) =>
    availablePointsAndTasks.find((p) => p.listId === listId)?.points;

  return (
    <div className='group-list'>
      {lists.map((list, index) => {
        const stats = getStats(list.list_id);

        return (
          <Link
            key={list.list_id}
            to={`/lists/${list.list_id}`}
            className='group-card'>
            <div className={`group-icon group-color-${(index % 3) + 1}`}>
              {index === 0 ? "🏠" : index === 1 ? "🏫" : "💼"}
            </div>

            <div className='group-info'>
              <h3>{list.list_name}</h3>
            </div>

            <div className='group-stats'>
              <p>{stats?.task_count ?? 0} uppgifter idag</p>

              <div className='group-points'>
                ⭐ {stats?.available_points ?? 0}
              </div>
            </div>

            <div className='group-arrow'>›</div>
          </Link>
        );
      })}

      <Link to='/lists' className='all-groups-btn'>
        Gå till mina grupper →
      </Link>
    </div>
  );
}

export default ListOfLists;
