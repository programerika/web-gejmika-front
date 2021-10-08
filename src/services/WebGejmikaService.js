/**
 *  @author Programerika
 */

import { StorageService } from "./StorageService";

export class WebGejmikaService {
  constructor() {
    this.storage = new StorageService();
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
    if (this.storage.getItem("username") == null) {
      this.storage.setItem("username", username);
      const response = await fetch(
        "http://localhost:8080/api/v1/player-scores",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.storage.getItem("username"),
            score: score,
          }),
        }
      );

      const resp = await response;
      resp
        .json()
        .then((uid) => this.storage.setItem("uid", uid.id));
      if (resp.status === 201) {
        return "Score has been successfully saved";
      } else {
        return "Something went wrong";
      }
    } else {
      const response = await fetch(
        "http://localhost:8080/api/v1/player-scores/" +
          this.storage.getItem("username") +
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
    if (this.storage.getItem("uid") != null) {
      const response = await fetch(
        "http://localhost:8080/api/v1/player-scores/" +
          this.storage.getItem("uid"),
        {
          method: "DELETE",
        }
      );

      const status = await response.status;

      if (status === 204) {
        this.storage.removeItem("username");
        this.storage.removeItem("uid");
        return "User has been successfully deleted";
      } else {
        return "Something went wrong";
      }
    }
  };
}
