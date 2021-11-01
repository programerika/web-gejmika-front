import { UPDATE, UPDATE_VIEW } from "../types";

const viewReducers = (
  state = {
    combInProgress: [],
    attemptsView: [],
    preparedAttempts: [],
    correctView: [],
    attemptIncomplete: "",
    gameDifficulty: {
      attemptsLength: 5,
      combinationLength: 4,
    },
    id: -1,
  },
  action
) => {
  switch (action.type) {
    case UPDATE: {
      const { newStateView } = action.payload;
      if (!newStateView) {
        return { ...state };
      } else return newStateView;
    }
    case UPDATE_VIEW: {
      const { newStateView } = action.payload;
      if (!newStateView) return { ...state };
      else return newStateView;
    }
    default: {
      return state;
    }
  }
};

export default viewReducers;
