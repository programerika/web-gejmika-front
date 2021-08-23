import "./App.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AttemptPanel from "./AttemptPanel";
import comb_to_icon from "./view_model/comb_to_icon";
import outcome_to_color from "./view_model/outcome_to_color";
import InputPanel from "./InputPanel";
import SVGIndicator from "./SVGIndicator";

import Score from "./Score";
import { ViewModel } from "./view_model/ViewModel";

function App() {
  const dispatch = useDispatch();
  const redux_state = useSelector((state) => state.input_reducers);
  const { attp_in_progress, attempts, attp_id, secret_comb, score } =
    redux_state;

  const viewModel = new ViewModel(redux_state, dispatch);

  useEffect(() => {
    viewModel.start_game();
  }, []);

  useEffect(() => {
    console.log(
      "State change triggered: " +
        attp_in_progress +
        attempts +
        attp_id +
        secret_comb +
        score
    );
  }, [attp_in_progress]);

  return (
    <>
      {score != -1 && <Score score={score}></Score>}
      <div className="wrapper">
        <div className="container">
          <div className="flex-cont">
            <AttemptPanel
              comb={
                attp_id + 1 === 0
                  ? comb_to_icon(attp_in_progress)
                  : attempts.length >= 1
                  ? comb_to_icon(attempts[0].attempt_code)
                  : comb_to_icon([])
              }
            ></AttemptPanel>

            {/* <Indicator
              color={
             
              }
            ></Indicator> */}
            <SVGIndicator
              colors={
                attp_id + 1 === 0
                  ? ["grey", "grey", "grey", "grey"]
                  : attempts.length >= 1
                  ? outcome_to_color(attempts[0].attempt_outcome)
                  : ["grey", "grey", "grey", "grey"]
              }
              indID="prvi"
            ></SVGIndicator>
          </div>
          <div className="flex-cont">
            <AttemptPanel
              comb={
                attp_id + 1 === 1
                  ? comb_to_icon(attp_in_progress)
                  : attempts.length >= 2
                  ? comb_to_icon(attempts[1].attempt_code)
                  : comb_to_icon([])
              }
            ></AttemptPanel>
            {/* <Indicator
              color={
                id + 1 == 1
                  ? "gray"
                  : attps.length >= 2
                  ? outcome_to_color(attps[1].attempt_outcome)
                  : "gray"
              }
            ></Indicator> */}
            <SVGIndicator
              colors={
                attp_id + 1 === 1
                  ? ["grey", "grey", "grey", "grey"]
                  : attempts.length >= 2
                  ? outcome_to_color(attempts[1].attempt_outcome)
                  : ["grey", "grey", "grey", "grey"]
              }
              indID="drugi"
            ></SVGIndicator>
          </div>
          <div className="flex-cont">
            <AttemptPanel
              comb={
                attp_id + 1 === 2
                  ? comb_to_icon(attp_in_progress)
                  : attempts.length >= 3
                  ? comb_to_icon(attempts[2].attempt_code)
                  : comb_to_icon([])
              }
            ></AttemptPanel>
            {/* <Indicator
              color={
                id + 1 == 2
                  ? "gray"
                  : attps.length >= 3
                  ? outcome_to_color(attps[2].attempt_outcome)
                  : "gray"
              }
            ></Indicator> */}
            <SVGIndicator
              colors={
                attp_id + 1 === 2
                  ? ["grey", "grey", "grey", "grey"]
                  : attempts.length >= 3
                  ? outcome_to_color(attempts[2].attempt_outcome)
                  : ["grey", "grey", "grey", "grey"]
              }
              indID="treci"
            ></SVGIndicator>
          </div>
          <div className="flex-cont">
            <AttemptPanel
              comb={
                attp_id + 1 === 3
                  ? comb_to_icon(attp_in_progress)
                  : attempts.length >= 4
                  ? comb_to_icon(attempts[3].attempt_code)
                  : comb_to_icon([])
              }
            ></AttemptPanel>
            {/* <Indicator
              color={
                id + 1 == 3
                  ? "gray"
                  : attps.length >= 4
                  ? outcome_to_color(attps[3].attempt_outcome)
                  : "gray"
              }
            ></Indicator> */}
            <SVGIndicator
              colors={
                attp_id + 1 === 3
                  ? ["grey", "grey", "grey", "grey"]
                  : attempts.length >= 4
                  ? outcome_to_color(attempts[3].attempt_outcome)
                  : ["grey", "grey", "grey", "grey"]
              }
              indID="cetvrti"
            ></SVGIndicator>
          </div>
          <div className="flex-cont">
            <AttemptPanel
              comb={
                attp_id + 1 === 4
                  ? comb_to_icon(attp_in_progress)
                  : attempts.length >= 5
                  ? comb_to_icon(attempts[4].attempt_code)
                  : comb_to_icon([])
              }
            ></AttemptPanel>
            {/* <Indicator
              color={
                id + 1 == 4
                  ? "gray"
                  : attps.length >= 5
                  ? outcome_to_color(attps[4].attempt_outcome)
                  : "gray"
              }
            ></Indicator> */}
            <SVGIndicator
              colors={
                attp_id + 1 === 4
                  ? ["grey", "grey", "grey", "grey"]
                  : attempts.length >= 5
                  ? outcome_to_color(attempts[4].attempt_outcome)
                  : ["grey", "grey", "grey", "grey"]
              }
              indID="peti"
            ></SVGIndicator>
          </div>
          <InputPanel></InputPanel>
        </div>
      </div>
    </>
  );
}

export default App;
