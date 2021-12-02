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
      },
      {
        selector: "step-2",
        content: <p> If you want to change last input press delete button.</p>,
      },
      {
        selector: "step-3",
        content: <p> After choosing your combination press confirm button.</p>,
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

    if (this.state.currentStep === "step-4") {
      this.setState({
        ...this.state,
        isWalkThroughActive: false,
        currentStep: null,
      });
    }
    const combLenght = combInProgress.length;

    if (attemptConfirmed) {
      ReactTooltip.show(refs.outcomeIndicatorRef?.current);
      this.setState({ ...this.state, currentStep: "step-4" });
      return;
    }
    if (attemptFull) {
      ReactTooltip.show(refs.confirmButtonRef?.current);
      this.setState({ ...this.state, currentStep: "step-3" });
      return;
    }

    switch (combLenght) {
      case 0:
        ReactTooltip.show(refs.inputPanelRef?.current);
        this.setState({ ...this.state, currentStep: "step-1" });
        break;
      case 1:
      case 2:
        if (this.state.currentStep === null) {
          ReactTooltip.show(refs.inputPanelRef?.current);
          this.setState({ ...this.state, currentStep: "step-1" });
        }
        break;
      case 3:
        ReactTooltip.show(refs.deleteButtonRef?.current);
        this.setState({ ...this.state, currentStep: "step-2" });
        break;
      default:
        break;
    }
  };

  getCurrentStepContent = () => {
    return this.#steps.find((step) => step.selector === this.state.currentStep)
      ?.content;
  };
}
