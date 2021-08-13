import { ModelFunctions } from "./ModelFunctions";

let modelFunctions = new ModelFunctions()
export class Model{
    
    inputClick = (state,action) => {
        if (state.attp_in_progress.length >= 4) {
            return state;
          } else {
            return {
              ...state,
              attp_in_progress: [...state.attp_in_progress, action.payload],
            };
          }
    }

    inputCancel = (state) => {
        return {
            ...state,
            attp_in_progress: [],
          };
    }


    inputConfirm = (state) => {
        if (state.attp_in_progress.length !== 4) {
            return state;
          } else {
            return {
              ...state,
              attp_in_progress: [],
              attempts: [
                ...state.attempts,
                {
                  attempt_id: state.attp_id + 1,
                  attempt_code: state.attp_in_progress,
                  attempt_outcome:modelFunctions.compare_code(
                    state.attp_in_progress,
                    state.secret_comb
                  ),
                },
              ],
              attp_id: state.attp_id + 1,
            };
          }
    }


    startNewGame = (state) => {
        return {
            ...state,
            attp_in_progress: [],
            attempts: [],
            attp_id: -1,
            score: -1,
            secret_comb:modelFunctions.secret_code(),
          };
    }

    getScore = (state) => {
        if (!modelFunctions.is_target_reached(state.attempts)) {
            return state;
          } else {
            return {
              ...state,
              score: modelFunctions.score(state.attempts),
            };
          }
    }
}