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
  viewModel,
}) => {
  return (
    <>
      {[...Array(attemptsLength).keys()].map((e, i) => {
        let { comb, attemptIncpl, colors } = viewModel.prepareGamePanelView(
          combInProgress,
          attemptsView,
          id,
          attemptIncomplete,
          e
        );
        return (
          <div key={e} className="flex-cont">
            <AttemptPanel
              comb={comb}
              attemptIncomplete={attemptIncpl}
              combinationLength={combinationLength}
              viewModel={viewModel}
            ></AttemptPanel>
            <SVGIndicator colors={colors}></SVGIndicator>
          </div>
        );
      })}
    </>
  );
};

export default GamePanel;
