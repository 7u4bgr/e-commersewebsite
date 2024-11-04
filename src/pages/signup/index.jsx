import React, { useState } from "react";
import Wrapper from "../../components/UI/wrapper";
import styles from "./index.module.css";
import PhonePhoto from "../../assets/images/phone.png";
import axios from "axios";
import { signup } from "../../api";

const SignUp = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const handleSubmit = async (e) => {



    if (!name || !surname || !email || !password || !confirmpassword) {
      alert("Don`t Empty");
      return;
    }


    if (password !== confirmpassword) {
      alert("Password false");
      return;
    }

    try {
      const response = await signup({name,surname,email,password,confirmpassword})    
      sessionStorage.setItem("name", name);


      console.log("Qeydiyyatdan keçildi:", response.data);
      window.location.href = "/"; 
    } catch (error) {
      console.log("Qeydiyyat uğursuz oldu:", error);
      alert("Qeydiyyat uğursuz oldu, lütfen tekrar deneyin.");
    }
  };

  return (
    <Wrapper>
      <div className={styles.background}>
        <div className={styles.control}>
          <div className={styles.images}>
            <img src={PhonePhoto} alt="" />
          </div>
          <form>
            <h2>Create an account</h2>
            <p>Enter your details below</p>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
            <input
              type="text"
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Surname"
              required
            />
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="12345678@gmail.com"
              required
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <input
              type="password"
              onChange={(e) => setConfirmpassword(e.target.value)}
              placeholder="Confirm password"
              required
            />
            <button onClick={()=>handleSubmit()} type="button">Sign Up</button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default SignUp;
