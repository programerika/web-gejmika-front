import compare_code from "./compare_code";
import attempts from "./attempts";
import combination from "./combination";

const make_attempt = (id, code) => {
  const new_attp = {
    attempt_id: id,
    attempt_code: code,
    attempt_outcome: compare_code(code, combination),
  };
  attempts.push(new_attp);
  return new_attp.attempt_outcome;
};

export default make_attempt;
