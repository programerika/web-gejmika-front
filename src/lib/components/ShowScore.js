import React, { useEffect, useMemo, useState } from "react";
import Confetti from "react-confetti";
import AttemptPanel from "./AttemptPanel";
import globalStyles from "../global.module.css";
import styles from "./ShowScore.module.css";
import { useSelector } from "react-redux";

const ShowScore = ({ scoreViewModel }) => {
  const score = useSelector((state) => state.model.score);
  const correctView = useSelector((state) => state.view.correctView);
  const [state, setState] = useState(scoreViewModel.initializeView(score));
  const confetti = useMemo(
    () => scoreViewModel.confettiPerScore(score),
    [score]
  );
  scoreViewModel.setStateCallback(state, setState);

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
          y: confetti.y,
          w: confetti.width,
          h: confetti.height,
        }}
        initialVelocityX={confetti.initialVelocityX}
        initialVelocityY={confetti.initialVelocityY}
      />

      <div className={styles.correct}>
        <h5>Correct combination:</h5>
        <AttemptPanel comb={correctView}></AttemptPanel>
      </div>
      <div className={styles.saveScore}>
        {state.offerToRegisterPlayer && (
          <>
            <div className={styles.tooltip}>
              <input
                type="text"
                className={state.isUsernameValid}
                maxLength="8"
                placeholder="Username - eg. MyName12"
                onMouseLeave={() => scoreViewModel.hideToolTip()}
                onMouseEnter={() => scoreViewModel.showToolTip()}
                onChange={async (e) =>
                  scoreViewModel.usernameInputOnChange(e.target.value)
                }
              />
              <div className={styles.tooltiptext + " " + state.toolTipStatus}>
                Username has to have 4 - 6 characters with last two numbers
              </div>
            </div>
            <p className={state.messageColor}>{state.message}</p>
          </>
        )}
        <div className={styles.buttons}>
          <button
            className={globalStyles.gameBtn}
            onClick={() => scoreViewModel.playAgain()}
          >
            Play again!
          </button>

          {state.offerToRegisterPlayer && (
            <button
              className={globalStyles.gameBtn}
              disabled={state.isSaveButtonDisabled}
              onClick={() => scoreViewModel.saveScoreState(score)}
            >
              {state.saveButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowScore;
