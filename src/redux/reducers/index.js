import { combineReducers } from "redux";
import inputreducers from "./inputReducers";
import view_reducers from "./viewReducers";

const rootReducer = combineReducers({
  model: inputreducers,
  view: view_reducers,
});

export default rootReducer;
