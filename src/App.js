import ToDoList from './toDoList/TodoList';
import Lists from './toDoList/Lists';
import logIn from './api/auth';

import ListDetail from './toDoList/ListDetail'

import Navbar from './components/Navbar';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import './App.css';
import { useState } from 'react';



function App() {


   logIn();
   

  return (
    <Router>
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<h2>Home Page</h2>} />
        <Route path="/todo" element={<Lists/>} />
        <Route path="/ListDetail/:id" element={<ListDetail />} />

      </Routes>

    </div>
    </Router>
  );
}

export default App;
