import { getLists } from "../api/lists";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

    return (
        <div>
            <h1>Lists</h1>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {!loading && lists.length === 0 && <p>No lists found.</p>}

            {lists.map((list) => (
                <div key={list.id}>
                    <Link to={`/ListDetail/${list.id}`}>
                        {list.title}
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Lists;