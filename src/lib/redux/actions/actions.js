import { UPDATE, UPDATE_BOARD, UPDATE_VIEW } from "../types";

const update = (newModelState) => {
  return {
    type: UPDATE,
    payload: { newModelState },
  };
};

const updateScoreBoard = (newScoreBoardState) => {
  return {
    type: UPDATE_BOARD,
    payload: { newScoreBoardState },
  };
};

const updateViewModel = (newViewState) => {
  return {
    type: UPDATE_VIEW,
    payload: { newViewState },
  };
};

const actions = {
  update,
  updateScoreBoard,
  updateViewModel,
};

export default actions;
