import { combineReducers } from "redux";
import modelReducers from "./modelReducers";
import viewReducers from "./viewReducers";

const rootReducer = combineReducers({
  model: modelReducers,
  view: viewReducers,
});

export default rootReducer;
