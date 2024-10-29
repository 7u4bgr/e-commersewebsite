import React from "react";
import styles from "./index.module.css";
import Wrapper from "../UI/wrapper";
import { CustomerIcon, FastIcon, GarantiIcon } from "../../icons";
const Delivery = () => {
  return (
    <Wrapper>
      <div className={styles.background}>
        <div className={styles.controlDelivery}>
          <div className={styles.deliveryFirst}>
            <div className={styles.svgClass}>

            <FastIcon />
            </div>
            <h2>FREE AND FAST DELIVERY</h2>
            <h3>Free delivery for all orders over $140</h3>
          </div>
          <div className={styles.deliveryFirst}>
            <div className={styles.svgClass}>

            <CustomerIcon />
            </div>
            <h2>24/7 CUSTOMER SERVICE</h2>
            <h3>Friendly 24/7 customer support</h3>
          </div>
          <div className={styles.deliveryFirst}>
            <div className={styles.svgClass}>

            <GarantiIcon />
            </div>
            <h2>MONEY BACK GUARANTEE</h2>
            <h3>We reurn money within 30 days</h3>
          </div>
  
        </div>
      </div>
    </Wrapper>
  );
};

export default Delivery;
