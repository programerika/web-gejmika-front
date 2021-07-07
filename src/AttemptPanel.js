import React from "react";
import PropTypes from "prop-types";

const AttemptPanel = (props) => {
  return (
    <>
      <img className="circle" src={props.comb[0]} />
      <img className="circle" src={props.comb[1]} />
      <img className="circle" src={props.comb[2]} />
      <img className="circle" src={props.comb[3]} />
    </>
  );
};

AttemptPanel.propTypes = {};

export default AttemptPanel;
