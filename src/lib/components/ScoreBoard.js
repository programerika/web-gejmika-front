import React from "react";
import { useSelector } from "react-redux";
import globalStyles from "../global.module.css";
import styles from "./ScoreBoard.module.css";

const ScoreBoard = ({ viewModel, scoreViewModel }) => {
  const {
    topPlayers: { topPlayers, currentPlayer },
    boardView: { isPlayerRegistered, showPlayerBelowTopList },
  } = useSelector((state) => state.score);

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
                <td><span className={person.currentUserClass}><b>{i + 1}.</b></span></td>
                <td><span className={person.currentUserClass}>{person.username}</span></td>
                <td><span className={person.currentUserClass}>{person.score}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {
        showPlayerBelowTopList
        &&
        <div className={styles.scoreBoard}>
          <div className={styles.currentPlayerSeparator}>...</div>
          <div className={styles.currentPlayer}>
            <span className={styles.currentPlayerUsername}>
              {currentPlayer.username}
            </span> your score is <span className={styles.currentPlayerScore}>
              {currentPlayer.score}
            </span> 
            <br/>keep playing...
          </div>
        </div>
      }
      {
        isPlayerRegistered
        &&
        <div className={`${styles.scoreBoard} ${styles.deleteScore}`}>
          <button
            className={`${globalStyles.gameBtn} ${styles.deleteScoreBtn}`}
            onClick={() => scoreViewModel.deleteButtonClicked(viewModel)}
          >
            Delete score!
          </button>
        </div>
      }

    </>
  );
};

export default ScoreBoard;
