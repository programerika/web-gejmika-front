import React from "react";
import Confetti from "react-confetti";
import AttemptPanel from "./AttemptPanel";

const Score = ({ score, correct_view, viewModel }) => {
  return (
    <div>
      <div className="score">
        <h1>You got {score} points!!!</h1>
        {}
        {score === 21 ? (
          <Confetti
            width={window.innerWidth}
            height={300}
            tweenDuration={3000}
            recycle={false}
            numberOfPieces={600}
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
        ) : score === 13 ? (
          <Confetti
            width={window.innerWidth}
            height={300}
            tweenDuration={3000}
            recycle={false}
            numberOfPieces={400}
            wind={0.05}
            gravity={0.2}
            // confettiSource={{
            //   x: 0,
            //   y: 0,
            //   w: window.innerWidth,
            //   h: 0,
            // }}
          />
        ) : score === 8 ? (
          <Confetti
            width={window.innerWidth}
            height={300}
            tweenDuration={3000}
            recycle={false}
            numberOfPieces={300}
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
          <AttemptPanel comb={correct_view}></AttemptPanel>
        </div>
        <button className="playAgain" onClick={() => viewModel.start_game()}>
          Play again!
        </button>{" "}
      </div>
    </div>
  );
};

export default Score;
