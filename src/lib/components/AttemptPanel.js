import React from "react";

const AttemptPanel = ({ comb }) => {
  return (
    <>
      {comb.map((item, index) => {
        return (
          <img
            key={index}
            className={item.imgClassName}
            src={item.imgSrc}
            alt="kombinacija"
          />
        );
      })}
    </>
  );
};

export default AttemptPanel;
