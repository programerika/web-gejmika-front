import { UPDATE, UPDATE_VIEW } from "../types";

const viewReducers = (
  state = {
    combInProgress: [],
    preparedAttempts: [],
    correctView: [],
    gameOver: false
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
