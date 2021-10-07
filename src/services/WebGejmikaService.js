export class WebGejmikaService {
  constructor() {}

  checkIfUsernameExists = async (username) => {
    const response = await fetch(
      "http://localhost:8080/api/v1/player-scores/" + username,
      {
        method: "GET",
      }
    );

    const status = await response.status;

    if (status === 200) {
      return 200;
    } else {
      return 404;
    }
  };

  saveScore = async (username, score) => {
    if (localStorage.getItem("username") == null) {
      localStorage.setItem("username", username);
      console.log("save called");
      const response = await fetch(
        "http://localhost:8080/api/v1/player-scores",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: localStorage.getItem("username"),
            score: score,
          }),
        }
      );

      const resp = await response;
      resp.json().then((uid) => localStorage.setItem("uid", uid.id));
      if (resp.status === 201) {
        return "Score has been successfully saved";
      } else {
        return "Something went wrong";
      }
    } else {
      const response = await fetch(
        "http://localhost:8080/api/v1/player-scores/" +
          localStorage.getItem("username") +
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

    // const data = await response.json();
    // setPeople(data);
    // console.log(JSON.stringify(data));
  };
}
