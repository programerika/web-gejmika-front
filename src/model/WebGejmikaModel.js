/**
 * @author Programerika
 */

export class WebGejmikaModel {
  constructor(modelState) {
    this.modelState = modelState;
  }

  /**
   *
   * @param {Array} attpInProgress
   * @returns {Object} Model state with added attempt and set attemptOutcome
   * This method compares attpInProgress with secretComb and generates attemptOutcome - array of numbers [0-2]
   * 0 - guess not in secret comb
   * 1 - guess exists in secret combination but is not in right place
   * 2 - guess is in right place
   */

  compareCode = (attpInProgress) => {
    var combination = [...this.modelState.secretComb];
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

    const newState = {
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
      newState.gameOver = true;
    }

    return newState;
  };

  /**
   *
   * @returns {Object} Model state with set secretComb
   * This method generates random secret combination of size 4 from letters K,H,P,T,L,S
   */

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
      gameOver: false,
    };
    return newState;
  };

  /**
   *
   * @param {Array} attempts
   * @returns {boolean}
   * This method checks if game end is reached based on number of attempts or attempt outcome
   */

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

  /**
   *
   * @param {Array} attempts
   * @returns {number} score - 8, 13, 21 or 0
   * This method calculates score based on correct code guess attempt number
   */

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
