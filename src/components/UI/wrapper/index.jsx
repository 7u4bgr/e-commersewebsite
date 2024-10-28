import React from "react";
import styles from "./index.module.css";
const Wrapper = (props) => {
  return <div className={styles.background}>{props.children}</div>;
};

export default Wrapper;
