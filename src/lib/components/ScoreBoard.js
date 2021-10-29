import React from "react";
import { useSelector } from "react-redux";

const ScoreBoard = ({ viewModel, scoreViewModel }) => {
  const {
    topPlayers: { topPlayers, currentPlayer },
    boardView: { classPlayer11, classDeleteBtn },
  } = useSelector((state) => state.score);
  return (
    <>
      <table className="score-board ">
        <thead>
          <tr className="score-board-header">
            <th>Rank</th>
            <th>Username</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {topPlayers.map((person, i) => {
            return (
              <tr key={i} className={`person-score ` + person.rowColor}>
                <td>
                  <b>{i + 1}.</b>
                </td>
                <td>{person.username}</td>
                <td>{person.score}</td>
              </tr>
            );
          })}

          <tr className={`current-player-separator ` + classPlayer11}>
            <td></td>
            <td>...</td>
            <td></td>
          </tr>
          <tr className={`person-score currentPlayer ` + classPlayer11}>
            <td>11.</td>
            <td>{currentPlayer.username}</td>
            <td>{currentPlayer.score}</td>
          </tr>

          <button
            className={"delete-score-btn " + classDeleteBtn}
            onClick={() => scoreViewModel.deleteButtonClicked(viewModel)}
          >
            Delete
          </button>
        </tbody>
      </table>
    </>
  );
};

export default ScoreBoard;
