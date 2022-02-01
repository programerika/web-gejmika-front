import ReactTooltip from "react-tooltip";
import React from "react";
import styles from "../components/GameHelp.module.css";

export class GameHelpViewModel {
  #steps;
  constructor() {
    this.#steps = this.getSteps();
  }

  getSteps = () => {
    return [
      {
        selector: "initial-step",
        content: (
          <p className={styles.paragraph}>
            <span
              className={styles.span}
              onClick={() => {
                this.closeWalkthrough();
              }}
            >
              <b>x</b>
            </span>
            Insert combination by clicking on icons.
          </p>
        ),
        forRef: "inputPanelRef",
      },
      {
        selector: "step-when-in-middle-attempt",
        content: (
          <p className={styles.paragraph}>
            <span
              className={styles.span}
              onClick={() => {
                this.closeWalkthrough();
              }}
            >
              <b>x</b>
            </span>
            If you want to change last input press delete button.
          </p>
        ),
        forRef: "deleteButtonRef",
        condition: (ctx) => ctx.combInProgress.length === 3,
      },
      {
        selector: "indicate-confirm-button",
        content: (
          <p className={styles.paragraph}>
            <span
              className={styles.span}
              onClick={() => {
                this.closeWalkthrough();
              }}
            >
              <b>x</b>
            </span>
            After choosing your combination press confirm button.
          </p>
        ),
        forRef: "confirmButtonRef",
        condition: (ctx) => ctx.attemptFull,
      },
      {
        selector: "explain-outcome-indicator",
        content: (
          <p className={styles.paragraph}>
            <span
              className={styles.span}
              onClick={() => {
                this.closeWalkthrough();
              }}
            >
              <b>x</b>
            </span>
            <span style={{ color: "green" }}>Green</span> color indicates that
            you have guessed the icon and position. <br />
            <span style={{ color: "yellow" }}>Yellow</span> color indicates that
            you have guessed the icon but not position. <br />
            <span style={{ color: "gray" }}>Gray</span> color indicates that you
            have missed your guess.
          </p>
        ),
        forRef: "outcomeIndicatorRef",
        condition: (ctx) => ctx.attemptConfirmed,
        lastStep: true,
      },
    ];
  };

  onOpenModal = () => {
    this.setState({ ...this.state, open: true });
  };

  onCloseModal = () => {
    this.setState({ ...this.state, open: false });
  };

  setStateCallback = (state, setState) => {
    this.state = state;
    this.setState = setState;
  };

  toggleWalkthrough = () => {
    if (this.state.isWalkThroughActive === false) {
      this.startWalkthrough();
    } else {
      this.closeWalkthrough();
    }
  };

  startWalkthrough = () => {
    this.setState({
      ...this.state,
      isWalkThroughActive: true,
      open: false,
      currentStep: null,
      walkthroughBtn: "Close walkthrough",
    });
  };

  closeWalkthrough = () => {
    this.setState({
      ...this.state,
      isWalkThroughActive: false,
      open: false,
      currentStep: null,
      walkthroughBtn: "Start walkthrough",
    });
  };

  showWalkthrough = (combInProgress, refs, attemptConfirmed, attemptFull) => {
    if (!this.state.isWalkThroughActive) {
      return;
    }
    ReactTooltip.hide();
    if (this.#getStep(this.state.currentStep)?.lastStep) {
      this.closeWalkthrough();
    }
    const ctx = {
      attemptConfirmed,
      attemptFull,
      combInProgress,
    };
    let nextStep = this.#steps.find(
      (step) => step.condition && step.condition(ctx)
    );
    if (!nextStep && this.state.currentStep === null) {
      nextStep = this.#steps[0];
    }
    if (nextStep) {
      ReactTooltip.show(refs[nextStep.forRef]?.current);
      this.setState({ ...this.state, currentStep: nextStep.selector });
    }
  };

  #getStep = (selector) => {
    return this.#steps.find((step) => step.selector === selector);
  };

  getCurrentStepContent = () => {
    return this.#getStep(this.state.currentStep)?.content;
  };
}
