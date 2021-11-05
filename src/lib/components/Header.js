import React from "react";
import questionMark from '../icons/question-mark.png';
import styles from "./Header.module.css";
import globalStyles from "../global.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <h2>Webgejmika</h2>
      {/*TODO move to Help component*/}
      <div className={styles.helpWrapper}>
        <img 
          className={globalStyles.inputBtn} 
          src={questionMark} 
          alt="help" 
        />
      </div>
    </div>
  );
};

export default Header;