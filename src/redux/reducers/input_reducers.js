import { InitialStateModel } from "../../model/InitialStateModel";
import { Model } from "../../model/Model";

let model = new Model();

const input_reducers = (state = new InitialStateModel(), action) => {
  switch (action.type) {
    // case "INPUT_CLICK":
    //   return model.inputClick(state, action);
    // case "INPUT_CANCEL":
    //   return model.inputCancel(state);
    // case "INPUT_CONFIRM":
    //   return model.inputConfirm(state);
    // case "START_GAME":
    //   return model.startNewGame(state);
    case "UPDATE":
      return action.payload;
    // case "GET_SCORE": {
    //   return model.getScore(state);
    // }
    default:
      return state;
  }
};

export default input_reducers;
