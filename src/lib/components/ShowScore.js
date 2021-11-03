import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import AttemptPanel from "./AttemptPanel";
import globalStyles from "../global.module.css";
import styles from "./ShowScore.module.css";

const ShowScore = ({
  score,
  correctView,
  viewModel,
  scoreViewModel
}) => {
  const [state, setState] = useState({});
  const [saveStatus, setSaveStatus] = useState();
  const [username, setUsername] = useState("");
  const [confetti] = useState(scoreViewModel.confettiPerScore(score));

  useEffect(() => {
    setState(scoreViewModel.initializeView(score));
  }, [saveStatus]);

  return (
    <div className={styles.score}>
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
          y: confetti.y
        }}
        initialVelocityX={confetti.initialVelocityX}
        initialVelocityY={confetti.initialVelocityY}
      />

      <div className={styles.correct}>
        <h5>Correct combination:</h5>
        <AttemptPanel
          comb={correctView}
        ></AttemptPanel>
      </div>
      <div className={styles.saveScore}>
        {state.offerToRegisterPlayer ? (
          <>
            <div className={styles.tooltip}>
              <input
                type="text"
                className={state.isUsernameValid}
                maxLength="8"
                placeholder="Username - eg. MyName12"
                onMouseLeave={() => {
                  setState({ ...state, toolTipStatus: styles.toolTipHidden });
                }}
                onMouseEnter={() =>
                  setState({ ...state, toolTipStatus: styles.toolTipVisible })
                }
                onChange={async (e) => {
                  setState(
                    {...state, ...(await scoreViewModel.validateUsername(e.target.value))}
                  );
                  setUsername(e.target.value);
                }}
              />

              <div className={styles.tooltiptext + " " + state.toolTipStatus}>
                Username has to have 4 - 6 characters with last two numbers
              </div>
            </div>
            <p className={state.messageColor}>
              {state.message}
            </p>
          </>
        ) : (
          <p className={state.messageColor}>
            {saveStatus}
          </p>
        )}

        <div className={styles.buttons}>
          <button
            className={globalStyles.gameBtn}
            onClick={() => viewModel.startGame()}
          >
            Play again!
          </button>

          {
            state.offerToRegisterPlayer
            &&
            <button
              className={globalStyles.gameBtn}
              disabled={state.isSaveButtonDisabled}
              onClick={async () => {
                let [s1, s2] = await scoreViewModel.saveScoreState(
                  state,
                  username,
                  score
                );
                setState(s1);
                setSaveStatus(s2);
              }}
            >
              Save score!
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default ShowScore;
