const score = (attempts) => {
  var last_attp = attempts[attempts.length - 1];
  var check = true;
  last_attp.attempt_outcome.forEach((el) => {
    if (el != "2") {
      check = false;
    }
  });
  if (!check && attempts.length === 5) return 0;
  else {
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
  }
};

export default score;
