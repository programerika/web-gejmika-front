/**
 * @author Programerika
 */
import allActions from "../redux/actions";
import { StorageService } from "../services/StorageService";
import { WebGejmikaService } from "../services/WebGejmikaService";

export class ScoreViewModel {
  constructor(scoreState, dispatcher) {
    this.webGejmikaService = new WebGejmikaService();
    this.storage = new StorageService();
    this.dispatcher = dispatcher;
    this.scoreState = scoreState;
  }

  /**
   *
   * @param {Object} newStateBoard
   * This method dispatches scoreBoard state to reducer
   */

  dispatchUpdateScoreBoard = (newStateBoard) => {
    this.dispatcher(allActions.inputActions.updateScoreBoard(newStateBoard));
  };

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

    let regex = new RegExp("[a-zA-Z0-9]{4,6}[0-9]{2}$");
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
    if (isSaveButtonDisabled || score === 0) {
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
    } else if (score === 13) {
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
    } else if (score === 8) {
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
        width: window.innerWidth,
        height: window.innerHeight,
        tweenDuration: 3000,
        recycle: false,
        numberOfPieces: 0,
        wind: 0.05,
        gravity: 0.2,
        x: 0,
        y: 0,
        w: window.innerWidth,
        h: window.innerHeight,
        initialVelocityX: 10,
        initialVelocityY: 10,
      };
    }
  };

  calculateScoreMsg = (score) => {
    if (score === 0) return "Sorry, better luck next time! :(";
    else return `You got ${score} points!!!`;
  };

  refreshScoreBoard = async () => {
    this.getTopPlayers().then((players) => {
      this.dispatchUpdateScoreBoard({
        ...this.scoreState,
        topPlayers: { ...players },
      });
    });
  };

  /**
   * @returns {Array} - array of top players
   */

  getTopPlayers = async () => {
    const topPlayers = await this.webGejmikaService.getTopPlayers();

    const currentPlayer = await this.webGejmikaService.getCurrentPlayer(
      localStorage.getItem("username")
    );

    return {
      topPlayers: [...topPlayers],
      currentPlayer: { ...currentPlayer },
    };
  };

  isUserInTopTen = () => {
    let isUsernameInTopTen = false;
    this.scoreState.topPlayers.topPlayers.map((person, i) => {
      if (person.username === this.storage.getItem("username")) {
        isUsernameInTopTen = true;
      }
    });
    return isUsernameInTopTen;
  };

  highlightCurrentUser = (username) => {
    const isEqual = username === this.storage.getItem("username");
    return {
      rowColor: isEqual ? "currentPlayer" : "",
    };
  };

  isLocalStorageEmpty = () => {
    return this.storage.getItem("username") === null;
  };

  is11PlayerOnTheBoard = () => {
    return (
      !this.isUserInTopTen() && !this.storage.isItemInStorageEmpty("username")
    );
  };

  deleteUsername = async () => {
    if (this.storage.getItem("uid") !== null) {
      const resp = await this.webGejmikaService.deleteScore(
        this.storage.getItem("uid")
      );
      console.log("STATUS - " + resp);
      if (resp === 204) {
        this.storage.removeItem("uid");
        this.storage.removeItem("username");
        return "User has been successfully deleted";
      } else {
        return "Something went wrong";
      }
    }
  };

  addScore = async (score) => {
    if (score === 0) return;
    else {
      this.webGejmikaService
        .addScore(this.storage.getItem("username"), score)
        .then((msg) => {
          this.refreshScoreBoard();
        });
    }
  };

  initializeScoreGameStart = async () => {
    this.dispatchUpdateScoreBoard({
      topPlayers: await this.getTopPlayers(),
      boardView: {
        classPlayer11: this.is11PlayerOnTheBoard() ? "showTblRow" : "hide",
        classDeleteBtn: !this.storage.isItemInStorageEmpty("username")
          ? "show"
          : "hide",
      },
    });
  };

  setScoreView = () => {
    this.dispatchUpdateScoreBoard({
      ...this.scoreState,
      boardView: {
        classPlayer11: this.is11PlayerOnTheBoard() ? "showTblRow" : "hide",
        classDeleteBtn: !this.storage.isItemInStorageEmpty("username")
          ? "show"
          : "hide",
      },
    });
  };
  changeClassesOnSaveButtonClick = (state) => {
    return {
      ...state,
      isSaveButtonDisabled: true,
      messageColor: "messageGreen",
      hide: "hide",
    };
  };

  setSaveStatus = async (username, score) => {
    await this.saveUserScore(username, score);
  };

  saveScoreState = async (state, username, score) => {
    return [
      this.changeClassesOnSaveButtonClick(state),
      await this.setSaveStatus(username, score),
    ];
  };
}
