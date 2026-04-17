import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AddList from "./AddList";
import { getLists } from "../api/lists";
import { deleteListMember } from "../api/delete";

function Lists() {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {

            const fetchLists = async () => {
            try {
                const data = await getLists();
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

    return (
        <div>
            <h1>Lists</h1>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {!loading && lists.length === 0 && <p>No lists found.</p>}

            {lists.map((list) => (
                <div key={list.list_id}>
                    <Link to={`/ListDetail/${list.list_id}`} state={{ ListTitle: list.list_name }}>
                        {list.list_name}
                    </Link>
                    <button onClick={() => deleteListMember(list.list_id)}>Delete</button>
                </div>

            ))}

            <AddList handleListAdded={handleListAdded} />
        </div>
    );
}

export default Lists;