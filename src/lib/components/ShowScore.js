import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import AttemptPanel from "./AttemptPanel";
import { WebGejmikaService } from "../../services/WebGejmikaService";

const ShowScore = ({ score, correctView, viewModel }) => {
  const [state, setState] = useState({
    toolTipStatus: "toolTipHidden",
    isSaveButtonDisabled: false,
    message: "Please enter an username",
    messageStatus: "visible",
    messageColor: "messageWhite",
  });

  useEffect(() => {
    if (localStorage.getItem("username") === null) {
      setState({ ...state, isSaveButtonDisabled: true });
    }
  }, []);

  const [saveStatus, setSaveStatus] = useState();
  const [username, setUsername] = useState("");
  let webgejmikaservice = new WebGejmikaService();

  return (
    <div>
      <div className="score">
        {score == 0 ? (
          <h1>Sorry, better luck next time! :(</h1>
        ) : (
          <h1>You got {score} points!!!</h1>
        )}

        {score === 21 ? (
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
        )}
        <div className="correct">
          <h5>Correct combination:</h5>
          <AttemptPanel comb={correctView}></AttemptPanel>
        </div>
        <div className="saveScore">
          {localStorage.getItem("username") == null && score > 0 ? (
            <>
              <div className="tooltip">
                <input
                  type="text"
                  //className={state.isValid}
                  maxLength="8"
                  placeholder="Username - eg. MyName12"
                  onMouseLeave={() => {
                    setState({ ...state, toolTipStatus: "toolTipHidden" });
                  }}
                  onMouseEnter={() =>
                    setState({ ...state, toolTipStatus: "toolTipVisible" })
                  }
                  //onChange={async (e) => {setState(await viewModel.testInput(e.target.value));setUsername(e.target.value)}}

                  onChange={async (e) =>
                    await new Promise(() =>
                      setTimeout(async () => {
                        setState(await viewModel.testInput(e.target.value));
                        setUsername(e.target.value);
                      }, 100)
                    )
                  }
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
              className="saveScoreBtn"
              disabled={state.isSaveButtonDisabled || score == 0}
              onClick={async () => {
                setSaveStatus(
                  await webgejmikaservice.saveScore(username, score)
                );
                setState({
                  ...state,
                  isSaveButtonDisabled: true,
                  messageColor: "messageGreen",
                });
              }}
            >
              Save score!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowScore;
