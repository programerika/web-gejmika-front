// const compare_code = (attempt, combination) => {
//   let outcome = [];
//   console.log("This is attempt: " + attempt);
//   console.log("This is combination: " + combination);
//   for (let index = 0; index < attempt.length; index++) {
//     if (attempt[index] == combination[index]) {
//       outcome[index] = "I";
//       combination[index] = "";
//     } else if (combination.indexOf(attempt[index]) != -1) {
//       outcome[index] = "G";
//       let ind = combination.indexOf(attempt[index]);
//       combination[ind] = "";
//     } else outcome[index] = "N";
//   }
//   console.log("This is outcome: " + outcome);
//   return outcome;
// };

const compare_code = (attempt, combination_org) => {
  var combination = [...combination_org];
  let outcome = [];
  console.log("This is attempt: " + attempt);
  console.log("This is combination: " + combination);
  for (let index = 0; index < attempt.length; index++) {
    if (attempt[index] == combination[index]) {
      outcome[index] = 2;
      combination[index] = "";
    } else {
      outcome[index] = -1;
    }
  }
  console.log(
    "This is outcome after first for loop: " + JSON.stringify(outcome)
  );

  for (let index = 0; index < attempt.length; index++) {
    if (outcome[index] != -1) continue;
    if (combination.indexOf(attempt[index]) != -1) {
      outcome[index] = 1;
      let ind = combination.indexOf(attempt[index]);
      combination[ind] = "";
    } else outcome[index] = 0;
  }
  console.log(
    "This is outcome after second for loop: " + JSON.stringify(outcome)
  );
  return outcome;
};

export default compare_code;
