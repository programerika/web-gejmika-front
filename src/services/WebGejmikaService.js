/**
 *  @author Programerika
 */

import { LocalStorageService } from "./LocalStorageService";

export class WebGejmikaService {
  constructor() {
    this.storage = new LocalStorageService();
  }

  /**
   *  @param {String} username - passing username we want to check
   *  @returns {Boolean} true if username already exists
   */

  checkIfUsernameExists = async (username) => {
    const response = await fetch(
      "http://localhost:8080/api/v1/player-scores/" + username,
      {
        method: "GET",
      }
    );

    const status = await response.status;

    if (status === 200) {
      return true;
    } else {
      return false;
    }
  };

  /**
   *  @param {String} username - passing username we want to save
   *  @param {Number} score - passing score of current player
   *  @returns {String} status message
   *
   *  This method sends post request for saving score if username doesnt't exist
   *  in localstorage. If username already exists in localstorage, then
   *  function will make a post request to add-score, and current player score will be
   *  added to total score of player.
   *
   */

  saveScore = async (username, score) => {
    if (this.storage.getItemFromLocalStorage("username") == null) {
      this.storage.setItemToLocalStorage("username", username);
      const response = await fetch(
        "http://localhost:8080/api/v1/player-scores",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.storage.getItemFromLocalStorage("username"),
            score: score,
          }),
        }
      );

      const resp = await response;
      resp
        .json()
        .then((uid) => this.storage.setItemToLocalStorage("uid", uid.id));
      if (resp.status === 201) {
        return "Score has been successfully saved";
      } else {
        return "Something went wrong";
      }
    } else {
      const response = await fetch(
        "http://localhost:8080/api/v1/player-scores/" +
          this.storage.getItemFromLocalStorage("username") +
          "/add-score",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: score,
        }
      );

      const resp = await response;
      if (resp.status === 204) {
        return "Score has been successfully added";
      } else {
        return "Something went wrong";
      }
    }
  };

  /**
   *  @returns {Array} - array of top players
   */

  getTopPlayers = async () => {
    const response = await fetch("http://localhost:8080/api/v1/top-score");
    const resp = await response.json();
    console.log("From method: " + JSON.stringify(resp));
    console.log(response.status);
    if (response.status == 200) {
      return resp;
    } else {
      return [];
    }
  };

  /**
   *  @returns {String} - message if current player deleted his score
   */

  deleteScore = async () => {
    if (this.storage.getItemFromLocalStorage("uid") != null) {
      const response = await fetch(
        "http://localhost:8080/api/v1/player-scores/" +
          this.storage.getItemFromLocalStorage("uid"),
        {
          method: "DELETE",
        }
      );

      const status = await response.status;

      if (status === 204) {
        this.storage.removeFromLocalStorage("username");
        this.storage.removeFromLocalStorage("uid");
        return "User has been successfully deleted";
      } else {
        return "Something went wrong";
      }
    }
  };
}
