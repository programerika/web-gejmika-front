/**
 *  @author Programerika
 */

export class WebGejmikaService {
  /**
   *  @param {String} username - passing username we want to check
   *  @returns {Boolean} true if username already exists
   */

  checkIfUsernameExists = async (username) => {
    const response = await fetch(`/api/v1/player-scores/${username}`, {
      method: "GET",
    });

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
   *  @returns {Number} status code
   *
   *  This method sends post request for saving score if username doesnt't exist
   *  in localstorage.
   *
   */

  saveScore = async (username, score) => {
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

    const resp = await response;
    if (resp.status === 201) {
      return resp;
    } else {
      return null;
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

    const resp = await response;
    if (resp.status === 204) {
      return "Score has been successfully added";
    } else {
      return "Something went wrong";
    }
  };

  /**
   *  @returns {Array} - array of top players
   */

  getTopPlayers = async () => {
    const response = await fetch("/api/v1/top-score");
    const resp = await response.json();
    console.log("From method: " + JSON.stringify(resp));
    console.log(response.status);
    if (response.status === 200) {
      return resp;
    } else {
      return [];
    }
  };

  /**
   *  @returns {String} - message if current player deleted his score
   */

  deleteScore = async (uid) => {
    const response = await fetch(`/api/v1/player-scores/${uid}`, {
      method: "DELETE",
    });
    return await response.status;
  };

  getCurrentPlayer = async (username) => {
    const response = await fetch(`/api/v1/player-scores/${username}`, {
      method: "GET",
    });

    const res = await response.json();
    console.log("LOG RES: " + JSON.stringify(res));
    if (response.status === 200) {
      return res;
    } else {
      return {};
    }
  };
}
