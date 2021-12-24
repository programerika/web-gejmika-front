import { Modal } from "react-responsive-modal";
import modalStyles from "react-responsive-modal/styles.css";
import globalStyles from "../global.module.css";
import { useState, useEffect, useMemo } from "react";
import styles from "./GameHelp.module.css";
import questionMark from "../icons/question-mark.png";
import { GameHelpViewModel } from "../viewModel/GameHelpViewModel";
import ReactTooltip from "react-tooltip";
import { useSelector } from "react-redux";
import React from "react";

const GameHelp = () => {
  const refs = useSelector((state) => state.view.refs);
  const attemptConfirmed = useSelector((state) => state.view.attemptConfirmed);
  const attemptFull = useSelector((state) => state.view.attemptFull);
  const combInProgress = useSelector((state) => state.view.combInProgress);

  const ghvm = useMemo(() => new GameHelpViewModel(), []);

  const [state, setState] = useState({
    open: false,
    isWalkThroughActive: false,
    walkthroughBtn: "Start walkthrough"
  });

  ghvm.setStateCallback(state, setState);

  const isWalkthroughActive = state.isWalkThroughActive;

  useEffect(() => {
    ghvm.showWalkthrough(combInProgress, refs, attemptConfirmed, attemptFull);
  }, [
    combInProgress,
    refs,
    isWalkthroughActive,
    attemptConfirmed,
    attemptFull,
    ghvm,
  ]);

  return (
    <div style={modalStyles}>
      <div className={styles.helpWrapper}>
        <img
          className={globalStyles.inputBtn}
          src={questionMark}
          alt="help"
          onClick={() => ghvm.onOpenModal()}
        />
      </div>
      {state.isWalkThroughActive && (
        <ReactTooltip
          effect="solid"
          border={true}
          place="top"
          type="light"
          getContent={() => {
            return ghvm.getCurrentStepContent();
          }}
          eventOff="none"
          event="none"
          clickable={true}
        />
      )}
      <Modal open={state.open} onClose={() => ghvm.onCloseModal()}>
        <div className={styles.helpText}>
          <h2>Code guess game</h2>
          <p>
            Code guess game is code-breaking single player game.
            <br />
            You have to guess the right four icons combination, out of six
            others.
            <br />
            Winning combination is already predefined.
            <br />
            The Player tries to guess the right pattern in five steps.
            <br />
            If the guessing is successful in three steps, the score will be 21
            points.
            <br />
            The fourth successful attempt will bring 13 and the fifth 8 points.
            <br />
            There is no points if the fifth attempt was bad.
            <br />
          </p>
        </div>
        <button
          onClick={() => ghvm.onCloseModal()}
          className={`${globalStyles.gameBtn} ${styles.gameBtn}`}
        >
          Close
        </button>
        <button
          onClick={() => {
            ghvm.toggleWalkthrough();
          }}
          className={`${globalStyles.gameBtn} ${styles.gameBtn}`}
        >
          {state.walkthroughBtn}
        </button>
      </Modal>
    </div>
  );
};

export default GameHelp;
