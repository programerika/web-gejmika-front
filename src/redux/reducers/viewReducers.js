import { UPDATE } from "../types";

const viewReducers = (
  state = {
    combInProgress: [],
    attemptsView: [],
    correctView: [],
    id: -1,
    topPlayers: {
      topPlayers: [],
      currentPlayer: {},
    },
    gameOver: false,
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
    default: {
      return state;
    }
  }
};

export default viewReducers;
