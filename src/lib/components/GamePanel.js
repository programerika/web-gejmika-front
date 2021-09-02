import React from "react";
import AttemptPanel from "./AttemptPanel";
import SVGIndicator from "./SVGIndicator";

const GamePanel = ({ comb_in_progress, attempts_view, id }) => {
  const attps = [0, 1, 2, 3, 4];

  return (
    <>
      {attps.map((e, i) => {
        return (
          <div key={e} className="flex-cont">
            <AttemptPanel
              comb={
                id + 1 == e
                  ? comb_in_progress
                  : typeof attempts_view[e] !== "undefined"
                  ? attempts_view[e].attempt_view_comb
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
                typeof attempts_view[e] !== "undefined"
                  ? attempts_view[e].attempt_view_outcome
                  : ["gray", "gray", "gray", "gray"]
              }
            ></SVGIndicator>
          </div>
        );
      })}
    </>
  );
};

export default GamePanel;
