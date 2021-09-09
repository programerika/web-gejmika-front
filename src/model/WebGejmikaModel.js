export class WebGejmikaModel {
  constructor(modelState) {
    this.modelState = modelState;
  }

  compareCode = (attempt, combinationOrg) => {
    var combination = [...combinationOrg];
    let outcome = [];
    for (let index = 0; index < attempt.length; index++) {
      if (attempt[index] === combination[index]) {
        outcome[index] = 2;
        combination[index] = "";
      } else {
        outcome[index] = -1;
      }
    }

    for (let index = 0; index < attempt.length; index++) {
      if (outcome[index] !== -1) continue;
      if (combination.indexOf(attempt[index]) !== -1) {
        outcome[index] = 1;
        let ind = combination.indexOf(attempt[index]);
        combination[ind] = "";
      } else outcome[index] = 0;
    }

    return outcome;
  };

  secretCode = () => {
    let combArr = ["K", "H", "P", "T", "L", "S"];
    let combination = [];
    for (let index = 0; index <= 3; index++) {
      let rand = Math.floor(Math.random() * combArr.length);
      combination[index] = combArr[rand];
    }
    return combination;
  };

  isTargetReached = (attempts) => {
    if (attempts.length === 0) return false;
    var lastAttp = attempts[attempts.length - 1];
    var check = true;
    lastAttp.attemptOutcome.forEach((el) => {
      if (el != "2") {
        check = false;
      }
    });
    if (attempts.length === 5) {
      return true;
    } else if (check) {
      return true;
    } else return false;
  };

  score = (attempts) => {
    var lastAttp = attempts[attempts.length - 1];
    var check = true;
    lastAttp.attemptOutcome.forEach((el) => {
      if (el != "2") {
        check = false;
      }
    });
    if (!check && attempts.length === 5) return 0;
    else {
      switch (lastAttp.attemptId) {
        case 0:
          return 21;
        case 1:
          return 21;
        case 2:
          return 21;
        case 3:
          return 13;
        case 4:
          return 8;
        default:
          return 0;
      }
    }
  };
}