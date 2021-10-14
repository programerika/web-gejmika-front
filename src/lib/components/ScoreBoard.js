import React from "react";
import { useState, useEffect } from "react";

const ScoreBoard = ({
  people,
  currentPlayer,
  viewModel,
  // classPlayer11,
  // classDeleteBtn,
}) => {
  const [scoreView, setScoreView] = useState({
    classPlayer11: "",
    classDeleteBtn: "",
  });
  useEffect(() => {
    console.log(
      "SCORE VIEW: " + scoreView.classPlayer11 + " " + scoreView.classDeleteBtn
    );
    setScoreView(viewModel.setScoreView());
  }, [people]);
  return (
    <table className="score-board ">
      <tr className="score-board-header">
        <th>Rank</th>
        <th>Username</th>
        <th>Points</th>
      </tr>
      {people.map((person, i) => {
        let { rowColor } = viewModel.highlightCurrentUser(person.username);
        return (
          <tr key={i} className={`person-score ` + rowColor}>
            <td>
              <b>{i + 1}.</b>
            </td>
            <td>{person.username}</td>
            <td>{person.score}</td>
          </tr>
        );
      })}
      {/* {viewModel.is11PlayerOnTheBoard() && ( */}

      <tr className={`current-player-separator ` + scoreView.classPlayer11}>
        <td></td>
        <td>...</td>
        <td></td>
      </tr>
      <tr className={`person-score currentPlayer ` + scoreView.classPlayer11}>
        <td>11.</td>
        <td>{currentPlayer.username}</td>
        <td>{currentPlayer.score}</td>
      </tr>

      {/* )} */}
      {/* {!viewModel.isLocalStorageEmpty() && ( */}
      <button
        className={"delete-score-btn " + scoreView.classDeleteBtn}
        onClick={async () => {
          if (
            window.confirm("Are you sure you want to delete your username?")
          ) {
            viewModel.deleteUsername().then((msg) => {
              console.log(msg.message);
              viewModel.refreshScoreBoard();
              viewModel.startGame();
            });
            console.log("Username deleted.");
          } else {
            console.log("Username not deleted.");
          }
        }}
      >
        Delete
      </button>
      {/* )} */}
    </table>
  );
};

export default ScoreBoard;
