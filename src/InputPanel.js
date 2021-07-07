import React from "react";
import PropTypes from "prop-types";
import add_to_attempt from "./view_model/add_to_attempt";
import cancel_attp from "./view_model/cancel_attp";
import confirm_attp from "./view_model/confirm_attp";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import all_actions from "./redux/actions";
import { Store } from "redux";
import attempts from "./model/attempts";

const InputPanel = (props) => {
  const attp_in_prog = useSelector(
    (state) => state.input_reducers.attp_in_progress
  );
  const attps = useSelector((state) => state.input_reducers.attempts);
  const dispatch = useDispatch();

  return (
    <div className="input-panel">
      <img
        className="input"
        src="/icons/clubs.png"
        // onClick={() => add_to_attempt("T")}
        onClick={() => dispatch(all_actions.input_actions.input_click("T"))}
      />
      <img
        className="input"
        src="/icons/diamond.png"
        // onClick={() => add_to_attempt("K")}
        onClick={() => dispatch(all_actions.input_actions.input_click("K"))}
      />
      <img
        className="input"
        src="/icons/heart.png"
        // onClick={() => add_to_attempt("H")}
        onClick={() => dispatch(all_actions.input_actions.input_click("H"))}
      />
      <img
        className="input"
        src="/icons/star.png"
        // onClick={() => add_to_attempt("L")}
        onClick={() => dispatch(all_actions.input_actions.input_click("L"))}
      />
      <img
        className="input"
        src="/icons/symbol-of-spades.png"
        // onClick={() => add_to_attempt("P")}
        onClick={() => dispatch(all_actions.input_actions.input_click("P"))}
      />
      <img
        className="input"
        src="/icons/traffic-light.png"
        // onClick={() => add_to_attempt("S")}
        onClick={() => dispatch(all_actions.input_actions.input_click("S"))}
      />

      <hr />

      <img
        className="input"
        src="/icons/checked.png"
        onClick={() => dispatch(all_actions.input_actions.input_confirm())}
      />

      <img
        className="input"
        src="/icons/close.png"
        onClick={() => {
          dispatch(all_actions.input_actions.input_cancel());
        }}
      />
    </div>
  );
};

InputPanel.propTypes = {};

export default InputPanel;
