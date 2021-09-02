import { combineReducers } from "redux";
import input_reducers from "./input_reducers";
import view_reducers from "./view_reducers";

const rootReducer = combineReducers({
  model: input_reducers,
  view: view_reducers,
});

export default rootReducer;
