import { UPDATE, UPDATE_VIEW } from "../types";

const viewReducers = (
  state = {
    combInProgress: [],
    preparedAttempts: [],
    correctView: [],
    gameOver: false,
  },
  action
) => {
  switch (action.type) {
    case UPDATE:
    case UPDATE_VIEW:
      const { newViewState } = action.payload;
      if (newViewState) {
        return newViewState;
      }
    default: {
      return state;
    }
  }
};

export default viewReducers;
