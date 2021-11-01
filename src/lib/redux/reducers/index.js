import { combineReducers } from "redux";
import modelReducers from "./modelReducers";
import viewReducers from "./viewReducers";
import scoreBoardReducers from "./scoreBoardReducers";

const rootReducer = combineReducers({
  model: modelReducers,
  view: viewReducers,
  score: scoreBoardReducers,
});

export default rootReducer;
