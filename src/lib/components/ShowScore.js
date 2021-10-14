import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import AttemptPanel from "./AttemptPanel";
import { WebGejmikaService } from "../../services/WebGejmikaService";
import { WebGejmikaViewModel } from "../../viewModel/WebGejmikaViewModel";
import { ScoreViewModel } from "../../viewModel/ScoreViewModel";

const ShowScore = ({ score, correctView, viewModel, scoreViewModel }) => {
  const [state, setState] = useState({
    toolTipStatus: "toolTipHidden",
    isUsernameValid: "",
    isSaveButtonDisabled: false,
    message: "Please enter an username",
    messageStatus: "visible",
    messageColor: "messageWhite",
    hideSaveButton: "showSaveButton",
    scoreMsg: "",
  });

  const [conffeti, setConffeti] = useState({
    // width: window.innerWidth + 50,
    // height: window.innerHeight,
    // tweenDuration: 3000,
    // recycle: false,
    // numberOfPieces: 600,
    // wind: 0.05,
    // gravity: 0.2,
    // confettiSource: {
    //   x: 0,
    //   y: 0,
    //   w: window.innerWidth,
    //   h: window.innerHeight,
    // },
    // initialVelocityX: 20,
    // initialVelocityY: 20,
  });

  useEffect(() => {
    setConffeti(scoreViewModel.calculateConffetiProps(score));
    setState({
      ...state,
      isSaveButtonDisabled: scoreViewModel.disableSaveScoreIfUsernameExists(),
      scoreMsg: scoreViewModel.calculateScoreMsg(score),
    });
  }, []);

  const [saveStatus, setSaveStatus] = useState();
  const [username, setUsername] = useState("");

  return (
    <div className="score">
      <h1>{state.scoreMsg}</h1>

      <Confetti
        width={conffeti.width}
        height={conffeti.height}
        tweenDuration={conffeti.tweenDuration}
        recycle={conffeti.recycle}
        numberOfPieces={conffeti.numberOfPieces}
        wind={conffeti.wind}
        gravity={conffeti.gravity}
        confettiSource={conffeti.confettiSource}
        initialVelocityX={conffeti.initialVelocityX}
        initialVelocityY={conffeti.initialVelocityY}
      />

      {/* {score === 21 ? (
        <Confetti
          width={window.innerWidth + 50}
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
            h: window.innerHeight,
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
            h: window.innerHeight,
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
      )} */}
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

                // onChange={async (e) =>
                //   await new Promise(() =>
                //     setTimeout(async () => {
                //       setState(await viewModel.usernameValidation(e.target.value));
                //       setUsername(e.target.value);
                //     }, 100)
                //   )
                // }
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
            className={"saveScoreBtn " + state.hideSaveButton}
            disabled={state.isSaveButtonDisabled || score == 0}
            onClick={async () => {
              // viewModel.saveUsername(username);
              setSaveStatus(
                await scoreViewModel.saveUserScore(username, score)
              );
              setState({
                ...state,
                isSaveButtonDisabled: true,
                messageColor: "messageGreen",
                hideSaveButton: "hideSaveButton",
              });
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
