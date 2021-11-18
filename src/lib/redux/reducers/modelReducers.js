import { UPDATE } from "../types";

const modelReducers = (
  state = {
    attempts: [],
    secretComb: [],
    score: -1,
    gameOver: false,
  },
  action
) => {
  switch (action.type) {
    case UPDATE:
      const { newModelState } = action.payload;
      if (newModelState) {
        return {
          ...state,
          ...newModelState,
        };
      }
      return state;
    default:
      return state;
  }
};

export default modelReducers;
