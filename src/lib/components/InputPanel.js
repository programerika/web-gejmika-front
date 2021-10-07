import React from "react";

const InputPanel = (props) => {
  const viewModel = props.viewModel;

  return (
    <div className="input-panel">
      <div className="input-icons-wrapper">
        <img
          className="input"
          src="/icons/clubs.png"
          onClick={() => viewModel.clubsButtonClicked()}
          alt="tref"
        />
        <img
          className="input"
          src="/icons/diamond.png"
          onClick={() => viewModel.diamondButtonClicked()}
          alt="karo"
        />
        <img
          className="input"
          src="/icons/heart.png"
          onClick={() => viewModel.heartButtonClicked()}
          alt="herc"
        />
        <img
          className="input"
          src="/icons/star.png"
          onClick={() => viewModel.starButtonClicked()}
          alt="zvezda"
        />
        <img
          className="input"
          src="/icons/symbol-of-spades.png"
          onClick={() => viewModel.spadesButtonClicked()}
          alt="pik"
        />
        <img
          className="input"
          src="/icons/traffic-light.png"
          onClick={() => viewModel.trafficLightButtonClicked()}
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
            viewModel.inputDeleteLast();
          }}
        />
      </div>
    </div>
  );
};

export default InputPanel;
