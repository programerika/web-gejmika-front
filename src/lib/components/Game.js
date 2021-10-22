import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputPanel from "./InputPanel";
import GamePanel from "./GamePanel";
import ShowScore from "./ShowScore";
import ScoreBoard from "./ScoreBoard";
import { WebGejmikaViewModel } from "../../viewModel/WebGejmikaViewModel";
import Header from "./Header";
import { ScoreViewModel } from "../../viewModel/ScoreViewModel";

const Game = () => {
  const dispatch = useDispatch();
  const modelState = useSelector((state) => state.model);
  const viewState = useSelector((state) => state.view);
  const scoreState = useSelector((state) => state.score);

  const { score, gameOver } = modelState;

  const {
    topPlayers: { topPlayers, currentPlayer },
  } = scoreState;

  const {
    combInProgress,
    attemptsView,
    correctView,
    id,
    gameDifficulty: { combinationLength, attemptsLength },
  } = viewState;


  const scoreViewModel = new ScoreViewModel(scoreState, dispatch);

  const viewModel = new WebGejmikaViewModel(
    modelState,
    viewState,
    scoreState,
    dispatch
  );

  //TODO move to WebGejmikaViewModel
  const correctView2 = viewModel.prepareAttemptPanelView(correctView);

  useEffect(() => {
    viewModel.startGame();
  }, []);

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
              viewModel={viewModel}
              combinationLength={combinationLength}
              attemptsLength={attemptsLength}
            ></GamePanel>
            <ShowScore
              score={score}
              viewModel={viewModel}
              correctView={correctView2}
              scoreViewModel={scoreViewModel}
              combinationLength={combinationLength}
            ></ShowScore>
          </div>
          <ScoreBoard
            people={topPlayers}
            currentPlayer={currentPlayer}
            scoreViewModel={scoreViewModel}
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
              combinationLength={combinationLength}
              viewModel={viewModel}
              attemptsLength={attemptsLength}
            ></GamePanel>
            <InputPanel viewModel={viewModel}></InputPanel>
          </div>
          <ScoreBoard
            people={topPlayers}
            currentPlayer={currentPlayer}
            scoreViewModel={scoreViewModel}
            viewModel={viewModel}
          ></ScoreBoard>
        </div>
      )}
    </>
  );
};
export default Game;
