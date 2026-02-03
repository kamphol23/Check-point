import ToDoList from './toDoList/TodoList';
import User from './user/User';
import RenderRewards from './rewards/RenderRewards';
import logIn from './api/auth';
import listsByUserId from './api/lists';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import './App.css';
import { useState } from 'react';



function App() {
  const [balance, setBalance] = useState(23);

  // Userroll state.
  const [userRoll, setUserRoll] = useState({
    name: 'Kotl',
    userRoll: 'admin',});

   logIn();
   listsByUserId();
  return (
    <Router>
    <div className="App">
    
        <nav>
          <Link to="/">Home</Link>
          <Link to="/todo">Dashboards</Link>
          <Link to="/rewards">Rewards</Link>
          <Link to="/user">User</Link>
        </nav>
   

      <Routes>
        <Route path="/" element={<h2>Home Page</h2>} />
        <Route path="/todo" element={<ToDoList  balance={balance} setBalance={setBalance}/>} />
        <Route path="/rewards" element={<RenderRewards />} />
        <Route path="/user" element={
          <>
            <User userRoll={userRoll} setUserRoll={setUserRoll} />
          </>
        } />
      </Routes>

    </div>
    </Router>
  );
}

export default App;
