import React, { useState } from "react";
import Wrapper from "../../components/UI/wrapper";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import PhonePhoto from "../../assets/images/phone.png";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
   

    if (!email || !password) {
      setError("Email ve yaxud parol boş ola bilmez");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/loginPage", {
        email,
        password,
      });
      const { name } = response.data;

      sessionStorage.setItem("name", name);
      console.log("Successfully logged in:", response.data);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      setError("Email ve yaxud parol sehvdir");
    }
  };

  return (
    <Wrapper>
      <div className={styles.background}>
        <div className={styles.control}>
          <div className={styles.images}>
            <img src={PhonePhoto} alt="" />
          </div>
          <form onSubmit={handleLogin}>
            <h2>Log in to Exclusive</h2>
            <p>Enter your details below</p>
            {error && <p className={styles.errorText}>{error}</p>}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Your email"
              required
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
            />
            <button onClick={()=>handleLogin()} type="button">Login</button>
            <p>Have you not account?</p>
            <Link to={"/signup"}>Sign Up</Link>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default LoginPage;