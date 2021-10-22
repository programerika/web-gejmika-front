import React from "react";
import AttemptPanel from "./AttemptPanel";
import SVGIndicator from "./SVGIndicator";

const GamePanel = ({ attempts }) => {
  return (
    <>
      {attempts.map((attempt, i) => {
        return (
          <div key={i} className="flex-cont">
            <AttemptPanel comb={attempt.comb}></AttemptPanel>
            <SVGIndicator colors={attempt.colors}></SVGIndicator>
          </div>
        );
      })}
    </>
  );
};

export default GamePanel;
