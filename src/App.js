import "./App.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputPanel from "./lib/components/InputPanel";
import GamePanel from "./lib/components/GamePanel";
import ShowScore from "./lib/components/ShowScore";
import { WebGejmikaViewModel } from "./viewModel/WebGejmikaViewModel";
import Header from './lib/components/Header'

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
    {/* <Header></Header> */}
      {score != -1 ? (
        // <Score
        //   score={score}
        //   viewModel={viewModel}
        //   correct_view={correct_view}
        // ></Score>
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
         ></ShowScore>
        </div>
      </div>
      ) : (<div className="wrapper">
      <div className="container">
        <Header></Header>
        <GamePanel
          combInProgress={combInProgress}
          attemptsView={attemptsView}
          id={id}
        ></GamePanel>
        <InputPanel viewModel={viewModel}></InputPanel>
      </div>
    </div>)
    }
    </>
  );
}

export default App;
