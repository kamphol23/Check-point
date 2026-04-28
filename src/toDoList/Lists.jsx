import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoTrash } from "react-icons/go";

import AddList from "./AddList";
import { getMemberLists } from "../api/lists";
import { deleteList, deleteListMembers, deleteAllTasks } from "../api/delete";

function Lists() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const data = await getMemberLists();
        setLists(data);
      } catch (error) {
        console.error("Error fetching lists:", error);
        setError("Failed to load lists");
      } finally {
        setLoading(false);
      }
    };
    fetchLists();
  }, []);

  const isOwner = lists.filter((list) => list.isOwner);
  const isMember = lists.filter((list) => !list.isOwner);

  const handleListAdded = (newList) => {
    const formattedList = {
      list_id: newList.id,
      list_name: newList.title,
      isOwner: true,
    };

    setLists((prev) => {
      const updated = [...prev, formattedList];
      console.log("Updated lists:", updated);
      return updated;
    });
  };

  const handleDeleteList = async (listId) => {
    try {
      await deleteAllTasks(listId);
      await deleteListMembers(listId);
      await deleteList(listId);
      setLists((prev) => prev.filter((list) => list.list_id !== listId));
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  return (
    <div>
      <div className='lists-wrapper'>
        <h1 className='list-title'>Dashboard</h1>

        <div className='lists-container'>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}

          {!loading && lists.length === 0 && <p>No lists found.</p>}

          <div className='owned-lists-container'>
            <div>
              <h2>Your lists</h2>
              <AddList handleListAdded={handleListAdded} />
            </div>

            <div className='owned-lists'>
              {isOwner.length === 0 ? (
                <p>You don't own any lists.</p>
              ) : (
                isOwner.map((list) => (
                  <div key={list.list_id} className='owned-list-item'>
                    <div className='btn-container'>
                      <button onClick={() => handleDeleteList(list.list_id)}>
                        <GoTrash className='trashcan' />
                      </button>
                    </div>

                    <Link
                      to={`/ListDetail/${list.list_id}`}
                      state={{ ListTitle: list.list_name }}>
                      <div className='owned-list-background'></div>
                      <div className='list-link'>
                        <span>{list.list_name}</span>
                      </div>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className='member-lists-container'>
            <h2>Member lists</h2>
            <div className='member-lists'>
              {isMember.length === 0 ? (
                <p>You are not a member of any lists.</p>
              ) : (
                isMember.map((list) => (
                  <div key={list.list_id} className='member-list-item'>
                    <Link
                      to={`/ListDetail/${list.list_id}`}
                      state={{ ListTitle: list.list_name }}>
                      <div className='member-list-background'></div>
                      <div className='list-link'>
                        <span>{list.list_name}</span>
                      </div>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lists;
