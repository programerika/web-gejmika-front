import attempts from "./attempts";
import secret_code from "./secret_code";

const new_game = () => {
  attempts.length = 0;
  secret_code();
};

export default new_game;
