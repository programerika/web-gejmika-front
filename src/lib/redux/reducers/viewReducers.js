import { UPDATE_VIEW } from "../types";

const viewReducers = (
  state = {
    combInProgress: [],
    preparedAttempts: [],
    correctView: [],
    gameOver: false,
    refs: {},
  },
  action
) => {
  switch (action.type) {
    case UPDATE_VIEW:
      const { newViewState } = action.payload;
      if (newViewState) {
        return {
          ...state,
          ...newViewState,
        };
      }
      return state;
    default: {
      return state;
    }
  }
};

export default viewReducers;
