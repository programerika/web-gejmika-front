import React from "react";

const ScoreBoard = ({ people }) => {
  console.log("From score board " + people);
  console.log("csds");
  return (
    <table className="score-board ">
      <tr className="score-board-header">
        <th>Position</th>
        <th>First name</th>
        {/* <th>Last name</th> */}
        <th>Points</th>
      </tr>
      {people.map((person, i) => {
        return (
          <tr key={i} className="person-score">
            <td>
              <b>{i + 1}</b>
            </td>
            {person.username == localStorage.getItem("username") ? (
              <td style={{ color: "red" }}>{person.username}</td>
            ) : (
              <td>{person.username}</td>
            )}
            {/* <td>{person.username}</td> */}
            {/* <td>{person.name.last}</td> */}
            <td>{person.score}</td>
          </tr>
        );
      })}
    </table>
  );
};

export default ScoreBoard;
