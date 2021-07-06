import attempts from "./attempts";
import code_length from "./code_length";

const score = () => {
  var last_attp = attempts[attempts.length - 1];
  console.log(last_attp);
  if (attempts.length == code_length) return 0;
  switch (last_attp.attempt_id) {
    case 0:
      return 21;
    case 1:
      return 21;
    case 2:
      return 21;
    case 3:
      return 13;
    case 4:
      return 8;
    default:
      return 0;
  }
};

export default score;
