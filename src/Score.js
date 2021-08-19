import React from "react";
import all_actions from "./redux/actions";
import Confetti from "react-confetti";
import { setTimeout } from "timers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import comb_to_icon from "./view_model/comb_to_icon";
import AttemptPanel from "./AttemptPanel";

const Score = ({ score }) => {
  const comb = useSelector((state) => state.input_reducers.secret_comb);
  const dispatch = useDispatch();
  const [explode, setExplode] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setExplode(false);
    }, 3000);
  }, [explode]);
  return (
    <div>
      <div className="score">
        <h1>You got {score} points!!!</h1>
        {}
        {score == 21 ? (
          <Confetti
            width={window.innerWidth}
            height={100}
            tweenDuration={3000}
            recycle={explode}
            numberOfPieces={300}
            wind={0.05}
            gravity={0.2}
            // confettiSource={{
            //   x: 0,
            //   y: 0,
            //   w: window.innerWidth,
            //   h: 0,
            // }}
            initialVelocityX={10}
            initialVelocityY={10}
          />
        ) : score == 13 ? (
          <Confetti
            width={window.innerWidth}
            height={100}
            tweenDuration={3000}
            recycle={explode}
            numberOfPieces={200}
            wind={0.05}
            gravity={0.2}
            // confettiSource={{
            //   x: 0,
            //   y: 0,
            //   w: window.innerWidth,
            //   h: 0,
            // }}
          />
        ) : score == 8 ? (
          <Confetti
            width={window.innerWidth}
            height={100}
            tweenDuration={3000}
            recycle={explode}
            numberOfPieces={150}
            wind={0.05}
            gravity={0.2}
            // confettiSource={{
            //   x: 0,
            //   y: 0,
            //   w: window.innerWidth,
            //   h: 0,
            // }}
          />
        ) : (
          //
          <h1>Sorry, better luck next time! :(</h1>
        )}
        <div className="correct">
          <h5>Correct combination:</h5>
          <AttemptPanel comb={comb_to_icon(comb)}></AttemptPanel>
        </div>
        <button
          className="playAgain"
          onClick={() => dispatch(all_actions.input_actions.start_game())}
        >
          Play again!
        </button>{" "}
      </div>
    </div>
  );
};

export default Score;
