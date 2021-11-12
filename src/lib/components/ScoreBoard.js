import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import globalStyles from "../global.module.css";
import styles from "./ScoreBoard.module.css";
import ReactLoading from "react-loading";

const ScoreBoard = ({ scoreBoardViewModel }) => {
  const topPlayers = useSelector((state) => state.score.topPlayers.topPlayers);
  const isPlayerRegistered = useSelector(
    (state) => state.score.boardView.isPlayerRegistered
  );
  const showPlayerBelowTopList = useSelector(
    (state) => state.score.boardView.showPlayerBelowTopList
  );
  const username = useSelector(
    (state) => state.score.topPlayers.currentPlayer.username
  );
  const score = useSelector(
    (state) => state.score.topPlayers.currentPlayer.score
  );
  const [state, setState] = useState({
    isBoardLoading: false,
    isInError: false,
    errorMsg: "",
  });
  scoreBoardViewModel.setStateCallback(state, setState);

  console.log("RERENDER ScoreBoard----------");

  return (
    <>
      <table className={styles.scoreBoard}>
        <thead>
          <tr className={styles.scoreBoardHeader}>
            <th>Rank</th>
            <th>Player</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {topPlayers.map((person, i) => {
            return (
              <tr key={i} className={styles.personScore}>
                <td>
                  <span className={person.currentUserClass}>
                    <b>{i + 1}.</b>
                  </span>
                </td>
                <td>
                  <span className={person.currentUserClass}>
                    {person.username}
                  </span>
                </td>
                <td>
                  <span className={person.currentUserClass}>
                    {person.score}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {state.isBoardLoading && (
        <div className={styles.loadingIndicator}>
          <ReactLoading type={"spokes"} color={"#FFFFFF"} />
        </div>
      )}
      {state.isInError && (
        <h3 className={styles.scoreBoardError}>{state.errorMsg}</h3>
      )}
      {showPlayerBelowTopList && (
        <div className={styles.scoreBoard}>
          <div className={styles.currentPlayerSeparator}>...</div>
          <div className={styles.currentPlayer}>
            <span className={styles.currentPlayerUsername}>{username}</span>{" "}
            your score is{" "}
            <span className={styles.currentPlayerScore}>{score}</span>
            <br />
            keep playing...
          </div>
        </div>
      )}
      {isPlayerRegistered && (
        <div className={`${styles.scoreBoard} ${styles.deleteScore}`}>
          <button
            className={`${globalStyles.gameBtn} ${styles.deleteScoreBtn}`}
            onClick={() => scoreBoardViewModel.deleteUsername()}
          >
            Delete score!
          </button>
        </div>
      )}
    </>
  );
};

export default ScoreBoard;
