import React from "react";
import { useEffect, useMemo } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import InputPanel from "./InputPanel";
import GamePanel from "./GamePanel";
import ShowScore from "./ShowScore";
import ScoreBoard from "./ScoreBoard";
import { WebGejmikaViewModel } from "../viewModel/WebGejmikaViewModel";
import Header from "./Header";
import { ScoreViewModel } from "../viewModel/ScoreViewModel";
import { ScoreBoardViewModel } from "../viewModel/ScoreBoardViewModel";
import styles from "./Game.module.css";
import GameHelp from "./GameHelp";

const Game = () => {
  const dispatch = useDispatch();
  const store = useStore();
  const gameOver = useSelector((state) => state.view.gameOver);

  const scoreBoardViewModel = useMemo(
    () => new ScoreBoardViewModel(dispatch),
    [dispatch]
  );
  const scoreViewModel = useMemo(
    () => new ScoreViewModel(scoreBoardViewModel),
    [scoreBoardViewModel]
  );
  const viewModel = useMemo(() => {
    const wgvm = new WebGejmikaViewModel(store, scoreViewModel, dispatch);
    scoreViewModel.setGameViewModel(wgvm);
    return wgvm;
  }, [store, scoreViewModel, dispatch]);

  useEffect(() => {
    viewModel.startGame();
  }, [viewModel]);

  useEffect(() => {
    console.log(
      "SECRET: " + JSON.stringify(store.getState().model?.secretComb)
    );
  });

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Header>
            <GameHelp />
          </Header>
          <GamePanel></GamePanel>
          {gameOver ? (
            <ShowScore scoreViewModel={scoreViewModel}></ShowScore>
          ) : (
            <InputPanel viewModel={viewModel}></InputPanel>
          )}
        </div>
        <div className={styles.container}>
          <ScoreBoard scoreBoardViewModel={scoreBoardViewModel}></ScoreBoard>
        </div>
      </div>
    </>
  );
};
export default Game;
