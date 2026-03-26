
import {getLists} from "../api/lists";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
function Lists() {

    const [lists, setLists] = useState([]);

useEffect(() => {
    const fetchLists = async () => {
        try {
            const data = await getLists();
            setLists(data);
        } catch (error) {
            console.error("Error fetching lists:", error);
        }
    };

    fetchLists();
    
    
}, []);
console.log();
    return(
    <div>
      <h1>Lists</h1>

{lists.map((list) => (
  <Link key={list.id} to={`/list/${list.id}`}>
    {list.title}
  </Link>
))}
    </div>
    )
}

export default Lists;