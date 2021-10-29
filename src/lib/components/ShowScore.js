import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useSelector } from "react-redux";
import AttemptPanel from "./AttemptPanel";

const ShowScore = ({ score, viewModel, scoreViewModel, correctView }) => {
  const [state, setState] = useState({});
  const [saveStatus, setSaveStatus] = useState();
  const [username, setUsername] = useState("");
  // const [confetti, setConfetti] = useState({});

  const { showScoreView, conffetiView } = useSelector((state) => state.score);

  // const { correctView } = useSelector((state) => state.view);

  useEffect(() => {
    scoreViewModel.initializeView(score);
  }, []);

  console.log("SHOW SCORE: " + JSON.stringify(showScoreView));

  return (
    <div className="score">
      <h1>{showScoreView.scoreMsg}</h1>

      <Confetti
        width={conffetiView.width}
        height={conffetiView.height}
        tweenDuration={conffetiView.tweenDuration}
        recycle={conffetiView.recycle}
        numberOfPieces={conffetiView.numberOfPieces}
        wind={conffetiView.wind}
        gravity={conffetiView.gravity}
        confettiSource={{
          x: conffetiView.x,
          y: conffetiView.y,
          w: window.innerWidth,
          h: window.innerHeight,
        }}
        initialVelocityX={conffetiView.initialVelocityX}
        initialVelocityY={conffetiView.initialVelocityY}
      />

      <div className="correct">
        <h5>Correct combination:</h5>
        <AttemptPanel comb={correctView}></AttemptPanel>
      </div>
      <div className="saveScore">
        {scoreViewModel.checkStorageAndScore(score) ? (
          <>
            <div className="tooltip">
              <input
                type="text"
                className={showScoreView.isUsernameValid}
                maxLength="8"
                placeholder="Username - eg. MyName12"
                onMouseLeave={() => {
                  scoreViewModel.hideToolTip();
                }}
                onMouseEnter={() => {
                  scoreViewModel.showToolTip();
                }}
                onChange={async (e) => {
                  scoreViewModel.validateUsername(e.target.value);
                }}
              />

              <div className={"tooltiptext " + showScoreView.toolTipStatus}>
                Username has to have 4 - 6 characters with last two numbers
              </div>
            </div>
            <p
              className={
                showScoreView.messageStatus + " " + showScoreView.messageColor
              }
            >
              {showScoreView.message}
            </p>
          </>
        ) : (
          <p
            className={
              showScoreView.messageStatus + " " + showScoreView.messageColor
            }
          >
            {scoreViewModel.saveStatus}
          </p>
        )}

        <div className="buttons">
          <button
            className="playAgainBtn"
            onClick={() => {
              viewModel.startGame();
            }}
          >
            Play again!
          </button>

          <button
            className={"saveScoreBtn " + showScoreView.saveButtonStatus}
            // disabled={scoreViewModel.disableSaveScoreButton(
            //   showScoreView.isSaveButtonDisabled,
            //   score
            // )}
            onClick={async () => {
              scoreViewModel.saveScoreState(score).then(() => {
                // scoreViewModel.initializeScoreBoardView();
              });
            }}
          >
            Save score!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowScore;
