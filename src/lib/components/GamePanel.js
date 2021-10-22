import React from "react";
import AttemptPanel from "./AttemptPanel";
import SVGIndicator from "./SVGIndicator";

const GamePanel = ({
  combInProgress,
  attemptsView,
  id,
  attemptsLength,
  combinationLength,
  viewModel,
}) => {
  return (
    <>
      {[...Array(attemptsLength).keys()].map((e, i) => {
        let { comb, colors } = viewModel.prepareGamePanelView(
          combInProgress,
          attemptsView,
          id,
          e
        );
        return (
          <div key={e} className="flex-cont">
            <AttemptPanel
              comb={comb}
            ></AttemptPanel>
            <SVGIndicator colors={colors}></SVGIndicator>
          </div>
        );
      })}
    </>
  );
};

export default GamePanel;
