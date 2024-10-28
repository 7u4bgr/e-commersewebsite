import React, { useState } from "react";
import Wrapper from "../../UI/wrapper/index";
import styles from "./index.module.css";
import { BuyIcon, FavoriIcon } from "../../../icons";
import { Sling as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
const Header = () => {
  const [isMenuOpen,setIsMenuOpen]=useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
  
      <div className={styles.background}>
        <div className={styles.headerControl}>
          <div className={styles.leftSide}>
            <h2>Exclusive</h2>
          </div>
          <ul className={styles.middleSide}>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Login</li>
          </ul>
          <div className={styles.hamburger}>
            <Hamburger
              size={22}
              distance="lg"
              toggled={isMenuOpen}
              toggle={toggleMenu}
              />
          </div>

          <div className={styles.rightSide}>
            <input placeholder="What are you looking for?" type="text" />
            <FavoriIcon />
            <BuyIcon />
          </div>
        </div>
        {isMenuOpen && (
          <div className={styles.overlay}>
              <Link to="/allperfumes" onClick={() => setIsMenuOpen(false)}>
              Home
              </Link>
              <Link to="/brends" onClick={() => setIsMenuOpen(false)}>
              About
              </Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>
              Contact
              </Link>
              <Link to="/magazins" onClick={() => setIsMenuOpen(false)}>
              Login
              </Link>
              <input placeholder="What are you looking for?" type="text" />
            </div>
          )}
      </div>

      <hr />
          </>
  );
};

export default Header;
