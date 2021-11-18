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
      return newScoreBoardState;
    default:
      return state;
  }
};

export default scoreBoardReducers;
