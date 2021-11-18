/**
 * @author Programerika
 */
import allActions from "../redux/actions";
import { WebGejmikaModel } from "../model/WebGejmikaModel";
import heart from "../icons/heart.png";
import star from "../icons/star.png";
import diamond from "../icons/diamond.png";
import spades from "../icons/symbol-of-spades.png";
import trafficLight from "../icons/traffic-light.png";
import clubs from "../icons/clubs.png";
import circle from "../icons/circle.png";
import attemptStyles from "../components/AttemptPanel.module.css";

export class WebGejmikaViewModel {
  #modelState;
  #viewState;
  #dispatcher;
  #webGejmikaModel;
  #scoreViewModel;
  #emptyCombView;
  constructor(modelState, viewState, scoreViewModel, dispatcher) {
    this.#modelState = modelState;
    this.#viewState = viewState;
    this.#dispatcher = dispatcher;
    this.#webGejmikaModel = new WebGejmikaModel(modelState);
    this.#scoreViewModel = scoreViewModel;
    const initialColors = [
      ...Array(this.#webGejmikaModel.combinationLength()).fill("lightgray"),
    ];
    const emptyComb = [
      ...Array(this.#webGejmikaModel.combinationLength()).fill("_"),
    ];
    this.#emptyCombView = {
      comb: this.combToIcon(emptyComb).map(this.#asIconView),
      colors: initialColors,
      angleShift: -90,
    };
  }

  /**
   * @param {Object} newStateModel
   * @param {Object} newStateView
   * This method dispatches model and view state updates to reducers
   */
  #dispatchUpdate = (newStateModel, newStateView) => {
    this.#dispatcher(allActions.update(newStateModel, newStateView));
  };

  #dispatchViewUpdate = (newStateView) => {
    this.#dispatcher(allActions.updateViewModel(newStateView));
  };

  #appendCodeToCombinationInProgress = (icon) => {
    if (this.#isAttemptFull()) {
      return;
    }
    let combInProg = [...this.#viewState.combInProgress, icon];

    const preparedAttempts = this.#prepareAttemptsView(
      combInProg,
      this.#modelState.attempts
    );

    this.#dispatchViewUpdate({
      ...this.#viewState,
      combInProgress: combInProg,
      preparedAttempts: preparedAttempts,
    });
  };

  heartButtonClicked = () => {
    this.#appendCodeToCombinationInProgress(heart);
  };

  starButtonClicked = () => {
    this.#appendCodeToCombinationInProgress(star);
  };

  diamondButtonClicked = () => {
    this.#appendCodeToCombinationInProgress(diamond);
  };

  spadesButtonClicked = () => {
    this.#appendCodeToCombinationInProgress(spades);
  };

  trafficLightButtonClicked = () => {
    this.#appendCodeToCombinationInProgress(trafficLight);
  };

  clubsButtonClicked = () => {
    this.#appendCodeToCombinationInProgress(clubs);
  };

  /**
   * This method updates view state by adding new attemptView, and setting viewOutcome
   * Gets new model state from webGejmikaModel
   */
  codeGuessIfReady = () => {
    if (!this.#isAttemptFull()) {
      this.#alertPlayerVisuallyThatAttemptIsNotComplete();
    } else {
      this.codeGuess();
    }
  };

  #alertPlayerVisuallyThatAttemptIsNotComplete = () => {
    const preparedAttempts = this.#prepareAttemptsView(
      this.#viewState.combInProgress,
      this.#modelState.attempts,
      attemptStyles.flashColor
    );
    this.#dispatchViewUpdate({
      ...this.#viewState,
      preparedAttempts: preparedAttempts,
    });
  };

  #isAttemptFull = () => {
    return (
      this.#viewState.combInProgress.length >=
      this.#webGejmikaModel.combinationLength()
    );
  };

  codeGuess = () => {
    const newStateModel = this.#webGejmikaModel.makeAGuess(
      this.iconToComb(this.#viewState.combInProgress)
    );

    const preparedAttempts = this.#prepareAttemptsView(
      [],
      newStateModel.attempts
    );

    let correctView = [];
    if (newStateModel.gameOver) {
      correctView = this.combToIcon(newStateModel.secretComb).map(
        this.#asIconView
      );
      this.#scoreViewModel.addScoreIfPlayerIsRegistered(newStateModel.score);
    }

    this.#dispatchUpdate(newStateModel, {
      ...this.#viewState,
      combInProgress: [],
      correctView: correctView,
      preparedAttempts: preparedAttempts,
      gameOver: newStateModel.gameOver,
    });
  };

  /**
   * This method deletes last element in combInProgress array
   */
  inputDeleteLast = () => {
    if (this.#viewState.combInProgress.length > 0) {
      let combInProg = [...this.#viewState.combInProgress];
      combInProg.pop();

      const preparedAttempts = this.#prepareAttemptsView(
        combInProg,
        this.#modelState.attempts
      );

      this.#dispatchViewUpdate({
        ...this.#viewState,
        combInProgress: combInProg,
        preparedAttempts: preparedAttempts,
      });
    }
  };

  /**
   * This method sets  model, view  and score state to default parameters
   */
  startGame = () => {
    const newStateModel = this.#webGejmikaModel.generateSecretCode();
    this.#dispatchUpdate(newStateModel, {
      combInProgress: [],
      correctView: [],
      preparedAttempts: this.#prepareAttemptsView([], []),
      gameOver: false,
    });
  };

  /**
   *
   * @param {Array} comb
   * @returns {Array} icons
   * This method takes in array of combination attempt letters and transforms it into icon picture links for view state
   */
  combToIcon = (comb) => {
    let icons = [...Array(this.#webGejmikaModel.combinationLength()).keys()];
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
    let comb = [...Array(this.#webGejmikaModel.combinationLength()).keys()];
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
      ...Array(this.#webGejmikaModel.combinationLength()).fill("gray", 0),
    ];

    for (let i = 0; i < inPlace; i++) {
      colors[i] = "green";
    }

    for (let k = inPlace; k < inPlace + correctCode; k++) {
      colors[k] = "yellow";
    }

    return colors;
  };

  #prepareAttemptsView = (combInProgress, attempts, alertPlayerStyle = "") => {
    const combInProgressView =
      attempts.length >= this.#webGejmikaModel.attemptsLength()
        ? []
        : [
            this.#prepareAttemptInProgressView(
              combInProgress,
              alertPlayerStyle
            ),
          ];

    return [
      ...this.#prepareFinishedAttemptsView(attempts),
      ...combInProgressView,
      ...Array(
        this.#webGejmikaModel.attemptsLength() -
          combInProgressView.length -
          attempts.length
      ).fill(this.#emptyCombView),
    ];
  };

  #prepareFinishedAttemptsView = (attempts) => {
    return attempts.map((attempt) => {
      return {
        comb: this.combToIcon(attempt.attemptCode).map(this.#asIconView),
        colors: this.outcomeToColor(attempt.attemptOutcome),
        angleShift: this.#emptyCombView.angleShift,
      };
    });
  };

  #asIconView = (icon) => {
    return {
      imgClassName: attemptStyles.circle,
      imgSrc: icon,
    };
  };

  #prepareAttemptInProgressView = (comb, alertPlayerStyle) => {
    return {
      ...this.#emptyCombView,
      comb: [
        ...comb.map(this.#asIconView),
        ...Array(this.#webGejmikaModel.combinationLength() - comb.length).fill({
          imgClassName: attemptStyles.circle + " " + alertPlayerStyle,
          imgSrc: circle,
        }),
      ],
    };
  };
}
