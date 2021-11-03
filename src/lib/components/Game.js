import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputPanel from "./InputPanel";
import GamePanel from "./GamePanel";
import ShowScore from "./ShowScore";
import ScoreBoard from "./ScoreBoard";
import { WebGejmikaViewModel } from "../viewModel/WebGejmikaViewModel";
import Header from "./Header";
import { ScoreViewModel } from "../viewModel/ScoreViewModel";
import { ScoreBoardViewModel } from "../viewModel/ScoreBoardViewModel";
import styles from "./Game.module.css";

const Game = () => {
  const dispatch = useDispatch();
  const modelState = useSelector((state) => state.model);
  const viewState = useSelector((state) => state.view);
  const scoreState = useSelector((state) => state.score);

  const { score, gameOver } = modelState;

  const {
    correctView,
    gameDifficulty: { combinationLength },
  } = viewState;

  
  const scoreBoardViewModel = new ScoreBoardViewModel(scoreState, dispatch);
  const scoreViewModel = new ScoreViewModel(scoreState, dispatch, scoreBoardViewModel);

  const viewModel = new WebGejmikaViewModel(
    modelState,
    viewState,
    scoreViewModel,
    dispatch
  );
  //TODO ukloniti zavisnosti izmedju modela koliko je moguce!
  scoreBoardViewModel.viewModel = viewModel;

  //TODO move to WebGejmikaViewModel
  const correctView2 = viewModel.prepareAttemptPanelView(correctView);

  useEffect(() => {
    viewModel.startGame();
  }, []);

  useEffect(() => {
    console.log("SECRET: " + JSON.stringify(modelState.secretComb));
  }, [modelState]);

  return (
    <>
      {gameOver ? (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <Header></Header>
            <GamePanel></GamePanel>
            <ShowScore
              score={score}
              viewModel={viewModel}
              correctView={correctView2}
              scoreViewModel={scoreViewModel}
              combinationLength={combinationLength}
            ></ShowScore>
          </div>
          <div className={styles.container}>
            <ScoreBoard
              scoreViewModel={scoreViewModel}
              scoreBoardViewModel={scoreBoardViewModel}
              viewModel={viewModel}
            ></ScoreBoard>
          </div>
        </div>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <Header></Header>
            <GamePanel></GamePanel>
            <InputPanel viewModel={viewModel}></InputPanel>
          </div>
          <div className={styles.container}>
            <ScoreBoard
              scoreViewModel={scoreViewModel}
              scoreBoardViewModel={scoreBoardViewModel}
              viewModel={viewModel}
            ></ScoreBoard>
          </div>
        </div>
      )}
    </>
  );
};
export default Game;
