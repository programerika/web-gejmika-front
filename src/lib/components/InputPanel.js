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
import {useSelector} from 'react-redux'
import ReactTooltip from "react-tooltip";

const InputPanel = ({ viewModel }) => {
  const inputPanelRef = useSelector((state)=>state.view.inputPanelRef);
  const deleteButtonRef = useSelector((state)=>state.view.deleteButtonRef);
  const confirmButtonRef = useSelector((state)=>state.view.confirmButtonRef);
  return (
    <div className={styles.inputPanel}>
      <div data-tip ref={inputPanelRef} data-for='input' className={styles.inputIconsWrapper}>
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

      <div className={styles.confirmCancelWrapper} >
        <img
          ref={confirmButtonRef}
          data-tip data-for='confirm'
          className={globalStyles.inputBtn}
          src={checked}
          alt="confirm"
          onClick={() => {
            viewModel.codeGuessIfReady();
          }}
        />

        <img
          ref={deleteButtonRef}
          data-tip data-for='delete'
          className={globalStyles.inputBtn}
          src={close}
          alt="delete"
          onClick={() => {
            viewModel.inputDeleteLast();
          }}
        />
      </div>
      <ReactTooltip id='input' place="top" effect="solid" border={true}>
        <p> Insert combination by clicking on icons.</p>
      </ReactTooltip>
      <ReactTooltip id='delete' place="top" effect="solid" border={true}>
        <p> If you want to change last input press delete button.</p>
      </ReactTooltip>
      <ReactTooltip id='confirm' place="top" effect="solid" border={true}>
        <p> After choosing your combination press confirm button.</p>
      </ReactTooltip>
  </div>
  );
};

export default InputPanel;
