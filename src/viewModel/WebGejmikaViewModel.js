/**
 * @author Programerika
 */
import allActions from "../redux/actions";
import { WebGejmikaModel } from "../model/WebGejmikaModel";
import { WebGejmikaService } from "../services/WebGejmikaService";
import { StorageService } from "../services/StorageService";

export class WebGejmikaViewModel {
  constructor(modelState, viewState, scoreState, dispatcher) {
    this.modelState = modelState;
    this.viewState = viewState;
    this.scoreState = scoreState;
    this.dispatcher = dispatcher;
    this.webGejmikaModel = new WebGejmikaModel(modelState);
    this.WebGejmikaService = new WebGejmikaService();
    this.storage = new StorageService();
  }

  /**
   *
   * @param {Object} newStateModel
   * @param {Object} newStateView
   * This method dispatches model and view state updates to reducers
   */

  dispatchUpdate = (newStateModel, newStateView) => {
    console.log("FROM DISPATCH: " + JSON.stringify(newStateView));
    this.dispatcher(
      allActions.inputActions.update(newStateModel, newStateView)
    );
  };

  dispatchUpdateScoreBoard = (newStateBoard) => {
    this.dispatcher(allActions.inputActions.updateScoreBoard(newStateBoard));
  };

  /**
   * Methods for each button icon clicked BEGIN
   *
   * All methods add the appropriate picture link to combInProgress and dispatch view state update
   * */

  heartButtonClicked() {
    if (this.viewState.combInProgress.length >= 4) {
      return;
    }
    const newStateView = {
      ...this.viewState,
      combInProgress: [...this.viewState.combInProgress, "/icons/heart.png"],
    };

    this.dispatchUpdate({ ...this.modelState }, newStateView);
  }

  starButtonClicked() {
    if (this.viewState.combInProgress.length >= 4) {
      return;
    }
    const newStateView = {
      ...this.viewState,
      combInProgress: [...this.viewState.combInProgress, "/icons/star.png"],
    };

    this.dispatchUpdate({ ...this.modelState }, newStateView);
  }

  diamondButtonClicked() {
    if (this.viewState.combInProgress.length >= 4) {
      return;
    }
    const newStateView = {
      ...this.viewState,
      combInProgress: [...this.viewState.combInProgress, "/icons/diamond.png"],
    };

    this.dispatchUpdate({ ...this.modelState }, newStateView);
  }

  spadesButtonClicked() {
    if (this.viewState.combInProgress.length >= 4) {
      return;
    }
    const newStateView = {
      ...this.viewState,
      combInProgress: [
        ...this.viewState.combInProgress,
        "/icons/symbol-of-spades.png",
      ],
    };

    this.dispatchUpdate({ ...this.modelState }, newStateView);
  }

  trafficLightButtonClicked() {
    if (this.viewState.combInProgress.length >= 4) {
      return;
    }
    const newStateView = {
      ...this.viewState,
      combInProgress: [
        ...this.viewState.combInProgress,
        "/icons/traffic-light.png",
      ],
    };

    this.dispatchUpdate({ ...this.modelState }, newStateView);
  }

  clubsButtonClicked() {
    if (this.viewState.combInProgress.length >= 4) {
      return;
    }
    const newStateView = {
      ...this.viewState,
      combInProgress: [...this.viewState.combInProgress, "/icons/clubs.png"],
    };

    this.dispatchUpdate({ ...this.modelState }, newStateView);
  }

  /**
   * Methods for each button icon clicked END
   * */

  /**
   *
   * This method updates view state by adding new attemptView, and setting viewOutcome
   * Gets new model state from webGejmikaModel and calls dispatchUpdate function
   */

  async inputConfirm() {
    if (this.viewState.combInProgress.length !== 4) {
      return;
    } else {
      const newStateModel = this.webGejmikaModel.compareCode(
        this.iconToComb(this.viewState.combInProgress)
      );

      console.log("Input confirm: " + JSON.stringify(newStateModel));
      let gameOver = false;
      if (newStateModel.score != -1) {
        gameOver = true;
      }

      const newStateView = {
        ...this.viewState,

        attemptsView: [
          ...this.viewState.attemptsView,
          {
            attemptViewId: this.viewState.id + 1,
            attemptViewComb: this.viewState.combInProgress,
            attemptViewOutcome: this.outcomeToColor(
              newStateModel.attempts[newStateModel.attempts.length - 1]
                .attemptOutcome
            ),
          },
        ],
        combInProgress: [],
        id: this.viewState.id + 1,
        gameOver: gameOver,
      };

      // console.log("PRE IF GAME OVER " + gameOver);

      this.dispatchUpdate(newStateModel, newStateView);

      if (gameOver) {
        console.log("USAO U IF GAME OVER " + this.viewState.gameOver);
        this.saveScore(newStateModel.score);
      } else {
        console.log("USAO U ELSE GAME OVER");
        //  this.dispatchUpdate(newStateModel, newStateView);
      }
    }
  }

  /**
   * This method deletes last element in combInProgress array and calls dispatchUpdate function
   */

  inputDeleteLast() {
    if (this.viewState.combInProgress.length > 0) {
      let combInProg = [...this.viewState.combInProgress];
      combInProg.pop();

      this.dispatchUpdate(
        {
          ...this.modelState,
        },
        {
          ...this.viewState,
          combInProgress: combInProg,
        }
      );
    }
  }

  /**
   * This method sets both model and view state to default parameters and calls dispatchUpdate function
   */

  async startGame() {
    const newStateModel = this.webGejmikaModel.secretCode();
    this.dispatchUpdate(newStateModel, {
      combInProgress: [],
      attemptsView: [],
      correctView: this.combToIcon(newStateModel.secretComb),
      id: -1,
      gameOver: false,
    });
    this.dispatchUpdateScoreBoard({
      topPlayers: await this.getTopPlayers(),
    });
  }

  /**
   *
   * @param {Array} comb
   * @returns {Array} icons
   * This method takes in array of combination attempt letters and transforms it into icon picture links for view state
   */

  combToIcon = (comb) => {
    var icons = ["", "", "", ""];
    for (let index = 0; index < icons.length; index++) {
      switch (comb[index]) {
        case "K":
          icons[index] = "/icons/diamond.png";
          break;
        case "H":
          icons[index] = "/icons/heart.png";
          break;
        case "P":
          icons[index] = "/icons/symbol-of-spades.png";
          break;
        case "T":
          icons[index] = "/icons/clubs.png";
          break;
        case "L":
          icons[index] = "/icons/star.png";
          break;
        case "S":
          icons[index] = "/icons/traffic-light.png";
          break;
        default:
          icons[index] = "/icons/circle.png";
          break;
      }
    }
    return icons;
  };

  /**
   *
   * @param {Array} icons
   * @returns {Array} comb
   * This method takes in array of icon picture links and transforms it into combination attempt letters for model state
   */

  iconToComb = (icons) => {
    var comb = ["", "", "", ""];
    for (let index = 0; index < comb.length; index++) {
      switch (icons[index]) {
        case "/icons/diamond.png":
          comb[index] = "K";
          break;
        case "/icons/heart.png":
          comb[index] = "H";
          break;
        case "/icons/symbol-of-spades.png":
          comb[index] = "P";
          break;
        case "/icons/clubs.png":
          comb[index] = "T";
          break;
        case "/icons/star.png":
          comb[index] = "L";
          break;
        case "/icons/traffic-light.png":
          comb[index] = "S";
          break;
        default:
          comb[index] = "";
          break;
      }
    }
    return comb;
  };

  /**
   *
   * @param {Array} outcome
   * @returns {Array} colors
   * This method takes in array of numbers [0-2] and transforms is into array of color names for view state
   * 0 - gray
   * 1 - yellow
   * 2 - green
   */

  outcomeToColor = (outcome) => {
    let colors = [];
    let out = [...outcome];
    out.sort().reverse();
    for (let index = 0; index < out.length; index++) {
      switch (out[index]) {
        case 2:
          colors[index] = "green";
          break;
        case 1:
          colors[index] = "yellow";
          break;
        case 0:
          colors[index] = "gray";
          break;
        default:
          break;
      }
    }

    return colors;
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
    const topPlayers = await this.WebGejmikaService.getTopPlayers();
    const currentPlayer = await this.WebGejmikaService.getCurrentPlayer(
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
      if (person.username == this.storage.getItem("username")) {
        isUsernameInTopTen = true;
      }
    });
    return isUsernameInTopTen;
  };

  highlightCurrentUser = (username) => {
    const isEqual = username == this.storage.getItem("username");
    return {
      rowColor: isEqual ? "currentPlayer" : "",
    };
  };

  isLocalStorageEmpty = () => {
    return this.storage.getItem("username") == null;
  };

  is11PlayerOnTheBoard = () => {
    return !this.isUserInTopTen() && !this.isLocalStorageEmpty();
  };

  deleteUsername = async () => {
    const message = await this.WebGejmikaService.deleteScore();
    return {
      message: message,
    };
  };

  saveScore = async (score) => {
    console.log("SAVE SCORE " + score + " " + this.viewState.gameOver);
    if (score == 0) return;
    else {
      this.WebGejmikaService.saveScore(
        this.storage.getItem("username"),
        score
      ).then((msg) => {
        console.log("U THEN: " + msg + " " + this.viewState.gameOver);
        this.refreshScoreBoard();
      });
    }
  };

  isGameOver = async (score) => {
    console.log("IS GAME OVER " + score);
    if (score != -1) {
      console.log("USLA U IF SCORE != -1!!!!");
      this.saveScore(score).then((msg) => {
        console.log(msg);
        return true;
      });
    } else return false;
  };
}
