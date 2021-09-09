import "./App.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputPanel from "./lib/components/InputPanel";
import GamePanel from "./lib/components/GamePanel";
import Score from "./lib/components/Score";
import { WebGejmikaViewModel } from "./viewModel/WebGejmikaViewModel";

function App() {
  const dispatch = useDispatch();
  const modelState = useSelector((state) => state.model);
  const viewState = useSelector((state) => state.view);

  const { score } = modelState;

  const { combInProgress, attemptsView, correctView, id } = viewState;

  const viewModel = new WebGejmikaViewModel(modelState, viewState, dispatch);

  useEffect(() => {
    viewModel.startGame();
  }, []);

  return (
    <>
      {score != -1 && (
        <Score
          score={score}
          viewModel={viewModel}
          correctView={correctView}
        ></Score>
      )}
      <div className="wrapper">
        <div className="container">
          <GamePanel
            combInProgress={combInProgress}
            attemptsView={attemptsView}
            id={id}
          ></GamePanel>
          <InputPanel viewModel={viewModel}></InputPanel>
        </div>
      </div>
    </>
  );
}

export default App;
