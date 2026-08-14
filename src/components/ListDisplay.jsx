import React from "react";
import "./styling/ListDisplay.css";
const ListDisplay = ({ lists }) => {
  return (
    <div className='list-display'>
      {lists.map((list) => (
        <div key={list.list_id} className='list-display-item'>
          <h3>name: {list.list_name}</h3>
          <p>Dagens uppgifter</p>
          <p>totala poäng för dagen</p>
          <p>en bild på hur nära målet man ligger</p>
        </div>
      ))}
    </div>
  );
};

export default ListDisplay;
