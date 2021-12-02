import ReactTooltip from "react-tooltip";

export class GameHelpViewModel {
  #steps;
  constructor() {
    this.#steps = this.getSteps();
  }

  getSteps = () => {
    return [
      {
        selector: "step-1",
        content: <p> Insert combination by clicking on icons.</p>,
        forRef: "inputPanelRef",
      },
      {
        selector: "step-2",
        content: <p> If you want to change last input press delete button.</p>,
        forRef: "deleteButtonRef",
      },
      {
        selector: "step-3",
        content: <p> After choosing your combination press confirm button.</p>,
        forRef: "confirmButtonRef",
      },
      {
        selector: "step-4",
        content: (
          <p>
            <span style={{ color: "green" }}>Green</span> color indicates that
            you have guessed the icon and position. <br />
            <span style={{ color: "yellow" }}>Yellow</span> color indicates that
            you have guessed the icon but not position. <br />
            <span style={{ color: "gray" }}>Gray</span> color indicates that you
            have missed your guess.
          </p>
        ),
        forRef: "outcomeIndicatorRef",
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

  startWalkthrough = () => {
    this.setState({
      ...this.state,
      isWalkThroughActive: true,
      open: false,
      currentStep: null,
    });
  };

  showWalkthrough = (combInProgress, refs, attemptConfirmed, attemptFull) => {
    if (!this.state.isWalkThroughActive) {
      return;
    }
    ReactTooltip.hide();

    if (this.#getStep(this.state.currentStep)?.lastStep) {
      this.setState({
        ...this.state,
        isWalkThroughActive: false,
        currentStep: null,
      });
    }
    let nextStep;

    if (attemptConfirmed) {
      nextStep = "step-4";
    } else if (attemptFull) {
      nextStep = "step-3";
    } else if (combInProgress.length === 3) {
      nextStep = "step-2";
    } else if (this.state.currentStep === null) {
      nextStep = "step-1";
    }

    if (nextStep) {
      ReactTooltip.show(refs[this.#getStep(nextStep).forRef]?.current);
      this.setState({ ...this.state, currentStep: nextStep });
    }
  };

  #getStep = (selector) => {
    return this.#steps.find((step) => step.selector === selector);
  };

  getCurrentStepContent = () => {
    return this.#getStep(this.state.currentStep)?.content;
  };
}
