import React from "react";
import styles from "./index.module.css";
import Wrapper from "../../components/UI/wrapper";
import { MessageIcon, MobileIcon } from "../../icons/index";
const Contact = () => {
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
              <div className={styles.controlInput}>
                <div className={styles.topInput}>
                  <input placeholder="Your Name*" type="text" />
                  <input placeholder="Your Surname*" type="text" />
                  <input placeholder="Your Email*" type="text" />
                </div>
                <div className={styles.textArea}>
                  <textarea name="message" id="message" cols="30" rows="7">
                    Your Message
                  </textarea>
                </div>
                <div className={styles.button}>
                  <button>Send Message</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;
