/**
 * @author Programerika
 */
import allActions from "../redux/actions";
import { WebGejmikaService } from "../services/WebGejmikaService";
import { StorageService } from "../services/StorageService";
import scoreBoardStyles from "../components/ScoreBoard.module.css";

export class ScoreBoardViewModel {
  #dispatcher;
  #scoreState;
  #webGejmikaService;
  #storage;
  constructor(scoreState, dispatcher) {
    this.#dispatcher = dispatcher;
    this.#scoreState = scoreState;
    this.#webGejmikaService = new WebGejmikaService();
    this.#storage = new StorageService();
  }

  #dispatchUpdateScoreBoard = (newStateBoard) => {
    this.#dispatcher(allActions.inputActions.updateScoreBoard(newStateBoard));
  };

  initializeScoreBoardView = async () => {
    let topPlayers = {
      topPlayers: [],
      currentPlayer: {
        username: this.#storage.getItem("username"),
        score: null,
      },
    };
    try {
      topPlayers = await this.#getTopPlayers();
    } catch (error) {
      console.log(error);
    }

    this.#dispatchUpdateScoreBoard({
      ...this.#scoreState,
      topPlayers: {
        topPlayers: this.#highlightCurrentUser(topPlayers.topPlayers),
        currentPlayer: topPlayers.currentPlayer,
      },
      boardView: {
        isPlayerRegistered: this.#isUsernameRegistered(),
        showPlayerBelowTopList:
          this.#isUsernameRegistered() &&
          !this.#isUserInTopList(topPlayers.topPlayers),
      },
    });
  };

  #isUsernameRegistered = () => {
    return !this.#storage.isItemInStorageEmpty("username");
  };

  #getTopPlayers = async () => {
    let topPlayers = [];
    let currentPlayer = [];

    try {
      topPlayers = await this.#webGejmikaService.getTopPlayers();
    } catch (error) {
      console.log(error.message);
    }

    try {
      currentPlayer = await this.#webGejmikaService.getPlayerByUsername(
        this.#storage.getItem("username")
      );
    } catch (error) {
      console.log(error.message);
    }

    return {
      topPlayers: [...topPlayers],
      currentPlayer: { ...currentPlayer },
    };
  };

  #highlightCurrentUser = (topPlayers) => {
    const playerUsername = this.#storage.getItem("username");
    return topPlayers.map((person, i) => {
      person.currentUserClass =
        person.username === playerUsername
          ? scoreBoardStyles.currentPlayerUsername
          : "";
      return person;
    });
  };

  #isUserInTopList = (topPlayers) => {
    const playerUsername = this.#storage.getItem("username");
    return (
      typeof topPlayers.find((person) => person.username === playerUsername) !==
      "undefined"
    );
  };

  deleteButtonClicked = async () => {
    if (window.confirm("Are you sure you want to delete your username?")) {
      this.#deleteUsername().then(() => {
        this.initializeScoreBoardView();
      });
    } else {
      return;
    }
  };

  #deleteUsername = async () => {
    if (this.#storage.getItem("uid") !== null) {
      try {
        const resp = await this.#webGejmikaService.deleteScore(
          this.#storage.getItem("uid")
        );
        this.#storage.removeItem("uid");
        this.#storage.removeItem("username");
      } catch (err) {
        window.alert(err.message);
      }
    } else {
      return;
    }
  };
}
