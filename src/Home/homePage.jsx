import { useState, useEffect } from "react";
import "./homePage.css";

import HomeNav from "../Home/HomeNav";
import PersonalGoal from "./PersonalGoal/PersonalGoal";
import ListOfLists from "./ListOfLists/ListOfLists";
import History from "./History/History";

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

  return (
    <div className='homePage'>
      <div className='homePage-header'>
        <h1>Välkommen tillbaka Username!</h1>
        <p>Här kan du se översikt</p>
      </div>

      <HomeNav />
      <div className='homePage-lists-goals'>
        <ListOfLists lists={lists} />
        <PersonalGoal goals={goals} />
      </div>
      <History />
    </div>
  );
}

export default HomePage;
