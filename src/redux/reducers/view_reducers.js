const view_reducers = (
  state = {
    comb_in_progress: [
      "./icons/circle.png",
      "./icons/circle.png",
      "./icons/circle.png",
      "./icons/circle.png",
    ],
    attempts_view: [],
    correct_view: [],
    id: -1,
  },
  action
) => {
  switch (action.type) {
    // case "INPUT_CLICK":
    //   return model.inputClick(state, action);
    // case "INPUT_CANCEL":
    //   return model.inputCancel(state);
    // case "INPUT_CONFIRM":
    //   return model.inputConfirm(state);
    // case "START_GAME":
    //   return model.startNewGame(state);
    case "UPDATE": {
      const { newState_view } = action.payload;
      if (!newState_view) {
        return { ...state };
      } else return newState_view;
    }
    // case "GET_SCORE": {
    //   return model.getScore(state);
    // }
    default: {
      return state;
    }
  }
};

export default view_reducers;
