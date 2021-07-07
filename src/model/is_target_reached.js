import attempts from "./attempts";
import code_length from "./code_length";

const is_target_reached = () => {
  if (attempts.length == 0) return false;
  var last_attp = attempts[attempts.length - 1];
  console.log(last_attp.attempt_outcome);
  var check = true;
  last_attp.attempt_outcome.forEach((el) => {
    if (el != "2") {
      check = false;
    }
  });
  if (attempts.length == code_length) {
    return true;
  } else if (check) {
    return true;
  } else return false;
};

export default is_target_reached;
