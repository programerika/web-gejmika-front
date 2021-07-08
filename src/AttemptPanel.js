import React from "react";
import PropTypes from "prop-types";

const AttemptPanel = (props) => {
  const source = "./icons/circle.png";

  return (
    <>
      <img
        className="circle"
        src={typeof props.comb[0] == "undefined" ? source : props.comb[0]}
      />
      <img
        className="circle"
        src={typeof props.comb[1] == "undefined" ? source : props.comb[1]}
      />
      <img
        className="circle"
        src={typeof props.comb[2] == "undefined" ? source : props.comb[2]}
      />
      <img
        className="circle"
        src={typeof props.comb[3] == "undefined" ? source : props.comb[3]}
      />
    </>
  );
};

AttemptPanel.propTypes = {};

export default AttemptPanel;
