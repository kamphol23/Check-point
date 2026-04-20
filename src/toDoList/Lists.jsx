import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

 const isOwner = lists.filter(list => list.isOwner);
 const isMember = lists.filter(list => !list.isOwner);

const handleListAdded = (newList) => {

    const formattedList = {
        list_id: newList.id,
        list_name: newList.title
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
            <h1>Lists</h1>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {!loading && lists.length === 0 && <p>No lists found.</p>}

            <h2>Owned Lists</h2>
            {isOwner.length === 0 ? (
                <p>You don't own any lists.</p>
            ) : (
                isOwner.map((list) => (
                    <div key={list.list_id}>
                        <Link to={`/ListDetail/${list.list_id}`} state={{ ListTitle: list.list_name }}>
                            {list.list_name}
                        </Link>
                        <button onClick={() => handleDeleteList(list.list_id)}>Delete</button>
                    </div>
                ))
            )}
            <h2>Member Lists</h2>
            {isMember.length === 0 ? (
                <p>You are not a member of any lists.</p>
            ) : (
                isMember.map((list) => (
                    <div key={list.list_id}>
                        <Link to={`/ListDetail/${list.list_id}`} state={{ ListTitle: list.list_name }}>
                            {list.list_name}
                        </Link>
                    </div>
                ))
            )}

            <AddList handleListAdded={handleListAdded} />
        </div>
    );
}

export default Lists;