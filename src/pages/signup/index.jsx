import React, { useState } from "react";
import Wrapper from "../../components/UI/wrapper";
import styles from "./index.module.css";
import PhonePhoto from "../../assets/images/phone.png";
import { signUpApi } from "../../api";

const SignUp = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [adress, setAdress] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file); // File nesnesini state'e kaydet
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!organizationName || !phonenumber || !adress || !username || !email || !password || !profileImage) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }
  
    console.log("Gönderilecek Veriler:", { 
      organizationName, phonenumber, adress, username, email, password, profileImage 
    });
  
    try {
      const response = await signUpApi({ 
        organizationName,
        phonenumber,
        adress,
        username,
        email,
        password,
        profileImage,
      });
  
      sessionStorage.setItem("username", username);
      console.log("Qeydiyyatdan keçildi:", response);
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
            <img src={PhonePhoto} alt="Phone" />
          </div>
          <form onSubmit={handleSubmit}>
            <h2>Create an account</h2>
            <p>Enter your details below</p>
            <input type="text" value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} placeholder="Sirket" required />
            <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Username" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="12345678@gmail.com" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <input type="text" value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" required />
            <input type="text" value={adress} onChange={(e) => setAdress(e.target.value)} placeholder="Adress" required />
            <input type="file" accept="image/*" onChange={handleImageChange} required />

            {previewImage && (
              <img src={previewImage} alt="Profile Preview" style={{ width: "100px", height: "100px", marginTop: "10px" }} />
            )}

            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default SignUp;
