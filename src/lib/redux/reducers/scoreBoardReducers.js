import { UPDATE_BOARD } from "../types";

const scoreBoardReducers = (
  state = {
    topPlayers: {
      topPlayers: [],
      currentPlayer: {},
    },
    boardView: {},
    error: {
      status: false,
      message: "",
    },
    isLoading: false,
  },
  action
) => {
  switch (action.type) {
    case UPDATE_BOARD:
      const { newStateScoreBoard } = action.payload;
      return {
        ...newStateScoreBoard,
      };
    default:
      return state;
  }
};

export default scoreBoardReducers;
