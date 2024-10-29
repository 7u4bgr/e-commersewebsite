import React from "react";
import styles from "./index.module.css";
import Wrapper from "../UI/wrapper";
import JblPhoto from '../../assets/images/jblphoto.png'
const Enhance = () => {
  return (
    <Wrapper>
      <div className={styles.background}>
        <div className={styles.sideControl}>
          <div className={styles.leftSide}>
            <div className={styles.firstLeft}>
              <h2>Categories</h2>
            </div>
            <div className={styles.twoLeft}>
              <div className={styles.headersTwo}>
                <h2>Enhance Your Music Experience</h2>
              </div>
              <div className={styles.dateTwo}>
                    <div className={styles.daysTwo}>
                                <h1>13</h1>
                                <h2>Days</h2>
                    </div>
                    <div className={styles.daysTwo}>
                                <h1>23</h1>
                                <h2>Hours</h2>
                    </div>
                    <div className={styles.daysTwo}>
                                <h1>56</h1>
                                <h2>Minutes</h2>
                    </div>
                    <div className={styles.daysTwo}>
                                <h1>41</h1>
                                <h2>Seconds</h2>
                    </div>
              </div>
            </div>
            <div className={styles.threeLeft}>
                    <button>Buy Now!</button>
            </div>
          </div>
          <div className={styles.rightSide}>
                    <img src={JblPhoto} alt="" />
          </div>
        </div>
      </div>
      <div className={styles.hr}>
          <hr />
      </div>
    </Wrapper>
  );
};

export default Enhance;
