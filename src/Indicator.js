import React from "react";

const Indicator = (props) => {
  return (
    <div className="indicator">
      <div className={`ind-circle ` + props.color[0]}></div>
      <div className={`ind-circle ` + props.color[1]}></div>
      <div className={`ind-circle ` + props.color[2]}></div>
      <div className={`ind-circle ` + props.color[3]}></div>
    </div>
  );
};

export default Indicator;
