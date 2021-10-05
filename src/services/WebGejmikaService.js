export class WebGejmikaService {
  constructor() {}

  checkIfUsernameExists = async (username) => {
    const response = await fetch(
      "http://localhost:8080/api/v1/player-scores/" + username,
      {
        method: "GET",
      }
    );

    const stat = await response.status;

    if (stat === 200) {
      return 200;
    } else {
      return 400;
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

      const resp = await response.status;
      if (resp === 201) {
        return "Score has been successfully saved";
      } else {
        return "Something went wrong";
      }
    }
  };
}
