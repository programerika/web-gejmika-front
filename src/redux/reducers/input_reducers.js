import add_to_attempt from "../../view_model/add_to_attempt";
import cancel_attp from "../../view_model/cancel_attp";
import next_attempt_id from "../../model/next_attempt_id";
import combination from "../../model/combination";
import compare_code from "../../model/compare_code";

const initial_state = {
  attp_in_progress: [],
  attempts: [],
  attp_id: -1,
  secret_comb: combination,
};

const input_reducers = (state = initial_state, action) => {
  switch (action.type) {
    case "INPUT_CLICK":
      return {
        ...state,
        attp_in_progress: [...state.attp_in_progress, action.payload],
      };
    case "INPUT_CANCEL":
      return {
        ...state,
        attp_in_progress: [],
      };
    case "INPUT_CONFIRM":
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
    default:
      return state;
  }
};

export default input_reducers;
