import React from "react";
import { useDispatch, useSelector } from "react-redux";
import all_actions from "./redux/actions";
import { ViewModel } from "./view_model/ViewModel";

const InputPanel = (props) => {
  const dispatch = useDispatch();
  const redux_state = useSelector((state) => state.input_reducers);
  const viewModel = new ViewModel(redux_state, dispatch);

  return (
    <div className="input-panel">
      <div className="input-icons-wrapper">
        <img
          className="input"
          src="/icons/clubs.png"
          // onClick={() => dispatch(all_actions.input_actions.input_click("T"))}
          onClick={() => viewModel.input_click("T")}
          alt="tref"
        />
        <img
          className="input"
          src="/icons/diamond.png"
          // onClick={() => dispatch(all_actions.input_actions.input_click("K"))}
          onClick={() => viewModel.input_click("K")}
          alt="karo"
        />
        <img
          className="input"
          src="/icons/heart.png"
          // onClick={() => dispatch(all_actions.input_actions.input_click("H"))}
          onClick={() => viewModel.input_click("H")}
          alt="herc"
        />
        <img
          className="input"
          src="/icons/star.png"
          // onClick={() => dispatch(all_actions.input_actions.input_click("L"))}
          onClick={() => viewModel.input_click("L")}
          alt="zvezda"
        />
        <img
          className="input"
          src="/icons/symbol-of-spades.png"
          // onClick={() => dispatch(all_actions.input_actions.input_click("P"))}
          onClick={() => viewModel.input_click("P")}
          alt="pik"
        />
        <img
          className="input"
          src="/icons/traffic-light.png"
          // onClick={() => dispatch(all_actions.input_actions.input_click("S"))}
          onClick={() => viewModel.input_click("S")}
          alt="semafor"
        />
      </div>

      <div className="confirm-cancel-wrapper">
        <img
          className="input"
          src="/icons/checked.png"
          onClick={() => {
            // dispatch(all_actions.input_actions.input_confirm());
            viewModel.input_confirm();
            // dispatch(all_actions.input_actions.get_score());
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
    </div>
  );
};

export default InputPanel;
