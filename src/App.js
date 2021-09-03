import "./App.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputPanel from "./lib/components/InputPanel";
import GamePanel from "./lib/components/GamePanel";
import Score from "./lib/components/Score";
import { ViewModel } from "./view_model/ViewModel";
import ScoreBoard from "./lib/components/ScoreBoard";

function App() {
  const dispatch = useDispatch();
  const model_state = useSelector((state) => state.model);
  const view_state = useSelector((state) => state.view);

  const { score } = model_state;

  const { comb_in_progress, attempts_view, correct_view, id } = view_state;

  const viewModel = new ViewModel(model_state, view_state, dispatch);

  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    viewModel.start_game();
    const response = await fetch(
      "http://localhost:8080/api/v1/player-score/top-score"
    );
    const data = await response.json();
    setPeople(data);
    setLoading(false);
  }, []);

  return (
    <>
      {score != -1 && (
        <Score
          score={score}
          viewModel={viewModel}
          correct_view={correct_view}
        ></Score>
      )}
      <div className="wrapper">
        <div className="container">
          <GamePanel
            comb_in_progress={comb_in_progress}
            attempts_view={attempts_view}
            id={id}
          ></GamePanel>
          <InputPanel viewModel={viewModel}></InputPanel>
        </div>
        {!loading ? (
          <ScoreBoard people={people}></ScoreBoard>
        ) : (
          <h1 style={{ color: "white" }}>Loading...</h1>
        )}
      </div>
    </>
  );
}

export default App;
