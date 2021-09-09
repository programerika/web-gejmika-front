import React from "react";

const AttemptPanel = (props) => {
  return (
    <>
      {props.comb.map((comb, index) => {
        return (
          <img key={index} className="circle" src={comb} alt="kombinacija" />
        );
      })}
    </>
  );
};

AttemptPanel.propTypes = {};
AttemptPanel.defaultProps = {
  comb: [
    "./icons/circle.png",
    "./icons/circle.png",
    "./icons/circle.png",
    "./icons/circle.png",
  ],
};

export default AttemptPanel;
