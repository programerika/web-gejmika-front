import React from "react";

const AttemptPanel = (props) => {
  const source = "./icons/circle.png";

  return (
    <>
      <img
        className="circle"
        src={typeof props.comb[0] === "undefined" ? source : props.comb[0]}
        alt="kombinacija"
      />
      <img
        className="circle"
        src={typeof props.comb[1] === "undefined" ? source : props.comb[1]}
        alt="kombinacija"
      />
      <img
        className="circle"
        src={typeof props.comb[2] === "undefined" ? source : props.comb[2]}
        alt="kombinacija"
      />
      <img
        className="circle"
        src={typeof props.comb[3] === "undefined" ? source : props.comb[3]}
        alt="kombinacija"
      />
    </>
  );
};

AttemptPanel.propTypes = {};

export default AttemptPanel;
