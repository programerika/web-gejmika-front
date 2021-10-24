import { UPDATE, UPDATE_BOARD, UPDATE_VIEW } from "../types";

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

const updateViewModel = (newViewModelState) => {
  return {
    type: UPDATE_VIEW,
    payload: { newViewModelState },
  };
};

const actions = {
  update,
  updateScoreBoard,
  updateViewModel,
};

export default actions;
