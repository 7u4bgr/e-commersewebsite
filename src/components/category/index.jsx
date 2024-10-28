import React, { useState } from "react";
import styles from "./index.module.css";
import Wrapper from "../UI/wrapper";
import IphonePhoto from "../../assets/images/iphonephoto.png";
const Category = () => {
  const [category, setCategory] = useState(false);
  const [women, setWomen] = useState(false);
  const [man, setMan] = useState(false);
  const handleCategory = () => {
    setCategory((prev) => !prev);
    setMan(false);
    setWomen(false);
  };
  const handleWomen = () => {
    setWomen((prev) => !prev);
    setMan(false);
  };
  const handleMan = () => {
    setMan((prev) => !prev);
    setWomen(false);
  };
  const handleCloseWomen = () => {
    setWomen(false);
  };
  const handleCloseMan = () => {
    setMan(false);
  };
  return (
    <Wrapper>
      <>
      <div className={styles.control}>
        <div className={styles.categoryControl}>
          <ul className={styles.ul}>
            <li>Woman’s Fashion</li>
            <li>Men’s Fashion</li>
            <li>Electronics</li>
            <li>Home & Lifestyle</li>
            <li>Medicine</li>
            <li>Sports & Outdoor</li>
            <li>Baby’s & Toys</li>
            <li>Groceries & Pets</li>
            <li>Health & Beauty</li>
          </ul>

          <hr />
        </div>

        <div className={styles.photo}>
          <img src={IphonePhoto} alt="" />
        </div>
        <div className={styles.categoryMobile}>
          <button
            className={styles.buttonCategory}
            onClick={() => handleCategory()}
            >
            Category
          </button>
          {category ? (
            <ul className={styles.categoryUl}>
              <button onClick={() => handleWomen()}>Woman’s Fashion</button>
              {women ? (
                <>
                  <div className={styles.womensDress}>
                    <h2>T-Shirt</h2>
                    <h2>T-Shirt</h2>
                    <h2>T-Shirt</h2>
                    <h2>T-Shirt</h2>
                    <h2>T-Shirt</h2>
                  </div>
                  <button
                    className={styles.closeWomen}
                    onClick={() => handleCloseWomen()}
                    >
                    Close
                  </button>
                </>
              ) : (
                ""
                )}
              <button onClick={() => handleMan()}>Men’s Fashion</button>
              {man ? (
                <>
              <div className={styles.manDress}>
                <h2>Man-T-Shirt</h2>
                <h2>Man-T-Shirt</h2>
                <h2>Man-T-Shirt</h2>
                <h2>Man-T-Shirt</h2>
                <h2>Man-T-Shirt</h2>
              </div>
              <button
                className={styles.closeMan}
                onClick={() => handleCloseMan()}
                >
                Close
              </button>
            </>
          ) : (
            ""
            )}
              <button>Electronics</button>
              <button>Home & Lifestyle</button>
              <button>Medicine</button>
              <button>Sports & Outdoor</button>
              <button>Baby’s & Toys</button>
              <button>Groceries & Pets</button>
              <button>Health & Beauty</button>
            </ul>
          ) : (
            ""
            )}

 
        </div>
 
      </div>
            </>
    </Wrapper>
  );
};
export default Category;
