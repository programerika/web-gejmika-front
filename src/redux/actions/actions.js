import { UPDATE, UPDATE_BOARD } from "../types";

const update = (newStateModel, newStateView) => {
  return {
    type: UPDATE,
    payload: { newStateModel, newStateView },
  };
};

const updateScoreBoard = (newStateScoreBoard) => {
  return {
    type: UPDATE_BOARD,
    payload: { newStateScoreBoard },
  };
};

export default {
  update,
  updateScoreBoard,
};
