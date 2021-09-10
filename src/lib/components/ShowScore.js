import React from "react";
import Confetti from "react-confetti";
import AttemptPanel from "./AttemptPanel";

const ShowScore = ({ score, correctView, viewModel }) => {
  return (
    <div>
      <div className="score">
          {
              score == 0 ? <h1>Sorry, better luck next time! :(</h1> : <h1>You got {score} points!!!</h1>
          }
        
        {}
        {score === 21 ? (
          <Confetti
            width={window.innerWidth+50}
            height={window.innerHeight}
            tweenDuration={3000}
            recycle={false}
            numberOfPieces={600}
            wind={0.05}
            gravity={0.2}
             confettiSource={{
               x: 0,
               y: 0,
               w: window.innerWidth,
               h: window.innerHeight
             }}

            initialVelocityX={20}
            initialVelocityY={20}
          />
        ) : score === 13 ? (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            tweenDuration={3000}
            recycle={false}
            numberOfPieces={200}
            wind={0.05}
            gravity={0.2}
            confettiSource={{
              x: 0,
              y: 0,
              w: window.innerWidth,
              h: window.innerHeight
            }}
          />
        ) : score === 8 ? (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            tweenDuration={3000}
            recycle={false}
            numberOfPieces={100}
            wind={0.05}
            gravity={0.2}
            confettiSource={{
               x: 0,
               y: 0,
               w: window.innerWidth,
               h: window.innerHeight,
             }}
          />
        ) : (
          <></>
        )}
        <div className="correct">
          <h5>Correct combination:</h5>
          <AttemptPanel comb={correctView}></AttemptPanel>
        </div>
        <div className="saveScore">
        <button className="playAgainBtn" onClick={() => viewModel.startGame()}>
          Play again!
        </button>{" "}
        <button className="saveScoreBtn" onClick={() => viewModel.startGame()}>
          Save score!
        </button>{" "}
        </div>
        
      </div>
    </div>
  );
};

export default ShowScore;
