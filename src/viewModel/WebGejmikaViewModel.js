import allActions from "../redux/actions";
import { WebGejmikaModel } from "../model/WebGejmikaModel";

export class WebGejmikaViewModel {
  constructor(modelState, viewState, dispatcher) {
    this.modelState = modelState;
    this.viewState = viewState;
    this.dispatcher = dispatcher;
    this.webGejmikaModel = new WebGejmikaModel(modelState);
  }

  dispatchUpdate(newStateModel, newStateView) {
    this.dispatcher(
      allActions.inputActions.update(newStateModel, newStateView)
    );
  }

  inputClick(input) {
    if (this.modelState.attpInProgress.length >= 4) {
      return;
    } else {
      const newStateModel = {
        ...this.modelState,
        attpInProgress: [...this.modelState.attpInProgress, input],
      };

      const icons = this.combToIcon(newStateModel.attpInProgress);

      const newStateView = {
        ...this.viewState,
        combInProgress: icons,
      };

      this.dispatchUpdate(newStateModel, newStateView);
    }
  }

  inputConfirm() {
    if (this.modelState.attpInProgress.length !== 4) {
      return;
    } else {
      const attpOutcome = this.webGejmikaModel.compareCode(
        this.modelState.attpInProgress,
        this.modelState.secretComb
      );
      const newState = {
        ...this.modelState,
        attpInProgress: [],
        attempts: [
          ...this.modelState.attempts,
          {
            attemptId: this.modelState.attpId + 1,
            attemptCode: this.modelState.attpInProgress,
            attemptOutcome: attpOutcome,
          },
        ],
        attpId: this.modelState.attpId + 1,
      };
      const outcome = this.outcomeToColor(attpOutcome);

      const newStateView = {
        ...this.viewState,

        attemptsView: [
          ...this.viewState.attemptsView,
          {
            attempt_view_id: this.modelState.attpId + 1,
            attemptViewComb: this.viewState.combInProgress,
            attemptViewOutcome: outcome,
          },
        ],
        combInProgress: [
          "./icons/circle.png",
          "./icons/circle.png",
          "./icons/circle.png",
          "./icons/circle.png",
        ],
        id: this.viewState.id + 1,
      };
      if (this.webGejmikaModel.isTargetReached(newState.attempts)) {
        newState.score = this.webGejmikaModel.score(newState.attempts);
        newStateView.correctView = this.combToIcon(newState.secretComb);
        this.dispatchUpdate(newState, newStateView);
      } else {
        this.dispatchUpdate(newState, newStateView);
      }
    }
  }

  inputCancel() {
    this.dispatchUpdate(
      {
        ...this.modelState,
        attpInProgress: [],
      },
      {
        ...this.viewState,
        combInProgress: [
          "./icons/circle.png",
          "./icons/circle.png",
          "./icons/circle.png",
          "./icons/circle.png",
        ],
      }
    );
  }

  startGame() {
    this.dispatchUpdate(
      {
        ...this.modelState,
        attpInProgress: [],
        attempts: [],
        attpId: -1,
        score: -1,
        secretComb: this.webGejmikaModel.secretCode(),
      },
      {
        combInProgress: [
          "./icons/circle.png",
          "./icons/circle.png",
          "./icons/circle.png",
          "./icons/circle.png",
        ],
        attemptsView: [],
        correctView: [],
        id: -1,
      }
    );
  }

  combToIcon = (comb) => {
    var icons = ["", "", "", ""];
    for (let index = 0; index < icons.length; index++) {
      switch (comb[index]) {
        case "K":
          icons[index] = "/icons/diamond.png";
          break;
        case "H":
          icons[index] = "/icons/heart.png";
          break;
        case "P":
          icons[index] = "/icons/symbol-of-spades.png";
          break;
        case "T":
          icons[index] = "/icons/clubs.png";
          break;
        case "L":
          icons[index] = "/icons/star.png";
          break;
        case "S":
          icons[index] = "/icons/traffic-light.png";
          break;
        default:
          icons[index] = "/icons/circle.png";
          break;
      }
    }
    return icons;
  };

  outcomeToColor = (outcome) => {
    let colors = [];
    let out = [...outcome];
    out.sort().reverse();
    for (let index = 0; index < out.length; index++) {
      switch (out[index]) {
        case 2:
          colors[index] = "green";
          break;
        case 1:
          colors[index] = "yellow";
          break;
        case 0:
          colors[index] = "gray";
          break;
        default:
          break;
      }
    }

    return colors;
  };
}