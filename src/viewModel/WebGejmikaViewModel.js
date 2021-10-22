/**
 * @author Programerika
 */
import allActions from "../redux/actions";
import { WebGejmikaModel } from "../model/WebGejmikaModel";
import { WebGejmikaService } from "../services/WebGejmikaService";
import { StorageService } from "../services/StorageService";
import { ScoreViewModel } from "./ScoreViewModel";

export class WebGejmikaViewModel {
  constructor(modelState, viewState, scoreState, dispatcher) {
    this.modelState = modelState;
    this.viewState = viewState;
    this.scoreState = scoreState;
    this.dispatcher = dispatcher;
    this.webGejmikaModel = new WebGejmikaModel(modelState);
    this.WebGejmikaService = new WebGejmikaService();
    this.scoreViewModel = new ScoreViewModel(scoreState, dispatcher);
    this.storage = new StorageService();
  }

  /**
   *
   * @param {Object} newStateModel
   * @param {Object} newStateView
   * This method dispatches model and view state updates to reducers
   */

  dispatchUpdate = (newStateModel, newStateView) => {
    this.dispatcher(
      allActions.inputActions.update(newStateModel, newStateView)
    );
  };

  /**
   * Methods for each button icon clicked BEGIN
   *
   * All methods add the appropriate picture link to combInProgress and dispatch view state update
   * */

  heartButtonClicked() {
    if (this.isAttemptFull()) {
      return;
    }
    this.setAttemptIncomplete(false);
    const newStateView = {
      ...this.viewState,
      combInProgress: [...this.viewState.combInProgress, "/icons/heart.png"],
      attemptIncomplete: "",
    };

    this.dispatchUpdate({ ...this.modelState }, newStateView);
  }

  starButtonClicked() {
    if (this.isAttemptFull()) {
      return;
    }
    this.setAttemptIncomplete(false);
    const newStateView = {
      ...this.viewState,
      combInProgress: [...this.viewState.combInProgress, "/icons/star.png"],
      attemptIncomplete: "",
    };

    this.dispatchUpdate({ ...this.modelState }, newStateView);
  }

  diamondButtonClicked() {
    if (this.isAttemptFull()) {
      return;
    }
    this.setAttemptIncomplete(false);
    const newStateView = {
      ...this.viewState,
      combInProgress: [...this.viewState.combInProgress, "/icons/diamond.png"],
      attemptIncomplete: "",
    };

    this.dispatchUpdate({ ...this.modelState }, newStateView);
  }

  spadesButtonClicked() {
    if (this.isAttemptFull()) {
      return;
    }
    const newStateView = {
      ...this.viewState,
      combInProgress: [
        ...this.viewState.combInProgress,
        "/icons/symbol-of-spades.png",
      ],
      attemptIncomplete: "",
    };

    this.dispatchUpdate({ ...this.modelState }, newStateView);
  }

  trafficLightButtonClicked() {
    if (this.isAttemptFull()) {
      return;
    }
    const newStateView = {
      ...this.viewState,
      combInProgress: [
        ...this.viewState.combInProgress,
        "/icons/traffic-light.png",
      ],
      attemptIncomplete: "",
    };

    this.dispatchUpdate({ ...this.modelState }, newStateView);
  }

  clubsButtonClicked() {
    if (this.isAttemptFull()) {
      return;
    }
    const newStateView = {
      ...this.viewState,
      combInProgress: [...this.viewState.combInProgress, "/icons/clubs.png"],
      attemptIncomplete: "",
    };

    this.dispatchUpdate({ ...this.modelState }, newStateView);
  }

  /**
   * Methods for each button icon clicked END
   * */

  /**
   *
   * This method updates view state by adding new attemptView, and setting viewOutcome
   * Gets new model state from webGejmikaModel and calls dispatchUpdate function
   */

  codeGuessIfReady() {
    if (
      this.viewState.combInProgress.length !==
      this.viewState.gameDifficulty.combinationLength
    ) {
      this.setAttemptIncomplete(true);
      return;
    } else {
      this.setAttemptIncomplete(false);
      this.codeGuess();
    }
  }

  isAttemptFull() {
    return this.viewState.combInProgress.length >=
      this.viewState.gameDifficulty.combinationLength
      ? true
      : false;
  }

  setAttemptIncomplete(isIncomplete) {
    this.dispatchUpdate(
      { ...this.modelState },
      { ...this.viewState, attemptIncomplete: isIncomplete ? "flashColor" : "" }
    );
  }

  codeGuess() {
    const newStateModel = this.webGejmikaModel.makeAGuess(
      this.iconToComb(this.viewState.combInProgress)
    );

    const newStateView = {
      ...this.viewState,

      attemptsView: [
        ...this.viewState.attemptsView,
        {
          attemptViewId: this.viewState.id + 1,
          attemptViewComb: this.viewState.combInProgress,
          attemptViewOutcome: this.outcomeToColor(
            newStateModel.attempts[newStateModel.attempts.length - 1]
              .attemptOutcome
          ),
        },
      ],
      combInProgress: [],
      id: this.viewState.id + 1,
      gameOver: newStateModel.gameOver,
    };

    this.dispatchUpdate(newStateModel, newStateView);

    if (
      newStateModel.gameOver &&
      !this.storage.isItemInStorageEmpty("username")
    ) {
      this.scoreViewModel.addScore(newStateModel.score);
    }
  }

  /**
   * This method deletes last element in combInProgress array and calls dispatchUpdate function
   */

  inputDeleteLast() {
    if (this.viewState.combInProgress.length > 0) {
      let combInProg = [...this.viewState.combInProgress];
      combInProg.pop();

      this.dispatchUpdate(
        {
          ...this.modelState,
        },
        {
          ...this.viewState,
          combInProgress: combInProg,
          attemptIncomplete: "",
        }
      );
    }
  }

  /**
   * This method sets  model, view  and score state to default parameters and calls dispatchUpdate function
   */

  async startGame() {
    const newStateModel = this.webGejmikaModel.generateSecretCode();
    this.dispatchUpdate(newStateModel, {
      combInProgress: [],
      attemptsView: [],
      correctView: this.combToIcon(newStateModel.secretComb),
      attemptIncomplete: false,
      gameDifficulty: {
        attemptsLength: this.webGejmikaModel.attemptsLength(),
        combinationLength: this.webGejmikaModel.combinationLength(),
      },
      id: -1,
    });
    this.scoreViewModel.dispatchUpdateScoreBoard({
      topPlayers: await this.scoreViewModel.getTopPlayers(),
    });
  }

  /**
   *
   * @param {Array} comb
   * @returns {Array} icons
   * This method takes in array of combination attempt letters and transforms it into icon picture links for view state
   */

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

  /**
   *
   * @param {Array} icons
   * @returns {Array} comb
   * This method takes in array of icon picture links and transforms it into combination attempt letters for model state
   */

  iconToComb = (icons) => {
    var comb = ["", "", "", ""];
    for (let index = 0; index < comb.length; index++) {
      switch (icons[index]) {
        case "/icons/diamond.png":
          comb[index] = "K";
          break;
        case "/icons/heart.png":
          comb[index] = "H";
          break;
        case "/icons/symbol-of-spades.png":
          comb[index] = "P";
          break;
        case "/icons/clubs.png":
          comb[index] = "T";
          break;
        case "/icons/star.png":
          comb[index] = "L";
          break;
        case "/icons/traffic-light.png":
          comb[index] = "S";
          break;
        default:
          comb[index] = "";
          break;
      }
    }
    return comb;
  };

  /**
   *
   * @param {Object} outcome
   * @returns {Array} colors
   * This method takes in object which containes number of guesses in place and number of correct guesses and transforms it into array of color names for view state
    green - for in place guess
    yellow - for correct guess
   */

  outcomeToColor = (outcome) => {
    let { inPlace, correctCode } = outcome;

    let colors = [
      ...Array(this.viewState.gameDifficulty.combinationLength).fill("gray", 0),
    ];

    for (let i = 0; i < inPlace; i++) {
      colors[i] = "green";
    }

    for (let k = inPlace; k < inPlace + correctCode; k++) {
      colors[k] = "yellow";
    }

    let SVGpieOrder = [2, 3, 0, 1];
    let colorsRearrangedforSVG = [...colors];

    for (let i = 0; i < colors.length; i++) {
      colorsRearrangedforSVG[i] = colors[SVGpieOrder[i]];
    }

    return colorsRearrangedforSVG;
  };

  prepareGameView = () => {
    return {
      classShowScore: this.modelState.gameOver ? "show" : "hide",
      classInputPanel: this.modelState.gameOver ? "hide" : "show",
    };
  };

  prepareAttemptPanelView = (comb) => {
    const prepared = {
      imgClassName:
        typeof comb == "undefined"
          ? `circle ` + this.viewState.attemptIncomplete
          : `circle`,
      imgSrc: typeof comb == "undefined" ? "./icons/circle.png" : comb,
    };
    console.log("ATTP VIEW: " + JSON.stringify(prepared));
    return prepared;
  };

  prepareGamePanelView = (
    combInProgress,
    attemptsView,
    id,
    attemptIncomplete,
    e
  ) => {
    return {
      comb:
        id + 1 == e
          ? combInProgress
          : typeof attemptsView[e] !== "undefined"
          ? attemptsView[e].attemptViewComb
          : [
              "./icons/circle.png",
              "./icons/circle.png",
              "./icons/circle.png",
              "./icons/circle.png",
            ],
      attemptIncpl: id + 1 == e ? attemptIncomplete : "",
      colors:
        typeof attemptsView[e] !== "undefined"
          ? attemptsView[e].attemptViewOutcome
          : ["lightgray", "lightgray", "lightgray", "lightgray"],
    };
  };
}
