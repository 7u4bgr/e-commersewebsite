import React, { useState } from "react";
import styles from "./index.module.css";
import Wrapper from "../../components/UI/wrapper";
import AboutImage from '../../assets/images/about.png'
import {GarantiIcon} from '../../icons/index'
const About = () => {
  const [data]=useState([
    {
      "icon":<GarantiIcon/>,
      "price":"10.5K",
      "title":"Sallers active our site"
    },
    {
      "icon":<GarantiIcon/>,
      "price":"33K",
      "title":"Mopnthly Produduct Sale"
    },
    {
      "icon":<GarantiIcon/>,
      "price":"45.5K",
      "title":"Customer active in our site"
    },
    {
      "icon":<GarantiIcon/>,
      "price":"25K",
      "title":"Anual gross sale in our site"
    },
  ])
  return (
    <Wrapper>
      <div className={styles.background}>
        <div className={styles.control}>
          <div className={styles.header}>
            <h2>Home</h2>
            <h2>/</h2>
            <h3>About</h3>
          </div>
          <div className={styles.ourStory}>
            <div className={styles.storyText}>
              <h1>Our Story</h1>
              <p>
                Launced in 2015, Exclusive is South Asia’s premier online
                shopping makterplace with an active presense in Bangladesh.
                Supported by wide range of tailored marketing, data and service
                solutions, Exclusive has 10,500 sallers and 300 brands and
                serves 3 millioons customers across the region.{" "}
              </p>
              <p>
                Exclusive has more than 1 Million products to offer, growing at
                a very fast. Exclusive offers a diverse assotment in categories
                ranging from consumer.
              </p>
            </div>
            <div className={styles.images}>
              <img src={AboutImage} alt="" />
            </div>
          </div>
          <div className={styles.borderMaps}>
          {data.map((item, index) => (
            <div className={styles.controlBorderMaps}>

               <h3>{item.icon}</h3>
               <h1>{item.price}</h1>
               <h2>{item.title}</h2>
            </div>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default About;
