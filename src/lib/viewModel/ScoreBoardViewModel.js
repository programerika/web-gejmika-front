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
  #viewModel;
  #storage;  
  constructor(scoreState, dispatcher) {
    this.#dispatcher = dispatcher;
    this.#scoreState = scoreState;
    this.#webGejmikaService = new WebGejmikaService();
    this.#viewModel = null;
    this.#storage = new StorageService();
  }

  setViewModel = (viewModel) => {
    this.#viewModel = viewModel;
  }

  #dispatchUpdateScoreBoard = (newStateBoard) => {
    this.#dispatcher(allActions.inputActions.updateScoreBoard(newStateBoard));
  };

  initializeScoreBoardView = async () => {
    let topPlayers = {
      topPlayers: [
      ],
      currentPlayer: { username: this.#storage.getItem("username"), score: null },
    };
    try {
      topPlayers = await this.#getTopPlayers();
    } catch (error) {
      //TODO implementirati standardan error handling u WebGejmikaService svim remote pozivima
      //vracati odgovarajuci rezultat
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
        showPlayerBelowTopList: this.#isUsernameRegistered() && !this.#isUserInTopList(topPlayers.topPlayers)
      },
    });
  };

  #isUsernameRegistered = () => {
    return !this.#storage.isItemInStorageEmpty("username");
  }

  #getTopPlayers = async () => {
    const topPlayers = await this.#webGejmikaService.getTopPlayers();

    const currentPlayer = await this.#webGejmikaService.getCurrentPlayer(
      this.#storage.getItem("username")
    );

    return {
      topPlayers: [...topPlayers],
      currentPlayer: { ...currentPlayer },
    };
  };

  #highlightCurrentUser = (topPlayers) => {
    return topPlayers.map((person, i) => {
      person.currentUserClass =
        person.username === this.#storage.getItem("username")
          ? scoreBoardStyles.currentPlayerUsername
          : "";
      return person;
    });
  };

  #isUserInTopList = (topPlayers) => {
    let isUsernameInTopTen = false;
    topPlayers.forEach((person) => {
      if (person.username === this.#storage.getItem("username")) {
        isUsernameInTopTen = true;
      }
    });
    return isUsernameInTopTen;
  };

  deleteButtonClicked = async () => {
    if (window.confirm("Are you sure you want to delete your username?")) {
      this.#deleteUsername().then(() => {
        this.#viewModel.startGame();
      });
      console.log("Username deleted.");
    } else {
      console.log("Username not deleted.");
    }
  };

  #deleteUsername = async () => {
    if (this.#storage.getItem("uid") !== null) {
      const resp = await this.#webGejmikaService.deleteScore(
        this.#storage.getItem("uid")
      );
      console.log("STATUS - " + resp);
      if (resp === 204) {
        this.#storage.removeItem("uid");
        this.#storage.removeItem("username");
        return "User has been successfully deleted";
      } else {
        return "Something went wrong";
      }
    }
  };


}
