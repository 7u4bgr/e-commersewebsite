import React, { useState } from "react";
import styles from "./index.module.css";
import Wrapper from "../../components/UI/wrapper";
const AccountEdit = () => {
  const [profile, setProfile] = useState(true);
  const [adressBook, setAdressBook] = useState(false);
  const [paymentOptions, setPaymentOptions] = useState(false);
  const profileMenu = () => {
    setProfile(true);
    setAdressBook(false);
    setPaymentOptions(false);
  };
  const adressMenu = () => {
    setProfile(false);
    setAdressBook(true);
    setPaymentOptions(false);
  };
  const paymentMenu = () => {
    setProfile(false);
    setAdressBook(false);
    setPaymentOptions(true);
  };
  return (
    <Wrapper>
      <div className={styles.background}>
        <div className={styles.control}>
          <div className={styles.header}>
            <h2>Home</h2>
            <h2>/</h2>
            <h3>Account</h3>
          </div>
          <div className={styles.controlSides}>
            <div className={styles.leftSide}>
              <div className={styles.leftHeaders}>
                <h2>Manage My Account</h2>
              </div>
              <ul className={styles.leftUl}>
                <li
                  onClick={() => profileMenu()}
                  className={profile ? styles.redColor : styles.blackColor}
                >
                  My Profile
                </li>
                <li
                  onClick={() => adressMenu()}
                  className={adressBook ? styles.redColor : styles.blackColor}
                >
                  Address Book
                </li>
                <li
                  onClick={() => paymentMenu()}
                  className={
                    paymentOptions ? styles.redColor : styles.blackColor
                  }
                >
                  My Payment Options
                </li>
              </ul>
            </div>
            {profile ? (
              <div className={styles.inputsControl}>
                <span></span>
                <h2 className={styles.headersH2}>Edit Your Profile</h2>
                <div className={styles.controlPanel}>
                  <div className={styles.topInput}>
                    <div className={styles.topInputOne}>
                      <h2>First Name</h2>
                      <input placeholder="Michael" type="text" />
                    </div>
                    <div className={styles.topInputOne}>
                      <h2>Last Name</h2>
                      <input placeholder="Aleksandr" type="text" />
                    </div>
                  </div>
                  <div className={styles.topInput}>
                    <div className={styles.topInputOne}>
                      <h2>Email</h2>
                      <input placeholder="rimel1111@gmail.com" type="email" />
                    </div>
                    <div className={styles.topInputOne}>
                      <h2>Address</h2>
                      <input
                        placeholder="Kingston, 5236, United State"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className={styles.passwordInputs}>
                    <h2>Password Changes</h2>
                    <input placeholder="Current Passwod" type="password" />
                    <input placeholder="New Passwod" type="password" />
                    <input placeholder="Confirm New Passwod" type="password" />
                  </div>
                  <div className={styles.buttonsControl}>
                    <div className={styles.cancelButton}>
                      <button>Cancel</button>
                    </div>
                    <div className={styles.confirmButton}>
                      <button>Save Changes</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default AccountEdit;
