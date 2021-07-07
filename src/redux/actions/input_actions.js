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

export default {
  input_click,
  input_confirm,
  input_cancel,
};
