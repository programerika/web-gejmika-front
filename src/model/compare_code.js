const compare_code = (attempt, combination_org) => {
  var combination = [...combination_org];
  let outcome = [];
  for (let index = 0; index < attempt.length; index++) {
    if (attempt[index] == combination[index]) {
      outcome[index] = 2;
      combination[index] = "";
    } else {
      outcome[index] = -1;
    }
  }

  for (let index = 0; index < attempt.length; index++) {
    if (outcome[index] != -1) continue;
    if (combination.indexOf(attempt[index]) != -1) {
      outcome[index] = 1;
      let ind = combination.indexOf(attempt[index]);
      combination[ind] = "";
    } else outcome[index] = 0;
  }

  return outcome;
};

export default compare_code;
