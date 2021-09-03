import React from "react";
import { useState } from "react";
import Confetti from "react-confetti";
import AttemptPanel from "./AttemptPanel";

const Score = ({ score, correct_view, viewModel }) => {
  const [save, setSave] = useState(false);
  const [username, setUsername] = useState("");
  const [showUser, setShowUser] = useState(false);
  const [correct, setCorrect] = useState(true);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSaveScore = () => {
    setSave(true);
    setCorrect(false);
  };

  return (
    <div>
      {correct && (
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
          <button className="saveScore" onClick={() => handleSaveScore()}>
            Save score
          </button>
        </div>
      )}

      {save && (
        <div className="score">
          <h1 style={{ color: "red" }}>Enter username: </h1>{" "}
          <input type="text" onChange={(e) => handleChange(e)} />
          <button onClick={() => viewModel.save_score(score, username)}>
            SAVE
          </button>
        </div>
      )}

      {showUser && (
        <div>
          <h1 style={{ color: "white" }}>
            {username} you successfully saved your score!
          </h1>
          <button className="playAgain" onClick={() => viewModel.start_game()}>
            Play again!
          </button>{" "}
        </div>
      )}
    </div>
  );
};

export default Score;
