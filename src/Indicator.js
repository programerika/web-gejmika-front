import React from "react";
import PropTypes from "prop-types";

const Indicator = (props) => {
  return (
    <div className="indicator">
      <div
        className="ind-circle"
        style={{ backgroundColor: props.color[0] }}
      ></div>
      <div
        className="ind-circle"
        style={{ backgroundColor: props.color[1] }}
      ></div>
      <div
        className="ind-circle"
        style={{ backgroundColor: props.color[2] }}
      ></div>
      <div
        className="ind-circle"
        style={{ backgroundColor: props.color[3] }}
      ></div>
    </div>
  );
};

Indicator.propTypes = {};

export default Indicator;
