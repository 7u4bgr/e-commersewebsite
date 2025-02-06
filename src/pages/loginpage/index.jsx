import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Wrapper from "../../components/UI/wrapper";
import styles from "./index.module.css";
import PhonePhoto from "../../assets/images/phone.png";
import { login } from "../../api";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
      const response = await login({username,password});
      
      // window.location.href("/"); 
      console.log("ELCIN "+response)
     if(response){
      window.location.href="/";
      }
      else{
        setError("Username or password is wrong");
      }
  
  };
  return (
    <Wrapper>
      <div className={styles.background}>
        <div className={styles.control}>
          <div className={styles.images}>
            <img src={PhonePhoto} alt="Phone" />
          </div>
          <form onSubmit={handleSubmit}>
            <h2>Log in to Exclusive</h2>
            <p>Enter your details below</p>

            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>

            {error && <p className={styles.error}>{error}</p>}

            <p>Have you not an account?</p>
            <a href="/signup">Sign Up</a>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default LoginPage;
