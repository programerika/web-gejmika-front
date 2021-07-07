import { combineReducers } from "redux";
import input_reducers from "./input_reducers";

const rootReducer = combineReducers({ input_reducers });

export default rootReducer;
