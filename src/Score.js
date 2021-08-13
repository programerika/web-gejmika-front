import React from "react";
import ConfettiExplosion from "@reonomy/react-confetti-explosion";
import { useDispatch,useSelector } from "react-redux";
import all_actions from "./redux/actions";
import comb_to_icon from "./view_model/comb_to_icon";
import AttemptPanel from "./AttemptPanel";

const Score = ({ score }) => {
  const comb = useSelector((state) => state.input_reducers.secret_comb);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="score">
        <h2>
          You got {score} points!!!
          <div className="correct">
          <h6>Correct combination:</h6>
          <AttemptPanel comb={comb_to_icon(comb)}></AttemptPanel>
        </div>
          <button
            onClick={() => dispatch(all_actions.input_actions.start_game())}
          >
            Play again!
          </button>{" "}
        </h2>
      </div>
    </div>
  );
};

export default Score;
