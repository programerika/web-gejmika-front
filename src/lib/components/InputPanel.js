import React from "react";
import heart from '../icons/heart.png';
import star from '../icons/star.png';
import diamond from '../icons/diamond.png';
import spades from '../icons/symbol-of-spades.png';
import trafficLight from '../icons/traffic-light.png';
import clubs from '../icons/clubs.png';
import checked from '../icons/checked.png';
import close from '../icons/close.png';

const InputPanel = ({ viewModel }) => {
  return (
    <div className="input-panel">
      <div className="input-icons-wrapper">
        <img
          className="input"
          src={clubs}
          onClick={() => viewModel.clubsButtonClicked()}
          alt="clubs"
        />
        <img
          className="input"
          src={diamond}
          onClick={() => viewModel.diamondButtonClicked()}
          alt="diamond"
        />
        <img
          className="input"
          src={heart}
          onClick={() => viewModel.heartButtonClicked()}
          alt="heart"
        />
        <img
          className="input"
          src={star}
          onClick={() => viewModel.starButtonClicked()}
          alt="star"
        />
        <img
          className="input"
          src={spades}
          onClick={() => viewModel.spadesButtonClicked()}
          alt="spades"
        />
        <img
          className="input"
          src={trafficLight}
          onClick={() => viewModel.trafficLightButtonClicked()}
          alt="traffic light"
        />
      </div>

      <div className="confirm-cancel-wrapper">
        <img
          className="input"
          src={checked}
          alt="confirm"
          onClick={() => {
            viewModel.codeGuessIfReady();
          }}
        />

        <img
          className="input"
          src={close}
          alt="delete"
          onClick={() => {
            viewModel.inputDeleteLast();
          }}
        />
      </div>
  </div>
  );
};

export default InputPanel;
