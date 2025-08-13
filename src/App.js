import ToDoList from './toDoList/TodoList';
import User from './user/User';
import SwitchRoll from './user/SwitchRoll';

import './App.css';
import { useState } from 'react';


function App() {
  const [balance, setBalance] = useState(23);
  const [userState, setUserState] = useState({
    name: 'Kotl',
    userRoll: 'admin',});

  return (
    <div className="App">
      <User userState={userState} />
      <ToDoList balance={balance} setBalance={setBalance}/>     
      <SwitchRoll userState={userState} setUserState={setUserState} />
    </div>
  );
}

export default App;
