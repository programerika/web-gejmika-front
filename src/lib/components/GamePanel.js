import React from "react";
import { useSelector } from "react-redux";
import AttemptPanel from "./AttemptPanel";
import SVGIndicator from "./SVGIndicator";

const GamePanel = () => {
  const { preparedAttempts } = useSelector((state) => state.view);
  return (
    <>
      {preparedAttempts.map((attempt, i) => {
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
