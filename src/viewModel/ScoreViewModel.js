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
          messageColor: "messageGreen"
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
    if(this.storage.getItem("username") === null && score===0){
        return "showSaveButton"
    }else{
        return "hideSaveButton"
    }
  }

}
