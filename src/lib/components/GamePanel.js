import React from "react";
import AttemptPanel from "./AttemptPanel";
import SVGIndicator from "./SVGIndicator";

const GamePanel = ({ combInProgress, attemptsView, id }) => {
  const attps = [0, 1, 2, 3, 4];

  return (
    <>
      {attps.map((e, i) => {
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
