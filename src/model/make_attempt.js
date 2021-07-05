import compare_code from "./compare_code";

const make_attempt = (id, code) => {
  return {
    attempt_id: id,
    attempt_code: code,
    attempt_outcome: compare_code(),
  };
};

export default make_attempt;
