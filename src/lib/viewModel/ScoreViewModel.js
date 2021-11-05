/**
 * @author Programerika
 */
import { StorageService } from "../services/StorageService";
import { WebGejmikaService } from "../services/WebGejmikaService";
import showScoreStyles from "../components/ShowScore.module.css";

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
      offerToRegisterPlayer: !this.#isUsernameRegistered() && score > 0,
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

  #checkIfUsernameExists = async (username) => {
    try {
      const player = await this.#webGejmikaService.getPlayerByUsername(
        username
      );
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
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
      const usernameExists = await this.#checkIfUsernameExists(username);

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

  #isUsernameRegistered = () => {
    return !this.#storage.isItemInStorageEmpty("username");
  };

  addScoreIfPlayerIsRegistered = async (score) => {
    if (!this.#isUsernameRegistered()) return;
    if (score === 0) return;

    this.#webGejmikaService
      .addScore(this.#storage.getItem("username"), score)
      .then((msg) => {
        this.#scoreBoardViewModel.initializeScoreBoardView();
      })
      .catch((err) => {
        window.alert(err.message);
        this.#gameViewModel.startGame();
      });
  };

  #saveUserScore = async (username, score) => {
    if (!this.#isUsernameRegistered()) {
      try {
        const uid = await this.#webGejmikaService.saveScore(username, score);

        //TODO resp.json() mora da se isprocesira u service sloju i da se uradi error handling pre
        this.#storage.setItem("uid", uid);
        this.#storage.setItem("username", username);
      } catch (error) {
        window.alert(error.message);
        this.#gameViewModel.startGame();
      }
    }
  };

  saveScoreState = async (score) => {
    try {
      const resultMessage = await this.#saveUserScore(
        this.state.username,
        score
      );
      const newState = {
        ...this.state,
        toolTipStatus: showScoreStyles.toolTipHidden,
        isSaveButtonDisabled: true,
        offerToRegisterPlayer: false,
        saveStatus: resultMessage,
      };
      this.setState(newState);
      this.#scoreBoardViewModel.initializeScoreBoardView();
    } catch (error) {
      window.alert(error.message);
      this.#gameViewModel.startGame();
    }
  };

  playAgain = () => {
    this.#gameViewModel.startGame();
  };
}
