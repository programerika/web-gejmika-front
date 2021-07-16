const is_target_reached = (attempts) => {
  if (attempts.length === 0) return false;
  var last_attp = attempts[attempts.length - 1];
  var check = true;
  last_attp.attempt_outcome.forEach((el) => {
    if (el != "2") {
      check = false;
    }
  });
  if (attempts.length === 5) {
    return true;
  } else if (check) {
    return true;
  } else return false;
};

export default is_target_reached;
