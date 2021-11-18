import { UPDATE_BOARD } from "../types";

const scoreBoardReducers = (
  state = {
    topPlayers: {
      topPlayers: [],
      currentPlayer: {},
    },
    boardView: {},
    isBoardLoading: true,
    errorMsg: null,
  },
  action
) => {
  switch (action.type) {
    case UPDATE_BOARD:
      const { newScoreBoardState } = action.payload;
      if (newScoreBoardState) {
        return {
          ...state,
          ...newScoreBoardState,
        };
      }
      return state;
    default:
      return state;
  }
};

export default scoreBoardReducers;
