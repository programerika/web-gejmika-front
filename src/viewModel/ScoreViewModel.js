/**
 * @author Programerika
 */

import { StorageService } from "../services/StorageService";
import { WebGejmikaService } from "../services/WebGejmikaService";

export class ScoreViewModel {
  constructor() {
    this.webGejmikaService = new WebGejmikaService();
    this.storage = new StorageService();
  }

  saveUserScore = async (username, score) => {
    if (this.storage.isItemInStorageEmpty("username")) {
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
        message: "Please enter an username",
        isSaveButtonDisabled: true,
        isUsernameValid: "",
        toolTipStatus: "toolTipVisible",
        messageStatus: "visible",
        messageColor: "messageWhite",
      };
    }

    let regex = new RegExp("[a-zA-Z]{4,6}[0-9]{2}$");
    if (regex.test(username) && this.storage.isItemInStorageEmpty("username")) {
      if (
        (await this.webGejmikaService.checkIfUsernameExists(username)) === true
      ) {
        return {
          message: "*Username already exists",
          isSaveButtonDisabled: true,
          isUsernameValid: "isNotValidInput",
          messageColor: "messageRed",
        };
      } else {
        return {
          message: "*Username is correct",
          isSaveButtonDisabled: false,
          isUsernameValid: "isValidInput",
          messageColor: "messageGreen",
        };
      }
    } else {
      return {
        message: "*Your username is not in valid format",
        isSaveButtonDisabled: true,
        isUsernameValid: "isNotValidInput",
        messageColor: "messageRed",
      };
    }
  };

  checkStorageAndScore = (score) => {
    if (this.storage.isItemInStorageEmpty("username") && score > 0) {
      return true;
    } else {
      return false;
    }
  };

  initializeView = (score) => {
    return {
      toolTipStatus: "toolTipHidden",
      isUsernameValid: "",
      isSaveButtonDisabled: this.storage.isItemInStorageEmpty("username"),
      message: "Please enter an username",
      messageStatus: "visible",
      messageColor: "messageWhite",
      hide: "show",
      scoreMsg: this.calculateScoreMsg(score),
    };
  };

  hide = (score) => {
    if (!this.storage.isItemInStorageEmpty("username") && score >= 0) {
      console.log("Hide Save Button");
      return "hide";
    } else {
      console.log("Show Save BUTTON");
      return "show";
    }
  };

  disableSaveScoreButton = (isSaveButtonDisabled, score) => {
    if (isSaveButtonDisabled || score == 0) {
      return true;
    } else {
      return false;
    }
  };

  confettiPerScore = (score) => {
    if (score === 21) {
      return {
        width: window.innerWidth + 50,
        height: window.innerHeight,
        tweenDuration: 3000,
        recycle: false,
        numberOfPieces: 600,
        wind: 0.05,
        gravity: 0.2,
        x: 0,
        y: 0,
        w: window.innerWidth,
        h: window.innerHeight,
        initialVelocityX: 20,
        initialVelocityY: 20,
      };
    } else if (score == 13) {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
        tweenDuration: 3000,
        recycle: false,
        numberOfPieces: 200,
        wind: 0.05,
        gravity: 0.2,
        x: 0,
        y: 0,
        w: window.innerWidth,
        h: window.innerHeight,
        initialVelocityX: 10,
        initialVelocityY: 10,
      };
    } else if (score == 8) {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
        tweenDuration: 3000,
        recycle: false,
        numberOfPieces: 100,
        wind: 0.05,
        gravity: 0.2,
        x: 0,
        y: 0,
        w: window.innerWidth,
        h: window.innerHeight,
        initialVelocityX: 10,
        initialVelocityY: 10,
      };
    } else if (score === 0) {
      return {};
    }
  };

  calculateScoreMsg = (score) => {

    if (score == 0) return "Sorry, better luck next time! :(";
    else return `You got ${score} points!!!`;
    
  };

  changeClassesOnSaveButtonClick = (state) => {
    return {
      ...state,
      isSaveButtonDisabled: true,
      messageColor: "messageGreen",
      hide: "hide",
    };
  };

  setSaveStatus = async (username,score) => {
    await this.saveUserScore(username, score)
  }

  saveScoreState = async(state,username,score) => {
    return [
      this.changeClassesOnSaveButtonClick(state),
      await this.setSaveStatus(username,score)
    ]
  }

}
