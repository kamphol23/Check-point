import { useState, useEffect } from "react";

import "./homePage.css";

import HomeNav from "../Home/HomeNav";
import PersonalGoal from "./PersonalGoal/PersonalGoal";
import ListOfLists from "./ListOfLists/ListOfLists";
import History from "./History/History";
import WorkingOn from "./WorkingOn/WorkingOn";

import { getGoals } from "../api/goals";
import { getMemberLists } from "../api/lists";

function HomePage() {
  const [lists, setLists] = useState([]);
  const [goals, setGoals] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [listsData, goalsData] = await Promise.all([
          getMemberLists(),
          getGoals(),
        ]);

        setLists(listsData || []);
        setGoals(goalsData || []);
      } catch (err) {
        console.error(err);
        setError("Kunde inte ladda dashboarden");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className='homePage-loading'>
        <p>Laddar dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='homePage-error'>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className='homePage'>
      <header className='homePage-header'>
        <h1>Välkommen tillbaka 👋</h1>
        <p>Här kan du se en översikt av dina grupper, mål och aktiviteter.</p>
      </header>

      <section className='homePage-nav'>
        <HomeNav lists={lists} />
      </section>

      <section className='homePage-top'>
        <ListOfLists lists={lists} />
        <PersonalGoal goals={goals} />
      </section>

      <section className='homePage-bottom'>
        <WorkingOn lists={lists} />
        <History />
      </section>
    </div>
  );
}

export default HomePage;
