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
            <th>Username</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {topPlayers.map((person, i) => {
            return (
              <tr key={i} className={`${styles.personScore} ${person.rowColor}`}>
                <td>
                  <b>{i + 1}.</b>
                </td>
                <td>{person.username}</td>
                <td>{person.score}</td>
              </tr>
            );
          })}

          {
            showPlayerBelowTopList
            &&
            <tr className={`${styles.currentPlayerSeparator}`}>
              <td></td>
              <td>...</td>
              <td></td>
            </tr>
          }
          {
            showPlayerBelowTopList
            &&
            <tr className={`${styles.personScore} ${styles.currentPlayer}`}>
              <td>...</td>
              <td>{currentPlayer.username}</td>
              <td>{currentPlayer.score}</td>
            </tr>
          }

        </tbody>
      </table>
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
