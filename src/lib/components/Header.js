import React from "react";
import styles from "./Header.module.css";

const Header = ({children}) => {
  return (
    <div className={styles.header}>
      <h2>Webgejmika</h2>
      {children}
    </div>
  );
};

export default Header;