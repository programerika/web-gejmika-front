import React from "react";
import ConfettiExplosion from "@reonomy/react-confetti-explosion";
import { useDispatch } from "react-redux";
import all_actions from "./redux/actions";

const Score = ({ score }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="score">
        <h2>
          You got {score} points!!!
          {score == 21 ? (
            <ConfettiExplosion
              force={0.7}
              duration={3000}
              particleCount={390}
              floorHeight={950}
              floorWidth={3000}
            ></ConfettiExplosion>
          ) : score == 13 ? (
            <ConfettiExplosion
              force={0.5}
              duration={2000}
              particleCount={300}
              floorHeight={950}
              floorWidth={2500}
            ></ConfettiExplosion>
          ) : (
            <ConfettiExplosion
              force={0.3}
              duration={1500}
              particleCount={250}
              floorHeight={950}
              floorWidth={2000}
            ></ConfettiExplosion>
          )}
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
