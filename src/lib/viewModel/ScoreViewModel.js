/**
 * @author Programerika
 */
import allActions from "../redux/actions";
import { StorageService } from "../services/StorageService";
import { WebGejmikaService } from "../services/WebGejmikaService";
import globalStyles from "../global.module.css";
import showScoreStyles from "../components/ShowScore.module.css";

export class ScoreViewModel {
  constructor(scoreBoardViewModel) {
    this.webGejmikaService = new WebGejmikaService();
    this.storage = new StorageService();
    this.scoreBoardViewModel = scoreBoardViewModel;
  }

  saveUserScore = async (username, score) => {
    if (!this.isUsernameRegistered()) {
      this.storage.setItem("username", username);
      const resp = await this.webGejmikaService.saveScore(
        this.storage.getItem("username"),
        score
      );

      if (resp !== null) {
        resp.json().then((uid) => this.storage.setItem("uid", uid.id));
        return "Score has been successfully saved";
      } else {
        return "Something went wrong";
      }
    }
  };

  /**
   * @param {String} username - username from input field
   * @returns {Object} - customized object for styling validation
   */

  validateUsername = async (username) => {
    if (username.length === 0) {
      return {
        message: "Please enter a username",
        isSaveButtonDisabled: true,
        isUsernameValid: "",
        toolTipStatus: showScoreStyles.toolTipVisible,
        messageStatus: globalStyles.visible,
        messageColor: showScoreStyles.messageWhite,
      };
    }

    let regex = new RegExp("[a-zA-Z0-9]{4,6}[0-9]{2}$");
    if (regex.test(username) && !this.isUsernameRegistered()) {
      if (
        (await this.webGejmikaService.checkIfUsernameExists(username)) === true
      ) {
        return {
          message: "*Username already exists",
          isSaveButtonDisabled: true,
          isUsernameValid: showScoreStyles.isNotValidInput,
          messageColor: showScoreStyles.messageRed,
        };
      } else {
        return {
          message: "*Username is correct",
          isSaveButtonDisabled: false,
          isUsernameValid: showScoreStyles.isValidInput,
          messageColor: showScoreStyles.messageGreen,
        };
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

  checkStorageAndScore = (score) => {
    if (!this.isUsernameRegistered() && score > 0) {
      return true;
    } else {
      return false;
    }
  };

  initializeView = (score) => {
    return {
      toolTipStatus: showScoreStyles.toolTipHidden,
      isUsernameValid: "",
      isSaveButtonDisabled: !this.isUsernameRegistered(),
      message: "Please enter an username",
      messageStatus: globalStyles.visible,
      messageColor: showScoreStyles.messageWhite,
      scoreMsg: this.calculateScoreMsg(score),
    };
  };

  hide = (score) => {
    if (this.isUsernameRegistered() && score >= 0) {
      console.log("Hide Save Button");
      return globalStyles.hidden;
    } else {
      console.log("Show Save BUTTON");
      return globalStyles.visible;
    }
  };

  disableSaveScoreButton = (isSaveButtonDisabled, score) => {
    if (isSaveButtonDisabled || score === 0) {
      return true;
    } else {
      return false;
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
        numberOfPieces: 600
      };
    } else if (score === 13) {
      return {
        ...defaultSettings,
        numberOfPieces: 200
      };
    } else if (score === 8) {
      return {
        ...defaultSettings,
        numberOfPieces: 100
      };
    } else if (score === 0) {
      return {
        ...defaultSettings
      };
    }
  };

  calculateScoreMsg = (score) => {
    if (score === 0) return "Sorry, better luck next time! :(";
    else return `You got ${score} points!!!`;
  };

  isUsernameRegistered = () => {
    return !this.storage.isItemInStorageEmpty("username");
  }

  addScore = async (score) => {
    if (score === 0) return;
    else {
      this.webGejmikaService
        .addScore(this.storage.getItem("username"), score)
        .then((msg) => {
          this.initializeScoreBoardView();
        });
    }
  };
  
  changeClassesOnSaveButtonClick = (state) => {
    return {
      ...state,
      isSaveButtonDisabled: true,
      messageColor: showScoreStyles.messageGreen,
    };
  };

  saveScoreState = async (state, username, score) => {
    return [
      this.changeClassesOnSaveButtonClick(state),
      await this.saveUserScore(username, score),
    ];
  };

  initializeScoreBoardView = async () => {
    this.scoreBoardViewModel.initializeScoreBoardView();
  };

  deleteButtonClicked = async (viewModel) => {
    this.scoreBoardViewModel.deleteButtonClicked();
  };
}
