import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./styling/Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const burgerClass = isOpen ? "burger open" : "burger";
  const menuClass = isOpen ? "menu open" : "menu";

  return (
    <nav ref={navRef}>
      <div className={burgerClass} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={isOpen ? "overlay open" : "overlay"}></div>

      <div className={menuClass}>
        <ul>
          <li>
            <Link to='/' onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to='/Todo' onClick={toggleMenu}>
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
