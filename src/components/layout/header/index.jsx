import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sling as Hamburger } from "hamburger-react";
import { BuyIcon, ExitIcon, FavoriIcon } from "../../../icons";
import styles from "./index.module.css";
import axios from "axios";
import { getUserInfo } from "../../../api";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      console.log("Token:", token); 
  
      if (!token) return;
  
      try {
        const response = await getUserInfo(token);
        console.log("Tam API Cevabı:", response); 
        console.log("User info fetch response:", response.data);
  
        if (response && response.data) {
          setUser(response.data);
        } else {
          console.error("API cevabı boş veya geçersiz:", response);
        }
      } catch (error) {
        console.error("Kullanıcı bilgileri alınamadı", error);
      }
    };
  
    fetchUserData();
  }, []);
  
  


  const handleLogOut = () => {
    localStorage.removeItem("token");
    setUser(null); 
    window.location.href = "/login";
  };

  return (
    <div className={styles.background}>
      <div className={styles.headerControl}>
        <div className={styles.leftSide}>
          <Link to={"/"}>Exclusive</Link>
        </div>
        <ul className={styles.middleSide}>
          <Link to={"/"}>Home</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/contact"}>Contact</Link>
        </ul>
        <div className={styles.hamburger}>
          <Hamburger size={22} distance="lg" toggled={isMenuOpen} toggle={setIsMenuOpen} />
        </div>
        <div className={styles.rightSide}>
          <input placeholder="What are you looking for?" type="text" />
          <Link to={"/favorites"}>
            <FavoriIcon />
          </Link>

          <div className={styles.login}>
            {user ? (
              <div className={styles.userName}>
                <span>Welcome, {user.username}!</span>
                <h2 onClick={handleLogOut}>
                  <ExitIcon />
                </h2>
              </div>
            ) : (
              <div className={styles.signUp}>
                <Link to={"/login"}>Login</Link>
                <Link to={"/signup"}>Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
