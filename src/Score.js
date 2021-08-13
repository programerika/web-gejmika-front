import React from "react";
import { useDispatch } from "react-redux";
import all_actions from "./redux/actions";
import Confetti from "react-confetti";
import { setTimeout } from "timers";
import { useEffect, useState } from "react";
import ConfettiExplosion from "@reonomy/react-confetti-explosion";
import { useDispatch, useSelector } from "react-redux";
import all_actions from "./redux/actions";
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
        <h2>
          You got {score} points!!!
          {}
          {score == 21 ? (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              tweenDuration={3000}
              recycle={explode}
              numberOfPieces={300}
              wind={0.05}
              gravity={0.2}
              confettiSource={{ x: 100, y: 100, w: window.innerWidth, h: 500 }}
              initialVelocityX={10}
              initialVelocityY={10}
            />
          ) : score == 13 ? (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              tweenDuration={3000}
              recycle={explode}
              numberOfPieces={200}
              wind={0.05}
              gravity={0.2}
              confettiSource={{ x: 100, y: 100, w: window.innerWidth, h: 500 }}
            />
          ) : score == 8 ? (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              tweenDuration={3000}
              recycle={explode}
              numberOfPieces={150}
              wind={0.05}
              gravity={0.2}
              confettiSource={{ x: 100, y: 100, w: window.innerWidth, h: 500 }}
            />
          ) : (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              tweenDuration={3000}
              recycle={explode}
              numberOfPieces={100}
              wind={0.05}
              gravity={0.2}
              confettiSource={{ x: 100, y: 100, w: window.innerWidth, h: 500 }}
            />
          )}
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
