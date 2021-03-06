/**
 * @author Programerika
 */
import allActions from "../redux/actions";
import { WebGejmikaService } from "../services/WebGejmikaService";
import { StorageService } from "../services/StorageService";
import scoreBoardStyles from "../components/ScoreBoard.module.css";
import notifyError from "../services/ErrorNotificationService";

export class ScoreBoardViewModel {
  #dispatcher;
  #webGejmikaService;
  #storage;
  constructor(dispatcher) {
    this.#dispatcher = dispatcher;
    this.#webGejmikaService = new WebGejmikaService();
    this.#storage = new StorageService();
  }

  #dispatchUpdateScoreBoard = (newStateBoard) => {
    this.#dispatcher(allActions.updateScoreBoard(newStateBoard));
  };

  initializeScoreBoardView = async () => {
    try {
      const players = await this.#getTopPlayers();
      this.#dispatchUpdateScoreBoard({
        topPlayers: {
          topPlayers: this.#highlightCurrentPlayer(players.topPlayers),
          currentPlayer: players.currentPlayer,
        },
        boardView: {
          showDeletePlayer: this.#isPlayerRegistered(),
          showPlayerBelowTopList:
            this.#isPlayerRegistered() &&
            !this.#isPlayerInTopList(players.topPlayers),
        },
        isBoardLoading: false,
        errorMsg: null,
      });
    } catch (error) {
      notifyError(error.message);
      this.#dispatchUpdateScoreBoard({
        topPlayers: {
          topPlayers: [],
          currentPlayer: {
            username: this.#currentPlayerUsername(),
            score: null,
          },
        },
        boardView: {
          showDeletePlayer: false,
          showPlayerBelowTopList: this.#isPlayerRegistered(),
        },
        isBoardLoading: false,
        errorMsg: "Sorry, we are not able to get top players at the moment!",
      });
    }
  };

  #isPlayerRegistered = () => {
    return !this.#storage.isItemInStorageEmpty("username");
  };

  #getTopPlayers = async () => {
    const topPlayers = await this.#webGejmikaService.getTopPlayers();
    let currentPlayer = {};
    if (this.#isPlayerRegistered()) {
      currentPlayer = await this.#webGejmikaService.getPlayerByUsername(
        this.#currentPlayerUsername()
      );
      if (currentPlayer === undefined) {
        this.#removePlayerFromLocalStorage();
      }
    }

    return {
      topPlayers: [...topPlayers],
      currentPlayer: { ...currentPlayer },
    };
  };

  #removePlayerFromLocalStorage = () => {
    this.#storage.removeItem("username");
    this.#storage.removeItem("uid");
  };

  #highlightCurrentPlayer = (topPlayers) => {
    const playerUsername = this.#currentPlayerUsername();
    return topPlayers.map((player) => {
      player.currentUserClass =
        player.username === playerUsername
          ? scoreBoardStyles.currentPlayerUsername
          : "";
      return player;
    });
  };

  #isPlayerInTopList = (topPlayers) => {
    const playerUsername = this.#currentPlayerUsername();
    return (
      typeof topPlayers.find((player) => player.username === playerUsername) !==
      "undefined"
    );
  };

  deletePlayer = async () => {
    if (this.#storage.getItem("uid") === null) {
      throw new Error(
        "Illegal state: not expected to call deletePlayer without uid in local storage!"
      );
    }
    if (!window.confirm("Are you sure you want to delete your username?"))
      return;

    try {
      await this.#webGejmikaService.deleteScore(this.#storage.getItem("uid"));
      this.#removePlayerFromLocalStorage();
      this.initializeScoreBoardView();
    } catch (error) {
      notifyError(
        error,
        true,
        "Sorry we are not able to delete your username at the moment!",
        true
      );
    }
  };

  #currentPlayerUsername() {
    return this.#storage.getItem("username");
  }
}
