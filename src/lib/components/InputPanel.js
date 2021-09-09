import React from "react";

const InputPanel = (props) => {
  const viewModel = props.viewModel;

  return (
    <div className="input-panel">
      <div className="input-icons-wrapper">
        <img
          className="input"
          src="/icons/clubs.png"
          onClick={() => viewModel.inputClick("T")}
          alt="tref"
        />
        <img
          className="input"
          src="/icons/diamond.png"
          onClick={() => viewModel.inputClick("K")}
          alt="karo"
        />
        <img
          className="input"
          src="/icons/heart.png"
          onClick={() => viewModel.inputClick("H")}
          alt="herc"
        />
        <img
          className="input"
          src="/icons/star.png"
          onClick={() => viewModel.inputClick("L")}
          alt="zvezda"
        />
        <img
          className="input"
          src="/icons/symbol-of-spades.png"
          onClick={() => viewModel.inputClick("P")}
          alt="pik"
        />
        <img
          className="input"
          src="/icons/traffic-light.png"
          onClick={() => viewModel.inputClick("S")}
          alt="semafor"
        />
      </div>

      <div className="confirm-cancel-wrapper">
        <img
          className="input"
          src="/icons/checked.png"
          onClick={() => {
            viewModel.inputConfirm();
          }}
        />

        <img
          className="input"
          src="/icons/close.png"
          onClick={() => {
            viewModel.inputCancel();
          }}
        />
      </div>
    </div>
  );
};

export default InputPanel;
