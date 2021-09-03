import React from "react";

const ScoreBoard = ({ people }) => {
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
            <td>{person.username}</td>
            {/* <td>{person.name.last}</td> */}
            <td>{person.score}</td>
          </tr>
        );
      })}
    </table>
  );
};

export default ScoreBoard;
