import React from "react";
import "./homePage.css";
import Lists from "../toDoList/Lists";
import { getMemberLists } from "../api/lists";
import { getGoals } from "../api/goals";
import { useState, useEffect } from "react";
import ListDisplay from "../components/ListDisplay";

function HomePage() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const data = await getMemberLists();
        const goalsData = await getGoals();

        setGoals(goalsData);
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
  console.log("Goals:", goals);
  return (
    <div className='homePage'>
      <div className='homePage-header'>
        <h1>Välkommen tillbaka Username!</h1>
        <p>Här kan du se översikt</p>
      </div>

      <div className='tracker-section'>
        <div className='tracker-text'>
          <p>Den här veckan</p>
        </div>

        <div className='tracker-container'>
          <div>
            <h2>20</h2>
            <p>Klara uppgifter</p>
          </div>
          <div>
            <h2>300</h2>
            <p>Intjänade poäng</p>
          </div>
        </div>
      </div>
      <ListDisplay lists={lists} />
      <div className='personal-goal'>
        <h1>Personligt mål</h1>
        <p>
          {goals.length > 0
            ? `Du har ${goals.length} personliga mål`
            : "Du har inga personliga mål"}
        </p>
        <h2>{goals.length > 0 && goals[0].title}</h2>
        <p>{goals.length > 0 && goals[0].description}</p>
        <p>{goals.length > 0 && `Poäng: ${goals[0].points}`}</p>
      </div>
    </div>
  );
}

export default HomePage;
