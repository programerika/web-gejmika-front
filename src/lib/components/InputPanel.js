import React from "react";

const InputPanel = (props) => {
  const viewModel = props.viewModel;

  return (
    <div className="input-panel">
      <div className="input-icons-wrapper">
        <img
          className="input"
          src="/icons/clubs.png"
          onClick={() => viewModel.input_click("T")}
          alt="tref"
        />
        <img
          className="input"
          src="/icons/diamond.png"
          onClick={() => viewModel.input_click("K")}
          alt="karo"
        />
        <img
          className="input"
          src="/icons/heart.png"
          onClick={() => viewModel.input_click("H")}
          alt="herc"
        />
        <img
          className="input"
          src="/icons/star.png"
          onClick={() => viewModel.input_click("L")}
          alt="zvezda"
        />
        <img
          className="input"
          src="/icons/symbol-of-spades.png"
          onClick={() => viewModel.input_click("P")}
          alt="pik"
        />
        <img
          className="input"
          src="/icons/traffic-light.png"
          onClick={() => viewModel.input_click("S")}
          alt="semafor"
        />
      </div>

      <div className="confirm-cancel-wrapper">
        <img
          className="input"
          src="/icons/checked.png"
          onClick={() => {
            viewModel.input_confirm();
          }}
        />

        <img
          className="input"
          src="/icons/close.png"
          onClick={() => {
            viewModel.input_cancel();
          }}
        />
      </div>
    </div>
  );
};

export default InputPanel;
