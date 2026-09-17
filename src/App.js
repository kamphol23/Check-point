import Lists from "./toDoList/Lists";
import logIn from "./api/auth";
import HomePage from "./Home/homePage";
import ListDetail from "./toDoList/ListDetail";

import Navbar from "./components/Navbar";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import "./App.css";

function App() {
  logIn();

  return (
    <Router>
      <div className='App'>
        <Navbar />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/todo' element={<Lists />} />
          <Route path='/ListDetail/:id' element={<ListDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
