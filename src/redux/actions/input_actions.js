const input_click = (input) => {
  return {
    type: "INPUT_CLICK",
    payload: input,
  };
};

const input_confirm = () => {
  return {
    type: "INPUT_CONFIRM",
  };
};

const input_cancel = () => {
  return {
    type: "INPUT_CANCEL",
  };
};

const start_game = () => {
  return {
    type: "START_GAME",
  };
};

const get_score = () => {
  return {
    type: "GET_SCORE",
  };
};

const update = () => {
  return {
    type: "UPDATE",
  };
};

const update_attempts = () => {
  return {
    type: "UPDATE_ATTEMPTS",
  };
};

export default {
  input_click,
  input_confirm,
  input_cancel,
  start_game,
  get_score,
  update,
  update_attempts,
};
