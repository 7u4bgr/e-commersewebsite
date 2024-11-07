import React, { useState } from "react";
import styles from "./index.module.css";
import Wrapper from "../../components/UI/wrapper";
import { MessageIcon, MobileIcon } from "../../icons/index";
import { sendMessage } from "../../api";

const Contact = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [gmail, setGmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    if (!firstname || !lastname || !gmail ||!message) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      const response = await sendMessage({
        firstname,
        lastname,
        gmail,
        message,
      });
      console.log("Mesaj gonderildi: " + response.data);
    } catch (err) {
      alert("Mesaj gonderilmedi problem buradi.");
    }
  };

  return (
    <Wrapper>
      <div className={styles.background}>
        <div className={styles.control}>
          <div className={styles.header}>
            <h2>Home</h2>
            <h2>/</h2>
            <h3>Contact</h3>
          </div>
          <div className={styles.controlSide}>
            <div className={styles.leftSide}>
              <div className={styles.topLeftSide}>
                <h1>
                  <MobileIcon /> Call To Us
                </h1>
                <h2>We are available 24/7, 7 days a week.</h2>
                <h2>Phone: +8801611112222</h2>
              </div>
              <div className={styles.hr}>
                <hr />
              </div>
              <div className={styles.bottomLeftSide}>
                <h1>
                  <MessageIcon /> Write To US
                </h1>
                <h2>
                  Fill out our form and we will contact you within 24 hours.
                </h2>
                <h2>Emails: customer@exclusive.com</h2>
                <h2>Emails: support@exclusive.com</h2>
              </div>
            </div>
            <div className={styles.rightSide}>
              <form className={styles.controlInput}>
                <div className={styles.topInput}>
                  <input
                    onChange={(e)=>setFirstName(e.target.value)}
                    placeholder="Your Name*"
                    type="text"
                  />
                  <input
          
             
                    onChange={(e)=>setLastName(e.target.value)}
                    placeholder="Your Surname*"
                    type="text"
                  />
                  <input
               
                    onChange={(e)=>setGmail(e.target.value)}
                    placeholder="Your Email*"
                    type="email"
                  />
                </div>
                <div className={styles.textArea}>
                  <textarea
           
                    onChange={(e)=>setMessage(e.target.value)}
                    cols="30"
                    rows="7"
                    placeholder="Your Message"
                  />
                </div>
                <div className={styles.button}>
                  <button onClick={(e)=>handleSubmit()} type="button">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;
