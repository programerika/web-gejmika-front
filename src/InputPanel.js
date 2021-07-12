import React from "react";
import { useSelector, useDispatch } from "react-redux";
import all_actions from "./redux/actions";

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
        onClick={() => dispatch(all_actions.input_actions.input_click("T"))}
      />
      <img
        className="input"
        src="/icons/diamond.png"
        onClick={() => dispatch(all_actions.input_actions.input_click("K"))}
      />
      <img
        className="input"
        src="/icons/heart.png"
        onClick={() => dispatch(all_actions.input_actions.input_click("H"))}
      />
      <img
        className="input"
        src="/icons/star.png"
        onClick={() => dispatch(all_actions.input_actions.input_click("L"))}
      />
      <img
        className="input"
        src="/icons/symbol-of-spades.png"
        onClick={() => dispatch(all_actions.input_actions.input_click("P"))}
      />
      <img
        className="input"
        src="/icons/traffic-light.png"
        onClick={() => dispatch(all_actions.input_actions.input_click("S"))}
      />

      <hr />

      <img
        className="input"
        src="/icons/checked.png"
        onClick={() => {
          dispatch(all_actions.input_actions.input_confirm());
          dispatch(all_actions.input_actions.get_score());
        }}
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
