/**
 *  @author Programerika
 */

export class WebGejmikaService {
  networkErrorMsg;
  serverErrorMsg;

  constructor() {
    this.networkErrorMsg = "Network error, try again later!";
    this.serverErrorMsg = "Server error, try again!";
  }

  /**
   *  @param {String} username - passing username we want to check
   *  @returns {Boolean} true if username already exists
   */

  getPlayerByUsername = async (username) => {
    try {
      const response = await fetch(`/api/v1/player-scores/${username}`, {
        method: "GET",
      });
      if (response.ok) {
        const resp = await response.json();
        return resp;
      } else {
        if (response.status == 404) {
          throw new Error("Player doesn't exist");
        } else {
          throw new Error(this.serverErrorMsg);
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  /**
   *  @param {String} username - passing username we want to save
   *  @param {Number} score - passing score of current player
   *  @returns {Number} status code
   *
   *  This method sends post request for saving score if username doesnt't exist
   *  in localstorage.
   *
   */

  saveScore = async (username, score) => {
    try {
      const response = await fetch("/api/v1/player-scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          score: score,
        }),
      });

      if (response.ok) {
        const resp = await response.json();
        return resp.id;
      } else {
        if (
          response.status == 400 ||
          response.status == 406 ||
          response.status == 409
        ) {
          const resp = await response.json();
          throw new Error(resp.detail);
        } else {
          throw new Error(this.serverErrorMsg);
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  /**
   *
   * @param {String} username
   * @param {Integer} score
   * @returns message if adding score is successful or not
   *
   *  Function sends a post request to add-score and current player score will be
   *  added to total score of player.
   */

  addScore = async (username, score) => {
    try {
      const response = await fetch(
        `/api/v1/player-scores/${username}/add-score`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: score,
        }
      );

      if (response.ok) {
        return;
      } else {
        if (response.status == 404 || response.status == 406) {
          const resp = await response.json();
          throw new Error(resp.detail);
        } else {
          throw new Error(this.serverErrorMsg);
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  /**
   *  @returns {Array} - array of top players
   */

  getTopPlayers = async () => {
    try {
      const response = await fetch("/api/v1/top-score");

      if (response.ok) {
        const resp = await response.json();
        return resp;
      } else {
        if (response.status == 400) {
          const resp = await response.json();
          throw new Error(resp.detail);
        } else {
          throw new Error(this.serverErrorMsg);
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  /**
   *  @returns {String} - message if current player deleted his score
   */

  deleteScore = async (uid) => {
    try {
      const response = await fetch(`/api/v1/player-scores/${uid}`, {
        method: "DELETE",
      });

      if (response.ok) {
        return;
      } else {
        const resp = await response.json();
        if (response.status == 400) {
          throw new Error(resp.detail);
        } else {
          throw new Error(this.serverErrorMsg);
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
