import { useState, useEffect } from "react";
import "./homePage.css";

import HomeNav from "../Home/HomeNav";
import PersonalGoal from "./PersonalGoal/PersonalGoal";
import ListOfLists from "./ListOfLists/ListOfLists";

import { getGoals } from "../api/goals";
import { getMemberLists } from "../api/lists";
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

      <HomeNav />

      <ListOfLists lists={lists} />
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
