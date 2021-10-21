import React from "react";
import AttemptPanel from "./AttemptPanel";
import SVGIndicator from "./SVGIndicator";

const GamePanel = ({
  combInProgress,
  attemptsView,
  id,
  attemptIncomplete,
  attemptsLength,
  combinationLength,
}) => {
  return (
    <>
      {[...Array(attemptsLength).keys()].map((e, i) => {
        return (
          <div key={e} className="flex-cont">
            <AttemptPanel
              comb={
                id + 1 == e
                  ? combInProgress
                  : typeof attemptsView[e] !== "undefined"
                  ? attemptsView[e].attemptViewComb
                  : [
                      "./icons/circle.png",
                      "./icons/circle.png",
                      "./icons/circle.png",
                      "./icons/circle.png",
                    ]
              }
              attemptIncomplete={id + 1 == e ? attemptIncomplete : ""}
              combinationLength={combinationLength}
            ></AttemptPanel>
            <SVGIndicator
              colors={
                typeof attemptsView[e] !== "undefined"
                  ? attemptsView[e].attemptViewOutcome
                  : ["lightgray", "lightgray", "lightgray", "lightgray"]
              }
            ></SVGIndicator>
          </div>
        );
      })}
    </>
  );
};

export default GamePanel;
