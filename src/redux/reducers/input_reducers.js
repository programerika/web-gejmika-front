import compare_code from "../../model/compare_code";
import secret_code from "../../model/secret_code";
import is_target_reached from "../../model/is_target_reached";
import score from "../../model/score";

const initial_state = {
  attp_in_progress: [],
  attempts: [],
  attp_id: -1,
  secret_comb: [],
  score: -1,
};

const input_reducers = (state = initial_state, action) => {
  switch (action.type) {
    case "INPUT_CLICK":
      if (state.attp_in_progress.length >= 4) {
        return state;
      } else {
        return {
          ...state,
          attp_in_progress: [...state.attp_in_progress, action.payload],
        };
      }
    case "INPUT_CANCEL":
      return {
        ...state,
        attp_in_progress: [],
      };
    case "INPUT_CONFIRM":
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
              attempt_outcome: compare_code(
                state.attp_in_progress,
                state.secret_comb
              ),
            },
          ],
          attp_id: state.attp_id + 1,
        };
      }
    case "START_GAME": {
      return {
        ...state,
        attp_in_progress: [],
        attempts: [],
        attp_id: -1,
        score: -1,
        secret_comb: secret_code(),
      };
    }
    case "GET_SCORE": {
      if (!is_target_reached(state.attempts)) {
        return state;
      } else {
        return {
          ...state,
          score: score(state.attempts),
        };
      }
    }
    default:
      return state;
  }
};

export default input_reducers;
