import React from "react";

const AttemptPanel = ({ comb, combinationLength, viewModel }) => {
  return (
    <>
      {[...Array(combinationLength).keys()].map((num, index) => {
        let { imgClassName, imgSrc } = viewModel.prepareAttemptPanelView(
          comb[num]
        );
        return (
          <img
            key={index}
            className={imgClassName}
            src={imgSrc}
            alt="kombinacija"
          />
        );
      })}
    </>
  );
};

export default AttemptPanel;
