/**
 * @author Programerika
 */
import { StorageService } from "../services/StorageService";
import { WebGejmikaService } from "../services/WebGejmikaService";
import showScoreStyles from "../components/ShowScore.module.css";
import notifyError from "../services/ErrorNotificationService";

export class ScoreViewModel {
  #webGejmikaService;
  #storage;
  #scoreBoardViewModel;
  #gameViewModel;
  constructor(scoreBoardViewModel) {
    this.#webGejmikaService = new WebGejmikaService();
    this.#storage = new StorageService();
    this.#scoreBoardViewModel = scoreBoardViewModel;
  }

  setGameViewModel = (viewModel) => {
    this.#gameViewModel = viewModel;
  };

  reducer = (state, action) => {
    switch (action.type) {
      case "update":
        return { ...state, ...action.payload };
      default:
        throw new Error();
    }
  };

  initializeView = (score) => {
    return [
      this.reducer,
      {
        toolTipStatus: showScoreStyles.toolTipHidden,
        isUsernameValid: "",
        isSaveButtonDisabled: true,
        offerToRegisterPlayer: !this.#isPlayerRegistered() && score > 0,
        message: "Please enter a username",
        messageColor: showScoreStyles.messageWhite,
        scoreMsg: this.#calculateScoreMsg(score),
        username: "",
        saveButtonText: "Save score!",
      },
    ];
  };

  setStateCallback = (state, dispatch) => {
    this.state = state;
    this.dispatch = dispatch;
  };

  #dispatchUpdate = (newState) => {
    this.dispatch({ type: "update", payload: newState });
  };

  usernameInputOnChange = (username) => {
    let validationResult;
    if (username && username.length > 2) {
      validationResult = this.#validateUsername(username);
    }
    this.#dispatchUpdate({
      ...validationResult,
      username: username,
    });
  };

  #validateUsername = (username) => {
    if (username.length === 0) {
      return {
        message: "Please enter a username",
        isSaveButtonDisabled: true,
        isUsernameValid: "",
        messageColor: showScoreStyles.messageWhite,
      };
    }
    let regex = new RegExp("[a-zA-Z0-9]{4,6}[0-9]{2}$");
    if (!regex.test(username)) {
      return {
        message: "*Your username is not in valid format",
        isSaveButtonDisabled: true,
        isUsernameValid: showScoreStyles.isNotValidInput,
        messageColor: showScoreStyles.messageRed,
      };
    }

    return {
      message: "*Username is correct",
      isSaveButtonDisabled: false,
      isUsernameValid: showScoreStyles.isValidInput,
      messageColor: showScoreStyles.messageGreen,
    };
  };

  confettiPerScore = (score) => {
    const defaultSettings = {
      width: window.innerWidth,
      height: window.innerHeight,
      tweenDuration: 3000,
      recycle: false,
      numberOfPieces: 0,
      wind: 0.05,
      gravity: 0.2,
      x: 0,
      y: 0,
      initialVelocityX: 20,
      initialVelocityY: 20,
    };
    if (score === 21) {
      return {
        ...defaultSettings,
        numberOfPieces: 600,
      };
    } else if (score === 13) {
      return {
        ...defaultSettings,
        numberOfPieces: 200,
      };
    } else if (score === 8) {
      return {
        ...defaultSettings,
        numberOfPieces: 100,
      };
    } else if (score === 0) {
      return {
        ...defaultSettings,
      };
    }
    return defaultSettings;
  };

  #calculateScoreMsg = (score) => {
    if (score === 0) return "Sorry, better luck next time! :(";
    else return `You got ${score} points!!!`;
  };

  hideToolTip = () => {
    this.#dispatchUpdate({
      toolTipStatus: showScoreStyles.toolTipHidden,
    });
  };

  showToolTip = () => {
    this.#dispatchUpdate({
      toolTipStatus: showScoreStyles.toolTipVisible,
    });
  };

  #isPlayerRegistered = () => {
    return !this.#storage.isItemInStorageEmpty("username");
  };

  addScoreIfPlayerIsRegistered = async (score) => {
    if (score === 0) return;
    if (this.#isPlayerRegistered()) {
      try {
        await this.#webGejmikaService.addScore(
          this.#storage.getItem("username"),
          score
        );
        this.#scoreBoardViewModel.initializeScoreBoardView();
      } catch (error) {
        notifyError(
          error,
          true,
          "Sorry we are not able to add your score right now!",
          true
        );
      }
    }
  };

  #checkIfPlayerExists = async (username) => {
    const player = await this.#webGejmikaService.getPlayerByUsername(username);
    const usernameExists = player !== undefined;
    if (usernameExists) {
      this.#dispatchUpdate({
        message: "*Username already exists",
        isSaveButtonDisabled: true,
        saveButtonText: "Save score!",
        isUsernameValid: showScoreStyles.isNotValidInput,
        messageColor: showScoreStyles.messageRed,
      });
    }
    return usernameExists;
  };

  saveScoreState = async (score) => {
    if (this.#isPlayerRegistered()) {
      throw new Error("Illegal state: Player is already registered!");
    }

    this.#dispatchUpdate({
      isSaveButtonDisabled: true,
      saveButtonText: "Checking...",
    });

    try {
      const usernameExists = await this.#checkIfPlayerExists(
        this.state.username
      );
      if (usernameExists) return;

      this.#dispatchUpdate({
        saveButtonText: "Saving...",
      });

      const uid = await this.#webGejmikaService.saveScore(
        this.state.username,
        score
      );
      this.#storage.setItem("uid", uid);
      this.#storage.setItem("username", this.state.username);
      this.#dispatchUpdate({
        offerToRegisterPlayer: false,
      });
      this.#scoreBoardViewModel.initializeScoreBoardView();
    } catch (error) {
      notifyError(
        error,
        true,
        "Sorry, we are not able to complete the registration process at the moment.",
        true
      );
      this.#dispatchUpdate({
        isSaveButtonDisabled: false,
        saveButtonText: "Save score!",
      });
    }
  };

  playAgain = () => {
    this.#gameViewModel.startGame();
  };
}
