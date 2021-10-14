import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import AttemptPanel from "./AttemptPanel";
import { WebGejmikaService } from "../../services/WebGejmikaService";
import { WebGejmikaViewModel } from "../../viewModel/WebGejmikaViewModel";
import { ScoreViewModel } from "../../viewModel/ScoreViewModel";

const ShowScore = ({ score, correctView, viewModel, scoreViewModel }) => {
  const [state, setState] = useState({});
  const [saveStatus, setSaveStatus] = useState();
  const [username, setUsername] = useState("");
  const [confetti, setConfetti] = useState({});

  useEffect(() => {
    setConfetti(scoreViewModel.confettiPerScore(score));
    setState(scoreViewModel.initializeView(score));
    // const [state, setState] = useState({
    //   toolTipStatus: "toolTipHidden",
    //   isUsernameValid: "",
    //   isSaveButtonDisabled: false,
    //   message: "Please enter an username",
    //   messageStatus: "visible",
    //   messageColor: "messageWhite",
    //   hideSaveButton: "showSaveButton",
    //   scoreMsg: "",
    // });
  }, []);

  return (
    <div className="score">
      <h1>{state.scoreMsg}</h1>

      <Confetti
        width={confetti.width}
        height={confetti.height}
        tweenDuration={confetti.tweenDuration}
        recycle={confetti.recycle}
        numberOfPieces={confetti.numberOfPieces}
        wind={confetti.wind}
        gravity={confetti.gravity}
        confettiSource={{
          x: confetti.x,
          y: confetti.y,
          w: window.innerWidth,
          h: window.innerHeight,
        }}
        initialVelocityX={confetti.initialVelocityX}
        initialVelocityY={confetti.initialVelocityY}
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
                className={state.isUsernameValid}
                maxLength="8"
                placeholder="Username - eg. MyName12"
                onMouseLeave={() => {
                  setState({ ...state, toolTipStatus: "toolTipHidden" });
                }}
                onMouseEnter={() =>
                  setState({ ...state, toolTipStatus: "toolTipVisible" })
                }
                onChange={async (e) => {
                  setState(
                    await scoreViewModel.usernameValidation(e.target.value)
                  );
                  setUsername(e.target.value);
                }}
              />

              <div className={"tooltiptext " + state.toolTipStatus}>
                Username has to have 4 - 6 characters with last two numbers
              </div>
            </div>
            <p className={state.messageStatus + " " + state.messageColor}>
              {state.message}
            </p>
          </>
        ) : (
          <p className={state.messageStatus + " " + state.messageColor}>
            {saveStatus}
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
            className={"saveScoreBtn " + scoreViewModel.hideSaveButton(score)}
            disabled={scoreViewModel.disableSaveScoreButton(
              state.isSaveButtonDisabled,
              score
            )}
            onClick={async () => {
              setState({
                ...state,
                isSaveButtonDisabled: true,
                messageColor: "messageGreen",
                hideSaveButton: "hideSaveButton",
              });
              setSaveStatus(
                await scoreViewModel.saveUserScore(username, score)
              );
              viewModel.refreshScoreBoard();
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
