export class ModelFunctions {
  constructor(modelState) {
    this.modelState = modelState;
  }

  compare_code = () => {
    var combination = [...this.modelState.secret_comb];
    var attempt = [...this.modelState.attp_in_progress];
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
      attp_in_progress: [],
      attempts: [
        ...this.modelState.attempts,
        {
          attempt_id: this.modelState.attp_id + 1,
          attempt_code: this.modelState.attp_in_progress,
          attempt_outcome: outcome,
        },
      ],
      attp_id: this.modelState.attp_id + 1,
    };

    if (this.is_target_reached(newState.attempts)) {
      newState.score = this.score(newState.attempts);
    }

    return newState;
  };

  secret_code = () => {
    let comb_arr = ["K", "H", "P", "T", "L", "S"];
    let combination = [];
    for (let index = 0; index <= 3; index++) {
      let rand = Math.floor(Math.random() * comb_arr.length);
      combination[index] = comb_arr[rand];
    }
    const newState = {
      ...this.modelState,
      attp_in_progress: [],
      attempts: [],
      attp_id: -1,
      score: -1,
      secret_comb: combination,
    };
    return newState;
  };

  is_target_reached = (attempts) => {
    if (attempts.length === 0) return false;
    var last_attp = attempts[attempts.length - 1];
    var check = true;
    last_attp.attempt_outcome.forEach((el) => {
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
    var last_attp = attempts[attempts.length - 1];
    var check = true;
    last_attp.attempt_outcome.forEach((el) => {
      if (el != "2") {
        check = false;
      }
    });
    if (!check && attempts.length === 5) return 0;
    else {
      switch (last_attp.attempt_id) {
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
