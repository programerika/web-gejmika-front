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

  const { combInProgress, attemptsView, correctView, id, topPlayers } =
    viewState;

  const viewModel = new WebGejmikaViewModel(modelState, viewState, dispatch);
  const scoreViewModel = new ScoreViewModel()

  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // viewModel.getTopPlayers();
    viewModel.startGame();
    console.log(JSON.stringify(viewState));

    // const response = await fetch("http://localhost:8080/api/v1/top-score");
    // console.log(response.body);
    // console.log(response.status);

    // const data = await response.json();
    // setPeople(data);
    // console.log(JSON.stringify(data));

    // setLoading(false);
  }, []);

  useEffect(() => {
    console.log(JSON.stringify(viewState));
  }, [viewState]);

  useEffect(() => {
    console.log(JSON.stringify(modelState));
  }, [modelState]);

  return (
    <>
      {score != -1 ? (
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
          <ScoreBoard people={topPlayers}></ScoreBoard>
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
          <ScoreBoard people={topPlayers}></ScoreBoard>
        </div>
      )}
    </>
  );
}

export default App;
