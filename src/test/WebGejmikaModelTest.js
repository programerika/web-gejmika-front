export class WebGejmikaModelTest {
  constructor() {}

  // compares entered combination to secret combination and returns new model state with outcome

  compareCode = (attpInProgress, secretComb) => {
    var combination = [...secretComb];
    var attempt = [...attpInProgress];
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

    // removed because of tests
    
    /*const newState = {
        ...this.modelState,
        attpInProgress: [],
        attempts: [
          ...this.modelState.attempts,
          {
            attemptCode: [...attpInProgress],
            attemptOutcome: outcome,
          },
        ],
      };
  
      if (this.isTargetReached(newState.attempts)) {
        newState.score = this.score(newState.attempts);
      }
  
      return newState;*/
  };

  // generates random secret combination and returns new model state

  secretCode = () => {
    let combArr = ["K", "H", "P", "T", "L", "S"];
    let combination = [];
    for (let index = 0; index <= 3; index++) {
      let rand = Math.floor(Math.random() * combArr.length);
      combination[index] = combArr[rand];
    }
    const newState = {
      ...this.modelState,
      attpInProgress: [],
      attempts: [],
      score: -1,
      secretComb: combination,
    };
    return newState;
  };

  // checks if game end is reached

  isTargetReached = (attempts) => {
    if (attempts.length === 0) return false;
    var lastAttp = attempts[attempts.length - 1];
    var check = true;
    lastAttp.forEach((el) => {
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

  // calculates score

  score = (attempts) => {
    var lastAttp = attempts[attempts.length - 1];
    var check = true;
    lastAttp.forEach((el) => {
      if (el != "2") {
        check = false;
      }
    });

    // proveriti uslov u dev grani zbog testiranja
    if (!check || (!check && attempts.length === 5)) return 0;
    else {
      switch (attempts.length) {
        case 1:
          return 21;
        case 2:
          return 21;
        case 3:
          return 21;
        case 4:
          return 13;
        case 5:
          return 8;
        default:
          return 0;
      }
    }
  };
}
