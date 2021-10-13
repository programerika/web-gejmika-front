import React from "react";
import { useState } from "react";

const ScoreBoard = ({ people, currentPlayer, viewModel }) => {
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
      {viewModel.is11PlayerOnTheBoard() && (
        <>
          <tr className="current-player-separator">
            <td></td>
            <td>...</td>
            <td></td>
          </tr>
          <tr className="person-score currentPlayer">
            <td>11.</td>
            <td>{currentPlayer.username}</td>
            <td>{currentPlayer.score}</td>
          </tr>
        </>
      )}
      {!viewModel.isLocalStorageEmpty() && (
        <button
          className="delete-score-btn"
          onClick={async () => {
            if (
              window.confirm("Are you sure you want to delete your username?")
            ) {
              viewModel.deleteUsername().then((msg) => {
                console.log(msg.message);
                viewModel.refreshScoreBoard();
              });
              console.log("Username deleted.");
            } else {
              console.log("Username not deleted.");
            }
          }}
        >
          Delete
        </button>
      )}
    </table>
  );
};

export default ScoreBoard;
