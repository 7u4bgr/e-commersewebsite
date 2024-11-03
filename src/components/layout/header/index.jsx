import React, { useEffect, useState } from "react";
import Wrapper from "../../UI/wrapper/index";
import styles from "./index.module.css";
import { BuyIcon, ExitIcon, FavoriIcon } from "../../../icons";
import { Sling as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState("");
  const [activeLink, setActiveLink] = useState("home");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // `sessionStorage`'den kullanıcı adını çekiyoruz
    const loggedInUser = sessionStorage.getItem("name");
    if (loggedInUser) {
      // loggedInUser'in ilk harfini büyük yap ve geri kalanını küçük yap
      const formattedUser =
        loggedInUser.charAt(0).toUpperCase() +
        loggedInUser.slice(1).toLowerCase();
      setUser(formattedUser); // `user` state'ini güncelle
    }
  }, []);

  const handleLogOut = () => {
    setUser(null); // `user` state'ini temizle
    sessionStorage.clear(); // `sessionStorage`'ı temizle
    window.location.href = "/login"; // Login sayfasına yönlendir
  };

  return (
    <>
      <div className={styles.background}>
        <div className={styles.headerControl}>
          <div className={styles.leftSide}>
            <Link to={"/"}>Exclusive</Link>
          </div>
          <ul className={styles.middleSide}>
            <Link
              onClick={() => setActiveLink("home")}
              className={activeLink === "home" ? styles.active : ""}
              to={"/"}
            >
              Home
            </Link>
            <Link to={"/about"}
              onClick={() => setActiveLink("about")}
              className={activeLink === "about" ? styles.active : ""}
            >
              About
            </Link>
            <li
              onClick={() => setActiveLink("contact")}
              className={activeLink === "contact" ? styles.active : ""}
            >
              Contact
            </li>
            <div className={styles.login}>
              {user ? (
                <div className={styles.userName}>
                  <h2>{user}</h2>
                  <h2 onClick={handleLogOut}>
                    <ExitIcon />
                  </h2>
                </div>
              ) : (
                <>
                  <div className={styles.signUp}>
                    <Link  onClick={() => setActiveLink("login")}
              className={activeLink === "login" ? styles.active : ""} to={"/login"}>Login</Link>
                    <Link        onClick={() => setActiveLink("signup")}
              className={activeLink === "signup" ? styles.active : ""} to={"/signup"}>Sign Up</Link>
                  </div>
                </>
              )}
            </div>
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
