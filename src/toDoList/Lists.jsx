import React from "react";
import listsByUserId from "../api/lists";
import { useEffect, useState } from "react";


function Lists() {

    const [lists, setLists] = useState([]);
    useEffect(() => {
        listsByUserId().then((data) => {
            setLists(data);
        });
    }, []);

        console.log(lists);
        
    return(
        <div className="toDoList">
            <h1>Lists</h1>
            {lists.map((list) => (
                <div key={list.id}>{list.titel}</div>
            ))}
        </div>
    )
}

export default Lists;