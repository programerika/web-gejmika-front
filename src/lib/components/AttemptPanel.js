import React from "react";
import { useState, useEffect } from "react";

const AttemptPanel = ({ comb, combinationLength, attemptIncomplete }) => {
  return (
    <>
      {[...Array(combinationLength).keys()].map((num, index) => {
        return (
          <img
            key={index}
            className={
              typeof comb[num] == "undefined"
                ? `circle ` + attemptIncomplete
                : `circle`
            }
            src={
              typeof comb[num] == "undefined" ? "./icons/circle.png" : comb[num]
            }
            alt="kombinacija"
          />
        );
      })}
    </>
  );
};

export default AttemptPanel;
