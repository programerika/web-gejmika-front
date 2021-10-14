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

  checkIfScoreIsZero = (score) => {
    if (score === 0) {
      return true;
    } else {
      return false;
    }
  };

  disableSaveScoreIfUsernameExists = () => {
    if (this.storage.getItem("username") === null) {
      return true;
    }
  };

  saveUserScore = async (username, score) => {
    const message = await this.webGejmikaService.saveScore(username, score);
    return message;
  };

  /**
   * @param {String} input - text from input field (username)
   * @returns {Object} - customized object for styling validation
   */

  usernameValidation = async (input) => {
    if (input.length === 0) {
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
    if (regex.test(input) && this.storage.getItem("username") === null) {
      if (
        (await this.webGejmikaService.checkIfUsernameExists(input)) === true
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
    if (this.storage.getItem("username") === null && score > 0) {
      return true;
    } else {
      return false;
    }
  };

  initializeView = (score) => {
    return {
      toolTipStatus: "toolTipHidden",
      isUsernameValid: "",
      isSaveButtonDisabled: this.disableSaveScoreIfUsernameExists(),
      message: "Please enter an username",
      messageStatus: "visible",
      messageColor: "messageWhite",
      hide: "show",
      scoreMsg: this.calculateScoreMsg(score),
    };
  };

  hide = (score) => {
    if (this.storage.getItem("username") !== null && score >= 0) {
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
      return {
        width: 0,
        height: 0,
        tweenDuration: 0,
        recycle: false,
        numberOfPieces: 0,
        wind: 0,
        gravity: 0,
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        initialVelocityX: 0,
        initialVelocityY: 0,
      };
    }
    if (this.storage.getItem("username") === null && score === 0) {
      return "show";
    } else {
      return "hide";
    }
  };

  calculateScoreMsg = (score) => {
    if (score == 0) return "Sorry, better luck next time! :(";
    else return `You got ${score} points!!!`;
  };
}
