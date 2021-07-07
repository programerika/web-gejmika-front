import make_attempt from "../model/make_attempt";
import next_attempt_id from "../model/next_attempt_id";
import attp_in_progress from "./attp_in_progress";

const confirm_attp = () => {
  const outcome = make_attempt(next_attempt_id(), attp_in_progress);
  attp_in_progress.length = 0;
  return outcome;
};

export default confirm_attp;
