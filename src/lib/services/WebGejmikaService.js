/**
 *  @author Programerika
 */

export class WebGejmikaService {
  /**
   *  @param {String} username - passing username we want to check
   *  @returns {Boolean} true if username already exists
   */

  getPlayerByUsername = async (username) => {
    const response = await fetch(`/api/v1/player-scores/${username}`, {
      method: "GET",
    });

    if (response.ok) {
      const resp = await response.json();
      return resp;
    } else {
      if (response.status === 404) {
        return undefined;
      } else {
        throw new Error(response.statusText);
      }
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

    if (response.ok) {
      const resp = await response.json();
      return resp.id;
    } else {
      if (
        response.status === 400 ||
        response.status === 406 ||
        response.status === 409
      ) {
        const resp = await response.json();
        throw new Error(resp.detail);
      } else {
        throw new Error(response.statusText);
      }
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

    if (!response.ok) {
      if (response.status === 404 || response.status === 406) {
        const resp = await response.json();
        throw new Error(resp.detail);
      } else {
        throw new Error(response.statusText);
      }
    }
  };

  /**
   *  @returns {Array} - array of top players
   */

  getTopPlayers = async () => {
    const response = await fetch("/api/v1/top-score");

    if (response.ok) {
      const resp = await response.json();
      return resp;
    } else {
      if (response.status === 400) {
        const resp = await response.json();
        throw Error(resp.detail);
      } else {
        throw Error(response.statusText);
      }
    }
  };

  /**
   *  @returns {String} - message if current player deleted his score
   */

  deleteScore = async (uid) => {
    const response = await fetch(`/api/v1/player-scores/${uid}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      if (response.status === 400) {
        const resp = await response.json();
        throw new Error(resp.detail);
      } else {
        throw new Error(response.statusText);
      }
    }
  };
}
