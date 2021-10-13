import "./App.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputPanel from "./lib/components/InputPanel";
import GamePanel from "./lib/components/GamePanel";
import ShowScore from "./lib/components/ShowScore";
import ScoreBoard from "./lib/components/ScoreBoard";
import { WebGejmikaViewModel } from "./viewModel/WebGejmikaViewModel";
import Header from "./lib/components/Header";
import { ScoreViewModel } from "./viewModel/ScoreViewModel";

function App() {
  const dispatch = useDispatch();
  const modelState = useSelector((state) => state.model);
  const viewState = useSelector((state) => state.view);

  const { score } = modelState;

  const {
    combInProgress,
    attemptsView,
    correctView,
    id,
    topPlayers: { topPlayers, currentPlayer },
    gameOver,
  } = viewState;

  const viewModel = new WebGejmikaViewModel(modelState, viewState, dispatch);
  const scoreViewModel = new ScoreViewModel();

  useEffect(() => {
    viewModel.startGame();
  }, []);

  // useEffect(() => {
  //   console.log(JSON.stringify(topPlayers));
  //   console.log(JSON.stringify(currentPlayer));
  // }, [viewState]);

  useEffect(() => {
    console.log("SECRET: " + JSON.stringify(modelState));
  }, [modelState]);

  return (
    <>
      {gameOver ? (
        <div className="wrapper">
          <div className="container">
            <Header></Header>
            <GamePanel
              combInProgress={combInProgress}
              attemptsView={attemptsView}
              id={id}
            ></GamePanel>
            <ShowScore
              score={score}
              viewModel={viewModel}
              correctView={correctView}
              scoreViewModel={scoreViewModel}
            ></ShowScore>
          </div>
          <ScoreBoard
            people={topPlayers}
            currentPlayer={currentPlayer}
            viewModel={viewModel}
          ></ScoreBoard>
        </div>
      ) : (
        <div className="wrapper">
          <div className="container">
            <Header></Header>
            <GamePanel
              combInProgress={combInProgress}
              attemptsView={attemptsView}
              id={id}
            ></GamePanel>
            <InputPanel viewModel={viewModel}></InputPanel>
          </div>
          <ScoreBoard
            people={topPlayers}
            currentPlayer={currentPlayer}
            viewModel={viewModel}
          ></ScoreBoard>
        </div>
      )}
    </>
  );
}

export default App;
