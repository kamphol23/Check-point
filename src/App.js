import ToDoList from './toDoList/TodoList';
import './App.css';
import { useState } from 'react';


function App() {
  const [balance, setBalance] = useState(23);
  return (
    <div className="App">
      <ToDoList balance={balance} setBalance={setBalance}/>     
    </div>
  );
}

export default App;
