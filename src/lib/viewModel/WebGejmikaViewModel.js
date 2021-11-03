/**
 * @author Programerika
 */
import allActions from "../redux/actions";
import { WebGejmikaModel } from "../model/WebGejmikaModel";
import heart from '../icons/heart.png';
import star from '../icons/star.png';
import diamond from '../icons/diamond.png';
import spades from '../icons/symbol-of-spades.png';
import trafficLight from '../icons/traffic-light.png';
import clubs from '../icons/clubs.png';
import circle from '../icons/circle.png';
import attemptStyles from "../components/AttemptPanel.module.css";


export class WebGejmikaViewModel {
  #modelState;
  #viewState;
  #dispatcher;
  #webGejmikaModel;
  #scoreViewModel;
  constructor(modelState, viewState, scoreViewModel, dispatcher) {
    this.#modelState = modelState;
    this.#viewState = viewState;
    this.#dispatcher = dispatcher;
    this.#webGejmikaModel = new WebGejmikaModel(modelState);
    this.#scoreViewModel = scoreViewModel;
  }

  /**
   *
   * @param {Object} newStateModel
   * @param {Object} newStateView
   * This method dispatches model and view state updates to reducers
   */
  dispatchUpdate = (newStateModel, newStateView) => {
    this.#dispatcher(
      allActions.inputActions.update(newStateModel, newStateView)
    );
  };

  #appendCodeToCombinationInProgress(icon) {
    if (this.isAttemptFull()) {
      return;
    }
    let combInProg = [...this.#viewState.combInProgress, icon];

    const preparedAttempts = this.prepareGameView(
      combInProg,
      this.#viewState.attemptsView,
      this.#viewState.id
    );

    this.dispatchUpdate(
      { ...this.#modelState },
      {
        ...this.#viewState,
        combInProgress: combInProg,
        preparedAttempts: preparedAttempts,
      }
    );
  }

  heartButtonClicked() {
    this.#appendCodeToCombinationInProgress(heart);
  }

  starButtonClicked() {
    this.#appendCodeToCombinationInProgress(star);
  }

  diamondButtonClicked() {
    this.#appendCodeToCombinationInProgress(diamond);
  }

  spadesButtonClicked() {
    this.#appendCodeToCombinationInProgress(spades);
  }

  trafficLightButtonClicked() {
    this.#appendCodeToCombinationInProgress(trafficLight);
  }

  clubsButtonClicked() {
    this.#appendCodeToCombinationInProgress(clubs);
  }

  /**
   * This method updates view state by adding new attemptView, and setting viewOutcome
   * Gets new model state from webGejmikaModel and calls dispatchUpdate function
   */
  codeGuessIfReady() {
    if (!this.isAttemptFull()) {
      // TODO alert player
      return;
    } else {
      this.codeGuess();
    }
  }

  isAttemptFull() {
    return this.#viewState.combInProgress.length >=
      this.#viewState.gameDifficulty.combinationLength;
  }

  codeGuess() {
    const newStateModel = this.#webGejmikaModel.makeAGuess(
      this.iconToComb(this.#viewState.combInProgress)
    );

    const newStateView = {
      ...this.#viewState,

      attemptsView: [
        ...this.#viewState.attemptsView,
        {
          attemptViewId: this.#viewState.id + 1,
          attemptViewComb: this.#viewState.combInProgress,
          attemptViewOutcome: this.outcomeToColor(
            newStateModel.attempts[newStateModel.attempts.length - 1]
              .attemptOutcome
          ),
        },
      ],
      combInProgress: [],
      id: this.#viewState.id + 1,
      gameOver: newStateModel.gameOver,
    };

    const preparedAttempts = this.prepareGameView(
      newStateView.combInProgress,
      newStateView.attemptsView,
      newStateView.id
    );

    let correctView = [];
    if (newStateModel.gameOver) {    
      correctView = this.prepareAttemptPanelView(
        this.combToIcon(newStateModel.secretComb)
      );
    }

    this.dispatchUpdate(newStateModel, {
      ...newStateView,
      correctView: correctView,
      preparedAttempts: preparedAttempts,
    });

    if (newStateModel.gameOver) {
      this.#scoreViewModel.addScoreIfPlayerIsRegistered(newStateModel.score);
    }
  }

  /**
   * This method deletes last element in combInProgress array and calls dispatchUpdate function
   */

  inputDeleteLast() {
    if (this.#viewState.combInProgress.length > 0) {
      let combInProg = [...this.#viewState.combInProgress];
      combInProg.pop();

      const preparedAttempts = this.prepareGameView(
        combInProg,
        this.#viewState.attemptsView,
        this.#viewState.id
      );

      this.dispatchUpdate(
        { ...this.#modelState },
        {
          ...this.#viewState,
          combInProgress: combInProg,
          preparedAttempts: preparedAttempts,
        }
      );
    }
  }

  /**
   * This method sets  model, view  and score state to default parameters and calls dispatchUpdate function
   */

  startGame() {
    const newStateModel = this.#webGejmikaModel.generateSecretCode();
    this.dispatchUpdate(newStateModel, {
      combInProgress: [],
      attemptsView: [],
      correctView: [],
      preparedAttempts: this.prepareGameView([], [], -1),
      gameDifficulty: {
        attemptsLength: this.#webGejmikaModel.attemptsLength(),
        combinationLength: this.#webGejmikaModel.combinationLength(),
      },
      id: -1,
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
          icons[index] = diamond;
          break;
        case "H":
          icons[index] = heart;
          break;
        case "P":
          icons[index] = spades;
          break;
        case "T":
          icons[index] = clubs;
          break;
        case "L":
          icons[index] = star;
          break;
        case "S":
          icons[index] = trafficLight;
          break;
        default:
          icons[index] = circle;
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
        case diamond:
          comb[index] = "K";
          break;
        case heart:
          comb[index] = "H";
          break;
        case spades:
          comb[index] = "P";
          break;
        case clubs:
          comb[index] = "T";
          break;
        case star:
          comb[index] = "L";
          break;
        case trafficLight:
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
      ...Array(this.#viewState.gameDifficulty.combinationLength).fill("gray", 0),
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

  prepareGameView = (combInProgress, attemptsView, id) => {
    const preparedAttp = [
      ...Array(this.#viewState.gameDifficulty.attemptsLength).keys(),
    ];
    preparedAttp.forEach((e) => {
      preparedAttp[e] = this.prepareGamePanelView(
        combInProgress,
        attemptsView,
        id,
        e
      );
    });
    return preparedAttp;
  };

  areWeAtAttemptInProgress = (id, e) => id + 1 == e;

  prepareGamePanelView = (combInProgress, attemptsView, id, e) => {
    return {
      comb: this.prepareAttemptPanelView(
        this.areWeAtAttemptInProgress(id, e)
          ? combInProgress
          : typeof attemptsView[e] !== "undefined"
          ? attemptsView[e].attemptViewComb
          : [
              circle,
              circle,
              circle,
              circle,
            ]
      ),
      colors:
        typeof attemptsView[e] !== "undefined"
          ? attemptsView[e].attemptViewOutcome
          : ["lightgray", "lightgray", "lightgray", "lightgray"],
    };
  };

  prepareAttemptPanelView = (comb) => {
    const fullComb = [
      ...Array(this.#viewState.gameDifficulty.combinationLength).keys(),
    ];

    return fullComb.map((index) => {
      const prepared = {
        imgClassName:
          typeof comb[index] == "undefined"
            ? attemptStyles.circle + ' ' + this.#viewState.attemptIncomplete
            : attemptStyles.circle,
        imgSrc:
          typeof comb[index] == "undefined"
            ? circle
            : comb[index],
      };
      return prepared;
    });
  };
}
