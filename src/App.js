import "./App.css";
import { HelloComponent } from "./lib";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import input_actions from "./redux/actions/input_actions";
import new_game from "./model/new_game";
import is_target_reached from "./model/is_target_reached";
import make_attempt from "./model/make_attempt";
import next_attempt_id from "./model/next_attempt_id";
import score from "./model/score";
import test_gen from "./model/test_gen";
import AttemptPanel from "./AttemptPanel";
import comb_to_icon from "./view_model/comb_to_icon";
import attempts from "./model/attempts";
import code_length from "./model/code_length";
import Indicator from "./Indicator";
import outcome_to_color from "./view_model/outcome_to_color";
import combination from "./model/combination";
import InputPanel from "./InputPanel";
import attp_in_progress from "./view_model/attp_in_progress";

function App() {
  const userAttp = ["K", "P", "K", "P"];

  const [res1, setRes1] = useState([]);
  const [res2, setRes2] = useState([]);
  const [res3, setRes3] = useState([]);
  const [res4, setRes4] = useState([]);
  const [res5, setRes5] = useState([]);

  const [out1, setOut1] = useState([]);
  const [out2, setOut2] = useState([]);
  const [out3, setOut3] = useState([]);
  const [out4, setOut4] = useState([]);
  const [out5, setOut5] = useState([]);

  const [attp, setAttp] = useState([]);

  useEffect(() => {
    new_game();
    while (!is_target_reached()) {
      console.log("------ ATTEMPT -------");
      make_attempt(next_attempt_id(), test_gen());
    }
    console.log("Your score is: " + score());

    setRes1(attempts[0].attempt_code);
    setRes2(attempts[1].attempt_code);
    setRes3(attempts[2].attempt_code);
    setRes4(attempts[3].attempt_code);
    setRes5(attempts[4].attempt_code);

    setOut1(attempts[0].attempt_outcome);
    setOut2(attempts[1].attempt_outcome);
    setOut3(attempts[2].attempt_outcome);
    setOut4(attempts[3].attempt_outcome);
    setOut5(attempts[4].attempt_outcome);
  }, []);

  useEffect(() => {
    setAttp(attp_in_progress);
    console.log("im here");
  }, [InputPanel]);

  const attp_in_prog = useSelector(
    (state) => state.input_reducers.attp_in_progress
  );
  const attps = useSelector((state) => state.input_reducers.attempts);
  const id = useSelector((state) => state.input_reducers.attp_id);

  const check_color = (attp_id) => {
    if (id + 1 == attp_id) {
      return "gray";
    } else {
      return outcome_to_color(attps[attp_id].attempt_code);
    }
  };

  return (
    <>
      <div>
        <div className="correct">
          <h6>Correct combination:</h6>
          <AttemptPanel comb={comb_to_icon(combination)}></AttemptPanel>
        </div>
        <div className="container">
          <div className="flex-cont">
            <AttemptPanel
              comb={
                id + 1 == 0
                  ? comb_to_icon(attp_in_prog)
                  : attps.length >= 1
                  ? comb_to_icon(attps[0].attempt_code)
                  : comb_to_icon(["", "", "", ""])
              }
            ></AttemptPanel>
            <Indicator
              color={
                id + 1 == 0
                  ? "gray"
                  : attps.length >= 1
                  ? outcome_to_color(attps[0].attempt_outcome)
                  : "gray"
              }
            ></Indicator>
          </div>
          <div className="flex-cont">
            <AttemptPanel
              comb={
                id + 1 == 1
                  ? comb_to_icon(attp_in_prog)
                  : attps.length >= 2
                  ? comb_to_icon(attps[1].attempt_code)
                  : comb_to_icon([])
              }
            ></AttemptPanel>
            <Indicator
              color={
                id + 1 == 1
                  ? "gray"
                  : attps.length >= 2
                  ? outcome_to_color(attps[1].attempt_outcome)
                  : "gray"
              }
            ></Indicator>
          </div>
          <div className="flex-cont">
            <AttemptPanel
              comb={
                id + 1 == 2
                  ? comb_to_icon(attp_in_prog)
                  : attps.length >= 3
                  ? comb_to_icon(attps[2].attempt_code)
                  : comb_to_icon([])
              }
            ></AttemptPanel>
            <Indicator
              color={
                id + 1 == 2
                  ? "gray"
                  : attps.length >= 3
                  ? outcome_to_color(attps[2].attempt_outcome)
                  : "gray"
              }
            ></Indicator>
          </div>
          <div className="flex-cont">
            <AttemptPanel
              comb={
                id + 1 == 3
                  ? comb_to_icon(attp_in_prog)
                  : attps.length >= 4
                  ? comb_to_icon(attps[3].attempt_code)
                  : comb_to_icon([])
              }
            ></AttemptPanel>
            <Indicator
              color={
                id + 1 == 3
                  ? "gray"
                  : attps.length >= 4
                  ? outcome_to_color(attps[3].attempt_outcome)
                  : "gray"
              }
            ></Indicator>
          </div>
          <div className="flex-cont">
            <AttemptPanel
              comb={
                id + 1 == 4
                  ? comb_to_icon(attp_in_prog)
                  : attps.length >= 5
                  ? comb_to_icon(attps[4].attempt_code)
                  : comb_to_icon([])
              }
            ></AttemptPanel>
            <Indicator
              color={
                id + 1 == 4
                  ? "gray"
                  : attps.length >= 5
                  ? outcome_to_color(attps[4].attempt_outcome)
                  : "gray"
              }
            ></Indicator>
          </div>
        </div>
        <InputPanel onClick={() => console.log("im clicked!")}></InputPanel>
      </div>
    </>
  );
}

export default App;
