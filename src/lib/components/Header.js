import React from "react";
import questionMark from '../icons/question-mark.png';

const Header = () => {
  return (
    <div className="header">
      <h2>Webgejmika</h2>
      <div className="help-wrapper">
        <img className="input" src={questionMark} alt="help" />
      </div>
    </div>
  );
};

export default Header;
