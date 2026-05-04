import React from "react";
import { useState } from "react";

import { AiOutlineFileAdd } from "react-icons/ai";
import "./styling/AddList.css";
import Button from "../components/Button";

import { addList } from "../api/addToDb";
import { data } from "react-router-dom";

function AddList({ handleListAdded }) {
  const [listName, setListName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const newlist = await addList(listName);

      setSuccess("List created successfully!");
      setListName("");

      console.log(newlist[0]);
      setShowForm(false);
      handleListAdded({ id: newlist[0].id, title: newlist[0].title });
    } catch (error) {
      console.error("Error creating list:", error);
      setError("Failed to create list");
    }

    return data;
  };

  return (
    <div>
      {!showForm && (
        <Button style='callToAction' onClick={() => setShowForm(true)}>
          Ctreate <AiOutlineFileAdd />
        </Button>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setShowForm(false);
            }
          }}>
          <div>
            <input
              type='text'
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              autoFocus
              placeholder='List Name'
              required
              className='addList-input'
            />
            <Button type='submit' style='callToAction'>
              Add List
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AddList;
