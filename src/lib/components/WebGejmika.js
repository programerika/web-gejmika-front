import React from "react";
import store from "../redux/configureStore";
import { Provider } from "react-redux";
import Game from "./Game";
import "../index.css";

const WebGejmika = () => {
  
  return (
    <Provider store={store}>
      <Game/>
    </Provider>
  );
};
export default WebGejmika;
