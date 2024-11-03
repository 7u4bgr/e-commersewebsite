import React from "react";
import styles from "./index.module.css";
import { SendIcon } from "../../../icons/index";
import Wrapper from "../../UI/wrapper";
const Footer = () => {
  return (
    <div className={styles.background}>
      <Wrapper>
        <div className={styles.control}>
          <div className={styles.firstList}>
            <h2>Exclusive</h2>
            <h3>Subscribe</h3>
            <h4>Get 10% off your first order</h4>
            <div className={styles.controlInput}>
              <input type="email" placeholder="Enter your email" />
              <SendIcon />
            </div>
          </div>
          <div className={styles.firstList}>
            <h2>Support</h2>
            <h3>111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</h3>
            <h4>Get 10% off your first order</h4>
            <h4>exclusive@gmail.com</h4>
            <h4>+88015-88888-9999</h4>
          
           
            
          </div>
          <div className={styles.firstList}>
            <h2>Account</h2>
            <h3>My Account</h3>
            <h4>Login / Register</h4>
            <h4>Cart</h4>
            <h4>Wishlist</h4>
            <h4>Shop</h4>
          
          </div>
          <div className={styles.firstList}>
            <h2>Quick Link</h2>
            <h3>Privacy Policy</h3>
            <h4>Terms Of Use</h4>
            <h4>FAQ</h4>
            <h4>Contact</h4>
           
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Footer;
