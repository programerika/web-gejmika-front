import React from "react";

const AttemptPanel = (props) => {
  return (
    <>
      {[0, 1, 2, 3].map((num, index) => {
        return (
          <img
            key={index}
            className="circle"
            src={
              typeof props.comb[num] == "undefined"
                ? "./icons/circle.png"
                : props.comb[num]
            }
            alt="kombinacija"
          />
        );
      })}
    </>
  );
};

export default AttemptPanel;
