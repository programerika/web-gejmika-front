import React from "react";
import heart from '../icons/heart.png';
import star from '../icons/star.png';
import diamond from '../icons/diamond.png';
import spades from '../icons/symbol-of-spades.png';
import trafficLight from '../icons/traffic-light.png';
import clubs from '../icons/clubs.png';
import checked from '../icons/checked.png';
import close from '../icons/close.png';
import styles from "./InputPanel.module.css";
import globalStyles from "../global.module.css";

const InputPanel = ({ viewModel }) => {
  return (
    <div className={styles.inputPanel}>
      <div className={styles.inputIconsWrapper}>
        <img
          className={globalStyles.inputBtn}
          src={clubs}
          onClick={() => viewModel.clubsButtonClicked()}
          alt="clubs"
        />
        <img
          className={globalStyles.inputBtn}
          src={diamond}
          onClick={() => viewModel.diamondButtonClicked()}
          alt="diamond"
        />
        <img
          className={globalStyles.inputBtn}
          src={heart}
          onClick={() => viewModel.heartButtonClicked()}
          alt="heart"
        />
        <img
          className={globalStyles.inputBtn}
          src={star}
          onClick={() => viewModel.starButtonClicked()}
          alt="star"
        />
        <img
          className={globalStyles.inputBtn}
          src={spades}
          onClick={() => viewModel.spadesButtonClicked()}
          alt="spades"
        />
        <img
          className={globalStyles.inputBtn}
          src={trafficLight}
          onClick={() => viewModel.trafficLightButtonClicked()}
          alt="traffic light"
        />
      </div>

      <div className={styles.confirmCancelWrapper}>
        <img
          className={globalStyles.inputBtn}
          src={checked}
          alt="confirm"
          onClick={() => {
            viewModel.codeGuessIfReady();
          }}
        />

        <img
          className={globalStyles.inputBtn}
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
