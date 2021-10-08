import React from "react";
import { useState } from "react";

const ScoreBoard = ({ people, currentPlayer, viewModel }) => {
  const [msg, setMsg] = useState("");
  // console.log("FROM SCORE BOARD: " + JSON.stringify(currentPlayer));
  // console.log("ISUSER: " + userInTopTen);
  //  const userInTopTen = viewModel.isUserInTopTen();
  // console.log("USER IN TOP TEN: " + userInTopTen);
  // console.log("CURRENT: " + JSON.stringify(currentPlayer.username));
  // people.map((person, i) => {
  //   if (person.username == currentPlayer.username) {
  //     setUserInTopTen(true);
  //   }
  // });

  return (
    <table className="score-board ">
      <tr className="score-board-header">
        <th>Rank</th>
        <th>Username</th>
        {/* <th>Last name</th> */}
        <th>Points</th>
      </tr>
      {people.map((person, i) => {
        let { rowColor } = viewModel.highlightCurrentUser(person.username);
        return (
          <tr key={i} className={`person-score ` + rowColor}>
            <td>
              <b>{i + 1}.</b>
            </td>
            {/* {userInTopTen && isEqual ? (
              <td>{person.username}</td>
            ) : (
              <td>{person.username}</td>
            )} */}
            <td>{person.username}</td>
            {/* {person.username == localStorage.getItem("username") ? (
              <td style={{ color: "red" }}>{person.username}</td>
            ) : (
              <td>{person.username}</td>
            )} */}
            {/* <td>{person.username}</td> */}
            {/* <td>{person.name.last}</td> */}
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
      <button
        className="delete-score-btn"
        onClick={async () => {
          setMsg(
            viewModel.deleteUsername().then(viewModel.refreshScoreBoard())
          );
        }}
      >
        Delete
      </button>
    </table>
  );
};

ScoreBoard.defaultProps = {
  people: [
    {
      username: "naca55",
      score: 21,
    },
  ],
};

export default ScoreBoard;
