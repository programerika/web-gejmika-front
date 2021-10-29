import { UPDATE_BOARD } from "../types";

const scoreBoardReducers = (
  state = {
    topPlayers: {
      topPlayers: [],
      currentPlayer: {},
    },
    boardView: {
      classPlayer11: "",
      classDeleteBtn: "",
    },
    showScoreView: {
      toolTipStatus: "",
      isUsernameValid: "",
      isSaveButtonDisabled: false,
      message: "",
      messageStatus: "",
      messageColor: "",
      hide: "",
      scoreMsg: "",
    },
    conffetiView: {
      width: 0,
      height: 0,
      tweenDuration: 0,
      recycle: false,
      numberOfPieces: 0,
      wind: 0,
      gravity: 0,
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      initialVelocityX: 0,
      initialVelocityY: 0,
    },
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
