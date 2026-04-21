import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
const [isOpen, setIsOpen] = useState(false);

const toggleMenu = () => {
    setIsOpen(!isOpen);
}

const burgerClass = isOpen ? "burger open" : "burger";
const menuClass = isOpen ? "menu open" : "menu";


  return (
   <nav>
    <div className={burgerClass} onClick={toggleMenu}>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div className={isOpen ? "overlay open" : "overlay"}
     onClick={toggleMenu}></div>

     <div className={menuClass}>
      <ul>
        <li>
          <Link to="/" onClick={toggleMenu}>Home</Link>
        </li>
        <li>
          <Link to="/Todo" onClick={toggleMenu}>Dashboard</Link>
        </li>
      </ul>
     </div>
   </nav>
  );
}

export default Navbar;