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

  initializeView = (score) => {
    return {
      toolTipStatus: showScoreStyles.toolTipHidden,
      isUsernameValid: "",
      isSaveButtonDisabled: true,
      offerToRegisterPlayer: !this.#isPlayerRegistered() && score > 0,
      message: "Please enter a username",
      messageColor: showScoreStyles.messageWhite,
      scoreMsg: this.#calculateScoreMsg(score),
      saveStatus: "",
      username: "",
    };
  };

  setStateCallback = (state, setState) => {
    this.state = state;
    this.setState = setState;
  };

  usernameInputOnChange = async (username) => {
    this.setState({
      ...this.state,
      ...(await this.#validateUsername(username)),
      username: username,
    });
  };

  #checkIfPlayerExists = async (username) => {
    const player = await this.#webGejmikaService.getPlayerByUsername(username);
    return player !== undefined;
  };

  #validateUsername = async (username) => {
    if (username.length === 0) {
      return {
        message: "Please enter a username",
        isSaveButtonDisabled: true,
        isUsernameValid: "",
        messageColor: showScoreStyles.messageWhite,
      };
    }
    let regex = new RegExp("[a-zA-Z0-9]{4,6}[0-9]{2}$");
    if (regex.test(username)) {
      try {
        const usernameExists = await this.#checkIfPlayerExists(username);

        if (usernameExists) {
          return {
            message: "*Username already exists",
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
      } catch (error) {
        notifyError(error);
        return this.#setUpErrorState(
          "Sorry, we are not able to complete the registration process at the moment."
        );
      }
    } else {
      return {
        message: "*Your username is not in valid format",
        isSaveButtonDisabled: true,
        isUsernameValid: showScoreStyles.isNotValidInput,
        messageColor: showScoreStyles.messageRed,
      };
    }
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
  };

  #calculateScoreMsg = (score) => {
    if (score === 0) return "Sorry, better luck next time! :(";
    else return `You got ${score} points!!!`;
  };

  hideToolTip = () => {
    this.setState({
      ...this.state,
      toolTipStatus: showScoreStyles.toolTipHidden,
    });
  };

  showToolTip = () => {
    this.setState({
      ...this.state,
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

  #setUpErrorState = (errorMsg) => {
    return {
      isSaveButtonDisabled: true,
      offerToRegisterPlayer: false,
      messageColor: showScoreStyles.messageRed,
      scoreMsg: "",
      saveStatus: errorMsg,
    };
  };

  saveScoreState = async (score) => {
    try {
      const uid = await this.#webGejmikaService.saveScore(
        this.state.username,
        score
      );
      this.#storage.setItem("uid", uid);
      this.#storage.setItem("username", this.state.username);
      this.setState({
        ...this.state,
        toolTipStatus: showScoreStyles.toolTipHidden,
        isSaveButtonDisabled: true,
        offerToRegisterPlayer: false,
        saveStatus: "Username successfully saved!",
      });
      this.#scoreBoardViewModel.initializeScoreBoardView();
    } catch (error) {
      notifyError(error.message);

      this.setState(
        this.#setUpErrorState(
          "Sorry, we are not able to complete the registration process at the moment."
        )
      );
    }
  };

  playAgain = () => {
    this.#gameViewModel.startGame();
  };
}
