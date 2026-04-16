import React from "react";
import { addList } from "../api/addToDb";
import { data } from "react-router-dom";

function AddList({ handleListAdded }) {
    const [listName, setListName] = React.useState("");
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);   
        try {
          const newlist =  await addList(listName);
             
            setSuccess("List created successfully!");
            setListName("");
                         
                console.log(newlist[0]);
                
                handleListAdded({ id: newlist[0].id, 
                    title: newlist[0].title 
                });
           
        }
        catch (error) {
            console.error("Error creating list:", error);
            setError("Failed to create list");
        }   
       
      
        
        return data
        
        
    };

    return (
        <div>
            <h2>Add New List</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    placeholder="List Name"
                    required
                />
                <button type="submit">Add List</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
    );
}

export default AddList;