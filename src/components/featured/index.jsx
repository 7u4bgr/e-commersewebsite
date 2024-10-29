import React from "react";
import styles from "./index.module.css";
import Wrapper from "../UI/wrapper";
import Ps5Slim from "../../assets/images/ps5foto5.png";
import WomensPhoto from "../../assets/images/womens.png";
import Speakers from "../../assets/images/speakers1.png";
import Gucci from "../../assets/images/gucci1.png";
const Featured = () => {
  return (
    <Wrapper>
      <div className={styles.background}>
        <div className={styles.header}>
          <button></button>
          <h2>Categories</h2>
        </div>
        <div className={styles.newArrival}>
          <h2>New Arrival</h2>
        </div>
        <div className={styles.sideControl}>
          <div className={styles.leftSide}>
         
        
            <img src={Ps5Slim} alt="" />
          </div>
          <div className={styles.rightSide}>
            <div className={styles.controlRightSide}>
              <div className={styles.topRightSide}>
           
                <img src={WomensPhoto} alt="" />
              </div>
              <div className={styles.controlLeftAndRightSide}>
                <div className={styles.leftLeftSide}>
         
                    <img src={Speakers} alt="" />
                </div>
                <div className={styles.leftRightSide}>
          
                    <img src={Gucci} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
            <div className={styles.hr}>
                <hr />
            </div>
    </Wrapper>
  );
};

export default Featured;
