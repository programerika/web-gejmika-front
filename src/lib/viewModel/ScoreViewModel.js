/**
 * @author Programerika
 */
import allActions from "../redux/actions";
import { StorageService } from "../services/StorageService";
import { WebGejmikaService } from "../services/WebGejmikaService";
import globalStyles from "../global.module.css";
import showScoreStyles from "../components/ShowScore.module.css";
import scoreBoardStyles from "../components/ScoreBoard.module.css";

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

  isUserInTopList = (topPlayers) => {
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
      person.currentUserClass =
        person.username === this.storage.getItem("username")
          ? scoreBoardStyles.currentPlayerUsername
          : "";
      return person;
    });
  };

  isUsernameRegistered = () => {
    return !this.storage.isItemInStorageEmpty("username");
  }

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
    var topPlayers = {
      topPlayers: [
      ],
      currentPlayer: {username: localStorage.getItem("username"), score: null},
    };
    try {
      topPlayers = await this.getTopPlayers();
    } catch (error) {
      //TODO implementirati standardan error handling u WebGejmikaService svim remote pozivima
      //vracati odgovarajuci rezultat
      console.log(error);
    }
    
    this.dispatchUpdateScoreBoard({
      ...this.scoreState,
      topPlayers: {
        topPlayers: this.highlightCurrentUser(topPlayers.topPlayers),
        currentPlayer: topPlayers.currentPlayer,
      },
      boardView: {
        isPlayerRegistered: this.isUsernameRegistered(),
        showPlayerBelowTopList: this.isUsernameRegistered() && !this.isUserInTopList(topPlayers.topPlayers) 
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
}
