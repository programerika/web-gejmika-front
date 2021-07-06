import attempts from "./attempts";

const next_attempt_id = () => {
  if (attempts.length == 0) return 0;
  var last_attp = attempts[attempts.length - 1];
  console.log("Next id is: " + last_attp.attempt_id + 1);
  return last_attp.attempt_id + 1;
};

export default next_attempt_id;
