import "./App.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AttemptPanel from "./AttemptPanel";
import comb_to_icon from "./view_model/comb_to_icon";
import outcome_to_color from "./view_model/outcome_to_color";
import InputPanel from "./InputPanel";
import all_actions from "./redux/actions";
import SVGIndicator from "./SVGIndicator";
import ConfettiExplosion from "@reonomy/react-confetti-explosion";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(all_actions.input_actions.start_game());
  }, []);

  const comb = useSelector((state) => state.input_reducers.secret_comb);
  const attp_in_prog = useSelector(
    (state) => state.input_reducers.attp_in_progress
  );
  const attps = useSelector((state) => state.input_reducers.attempts);
  const id = useSelector((state) => state.input_reducers.attp_id);
  const score = useSelector((state) => state.input_reducers.score);

  return (
    <>
      <div>
        <div className="correct">
          <h6>Correct combination:</h6>
          <AttemptPanel comb={comb_to_icon(comb)}></AttemptPanel>
        </div>
        {score != -1 && (
          <div className="score">
            <h2>
              You got {score} points!!! <ConfettiExplosion></ConfettiExplosion>
              <button
                onClick={() => dispatch(all_actions.input_actions.start_game())}
              >
                Play again!
              </button>{" "}
            </h2>
          </div>
        )}
        <div className="container">
          <div className="flex-cont">
            <AttemptPanel
              comb={
                id + 1 === 0
                  ? comb_to_icon(attp_in_prog)
                  : attps.length >= 1
                  ? comb_to_icon(attps[0].attempt_code)
                  : comb_to_icon([])
              }
            ></AttemptPanel>

            {/* <Indicator
              color={
             
              }
            ></Indicator> */}
            <SVGIndicator
              colors={
                id + 1 === 0
                  ? ["grey", "grey", "grey", "grey"]
                  : attps.length >= 1
                  ? outcome_to_color(attps[0].attempt_outcome)
                  : ["grey", "grey", "grey", "grey"]
              }
              indID="prvi"
            ></SVGIndicator>
          </div>
          <div className="flex-cont">
            <AttemptPanel
              comb={
                id + 1 === 1
                  ? comb_to_icon(attp_in_prog)
                  : attps.length >= 2
                  ? comb_to_icon(attps[1].attempt_code)
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
                id + 1 === 1
                  ? ["grey", "grey", "grey", "grey"]
                  : attps.length >= 2
                  ? outcome_to_color(attps[1].attempt_outcome)
                  : ["grey", "grey", "grey", "grey"]
              }
              indID="drugi"
            ></SVGIndicator>
          </div>
          <div className="flex-cont">
            <AttemptPanel
              comb={
                id + 1 === 2
                  ? comb_to_icon(attp_in_prog)
                  : attps.length >= 3
                  ? comb_to_icon(attps[2].attempt_code)
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
                id + 1 === 2
                  ? ["grey", "grey", "grey", "grey"]
                  : attps.length >= 3
                  ? outcome_to_color(attps[2].attempt_outcome)
                  : ["grey", "grey", "grey", "grey"]
              }
              indID="treci"
            ></SVGIndicator>
          </div>
          <div className="flex-cont">
            <AttemptPanel
              comb={
                id + 1 === 3
                  ? comb_to_icon(attp_in_prog)
                  : attps.length >= 4
                  ? comb_to_icon(attps[3].attempt_code)
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
                id + 1 === 3
                  ? ["grey", "grey", "grey", "grey"]
                  : attps.length >= 4
                  ? outcome_to_color(attps[3].attempt_outcome)
                  : ["grey", "grey", "grey", "grey"]
              }
              indID="cetvrti"
            ></SVGIndicator>
          </div>
          <div className="flex-cont">
            <AttemptPanel
              comb={
                id + 1 === 4
                  ? comb_to_icon(attp_in_prog)
                  : attps.length >= 5
                  ? comb_to_icon(attps[4].attempt_code)
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
                id + 1 === 4
                  ? ["grey", "grey", "grey", "grey"]
                  : attps.length >= 5
                  ? outcome_to_color(attps[4].attempt_outcome)
                  : ["grey", "grey", "grey", "grey"]
              }
              indID="peti"
            ></SVGIndicator>
          </div>
        </div>
        <InputPanel></InputPanel>
      </div>
    </>
  );
}

export default App;
