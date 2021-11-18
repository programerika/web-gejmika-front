import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import globalStyles from "../global.module.css";
import styles from "./ScoreBoard.module.css";
import ReactLoading from "react-loading";

const ScoreBoard = ({ scoreBoardViewModel }) => {
  const topPlayers = useSelector(
    (state) => state.score.topPlayers.topPlayers
  ); // prettier-ignore
  const showDeletePlayer = useSelector(
    (state) => state.score.boardView.showDeletePlayer
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
  const isBoardLoading = useSelector(
    (state) => state.score.isBoardLoading
  ); // prettier-ignore
  const errorMsg = useSelector(
    (state) => state.score.errorMsg
  ); // prettier-ignore

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
      {isBoardLoading && (
        <div className={styles.scoreBoard}>
          <ReactLoading
            className={styles.loadingIndicator}
            type={"spokes"}
            color={"#FFFFFF"}
          />
        </div>
      )}
      {errorMsg && (
        <div className={styles.scoreBoard}>
          <h3 className={styles.scoreBoardError}>{errorMsg}</h3>
        </div>
      )}
      {showPlayerBelowTopList && (
        <div className={styles.scoreBoard}>
          <div className={styles.currentPlayerSeparator}>...</div>
          <div className={styles.currentPlayer}>
            {score ? (
              <>
                <span className={styles.currentPlayerUsername}>{username}</span>{" "}
                your score is{" "}
                <span className={styles.currentPlayerScore}>{score}</span>
                <br />
                keep playing...{" "}
              </>
            ) : (
              <>
                Wellcome!
                <br />
                <span className={styles.currentPlayerUsername}>{username}</span>
              </>
            )}
          </div>
        </div>
      )}
      {showDeletePlayer && (
        <div className={`${styles.scoreBoard} ${styles.deleteScore}`}>
          <button
            className={`${globalStyles.gameBtn} ${styles.deleteScoreBtn}`}
            onClick={() => scoreBoardViewModel.deletePlayer()}
          >
            Delete score!
          </button>
        </div>
      )}
    </>
  );
};

export default ScoreBoard;
