/**
 * @author Programerika
 */
import { WebGejmikaModel } from "../model/WebGejmikaModel";
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

  saveUserScore = async (score) => {
    const username = this.scoreState.showScoreView.username;
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
    let newShowScoreView = { ...this.scoreState.showScoreView };
    if (username.length === 0) {
      newShowScoreView = {
        message: "Please enter an username",
        isSaveButtonDisabled: true,
        isUsernameValid: "",
        toolTipStatus: "toolTipVisible",
        messageStatus: "visible",
        messageColor: "messageWhite",
        username: username,
      };
    }

    let regex = new RegExp("[a-zA-Z0-9]{4,6}[0-9]{2}$");
    if (regex.test(username) && this.storage.isItemInStorageEmpty("username")) {
      if (
        (await this.webGejmikaService.checkIfUsernameExists(username)) === true
      ) {
        newShowScoreView = {
          message: "*Username already exists",
          isSaveButtonDisabled: true,
          isUsernameValid: "isNotValidInput",
          messageColor: "messageRed",
          username: username,
        };
      } else {
        newShowScoreView = {
          message: "*Username is correct",
          isSaveButtonDisabled: false,
          isUsernameValid: "isValidInput",
          messageColor: "messageGreen",
          username: username,
        };
      }
    } else {
      newShowScoreView = {
        message: "*Your username is not in valid format",
        isSaveButtonDisabled: true,
        isUsernameValid: "isNotValidInput",
        messageColor: "messageRed",
        username: username,
      };
    }
    this.dispatchUpdateScoreBoard({
      ...this.scoreState,
      showScoreView: newShowScoreView,
    });
  };

  checkStorageAndScore = (score) => {
    if (this.storage.isItemInStorageEmpty("username") && score > 0) {
      return true;
    } else {
      return false;
    }
  };

  initializeView = (score) => {
    this.dispatchUpdateScoreBoard({
      ...this.scoreState,
      conffetiView: this.confettiPerScore(score),
      showScoreView: {
        ...this.scoreState.showScoreView,
        toolTipStatus: "toolTipHidden",
        isUsernameValid: "",
        saveButtonStatus: this.checkStorageAndScore(score) ? "show" : "hide",
        message: "Please enter an username",
        messageStatus: this.checkStorageAndScore(score) ? "visible" : "hidden",
        messageColor: "messageWhite",
        scoreMsg: this.calculateScoreMsg(score),
      },
    });
  };

  hideToolTip = () => {
    this.dispatchUpdateScoreBoard({
      ...this.scoreState,
      showScoreView: {
        ...this.scoreState.showScoreView,
        toolTipStatus: "toolTipHidden",
      },
    });
  };

  showToolTip = () => {
    this.dispatchUpdateScoreBoard({
      ...this.scoreState,
      showScoreView: {
        ...this.scoreState.showScoreView,
        toolTipStatus: "toolTipVisible",
      },
    });
  };

  // showSaveButton = () => {
  //   this.dispatchUpdateScoreBoard({
  //     ...this.scoreState,
  //     showScoreView: {
  //       ...this.scoreState.showScoreView,
  //       saveButtonStatus: "show",
  //     },
  //   });
  // };

  // hideSaveButton = () => {
  //   this.dispatchUpdateScoreBoard({
  //     ...this.scoreState,
  //     showScoreView: {
  //       ...this.scoreState.showScoreView,
  //       saveButtonStatus: "hide",
  //     },
  //   });
  // };

  // hide = (score) => {
  //   if (!this.storage.isItemInStorageEmpty("username") && score >= 0) {
  //     console.log("Hide Save Button");
  //     return "hide";
  //   } else {
  //     console.log("Show Save BUTTON");
  //     return "show";
  //   }
  // };

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

  isUserInTopTen = (topPlayers) => {
    let isUsernameInTopTen = false;
    topPlayers.forEach((person) => {
      if (person.username === this.storage.getItem("username")) {
        isUsernameInTopTen = true;
      }
    });
    return isUsernameInTopTen;
  };

  highlightCurrentUser = (topPlayers) => {
    return topPlayers.map((person, i) => {
      person.rowColor =
        person.username === this.storage.getItem("username")
          ? "currentPlayer"
          : "";
      return person;
    });
  };

  isLocalStorageEmpty = () => {
    return this.storage.getItem("username") === null;
  };

  is11PlayerOnTheBoard = (topPlayers) => {
    return (
      !this.isUserInTopTen(topPlayers) &&
      !this.storage.isItemInStorageEmpty("username")
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
          this.initializeScoreBoardView();
          //    this.initializeView(score);
        });
    }
  };

  initializeScoreBoardView = async () => {
    const topPlayers = await this.getTopPlayers();
    this.dispatchUpdateScoreBoard({
      ...this.scoreState,
      topPlayers: {
        topPlayers: this.highlightCurrentUser(topPlayers.topPlayers),
        currentPlayer: topPlayers.currentPlayer,
      },
      boardView: {
        classPlayer11: this.is11PlayerOnTheBoard(topPlayers.topPlayers)
          ? "showTblRow"
          : "hide",
        classDeleteBtn: !this.storage.isItemInStorageEmpty("username")
          ? "show"
          : "hide",
      },
    });
  };

  deleteButtonClicked = async (viewModel) => {
    if (window.confirm("Are you sure you want to delete your username?")) {
      this.deleteUsername().then(() => {
        viewModel.startGame();
      });
      console.log("Username deleted.");
    } else {
      console.log("Username not deleted.");
    }
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

  saveScoreState = async (score) => {
    // return [
    //   this.changeClassesOnSaveButtonClick(state),
    //   await this.setSaveStatus(username, score),
    // ];
    this.dispatchUpdateScoreBoard({
      ...this.scoreState,
      showScoreView: {
        ...this.scoreState.showScoreView,
        isSaveButtonDisabled: true,
        saveButtonStatus: "hide",
        messageColor: "messageGreen",
        saveStatus: this.saveUserScore(score),
      },
    });
  };
}
