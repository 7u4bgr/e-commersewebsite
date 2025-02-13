import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sling as Hamburger } from "hamburger-react";
import { BuyIcon, ExitIcon, FavoriIcon } from "../../../icons";
import styles from "./index.module.css";
import { getSearchTask, getUserInfo } from "../../../api"; // Arama fonksiyonunuzu buradan import edin

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
  
      try {
        const response = await getUserInfo(token);
        if (response) {
          setUser(response);
        } else {
          console.error("API cevabı boş veya geçersiz:", response);
        }
      } catch (error) {
        console.error("Kullanıcı bilgileri alınamadı", error);
      }
    };
  
    fetchUserData();
  }, []);
  

  
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const fetchSearchResults = async () => {
      setLoading(true);
      setError("");
      try {
        const results = await getSearchTask(searchTerm);
        if (results.error) {
          setError(results.error);
        } else {
          setSearchResults(results);
        }
      } catch (err) {
        setError("Arama sırasında bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchTerm]); 


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
          <input
            placeholder="What are you looking for?"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Input değeri değiştiğinde setSearchTerm ile güncelle
          />
          {loading && <div className={styles.loader}>Yükleniyor...</div>} {/* Yükleniyor animasyonu */}
          {error && <div className={styles.error}>{error}</div>} {/* Hata mesajı */}
         
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
      <ul className={styles.searchResults}>
            {searchResults.length === 0 ? (
              <li>No results found</li> // Eğer sonuç yoksa
            ) : (
              searchResults.map((task) => (
                <li key={task.id}>
                  <Link to={`/product-details/${task.id}`}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                  </Link>
                </li>
              ))
            )}
          </ul>
    </div>
  );
};

export default Header;
