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

  hideSaveButton = (score) => {
    if (this.storage.getItem("username") === null && score === 0) {
      return "showSaveButton";
    } else {
      return "hideSaveButton";
    }
  };

  calculateConffetiProps = (score) => {
    const conffetiProps = {
      width: window.innerWidth + 50,
      height: window.innerHeight,
      tweenDuration: 3000,
      recycle: false,
      numberOfPieces: 600,
      wind: 0.05,
      gravity: 0.2,
      confettiSource: {
        x: 0,
        y: 0,
        w: window.innerWidth,
        h: window.innerHeight,
      },
      initialVelocityX: 20,
      initialVelocityY: 20,
    };

    if (score == 21) return conffetiProps;
    else if (score == 13)
      return {
        ...conffetiProps,
        width: window.innerWidth,
        numberOfPieces: 200,
      };
    else if (score == 21)
      return {
        ...conffetiProps,
        numberOfPieces: 100,
      };
    else
      return {
        ...conffetiProps,
        numberOfPieces: 0,
      };
  };

  calculateScoreMsg = (score) => {
    if (score == 0) return "Sorry, better luck next time! :(";
    else return `You got ${score} points!!!`;
  };
}
