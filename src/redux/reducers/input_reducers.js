const input_reducers = (
  state = {
    attp_in_progress: [],
    attempts: [],
    attp_id: -1,
    secret_comb: [],
    score: -1,
  },
  action
) => {
  switch (action.type) {
    case "UPDATE":
      const { newState_model } = action.payload;
      if (newState_model) {
        return newState_model;
      } else
        return {
          ...state,
        };
    default:
      return state;
  }
};

export default input_reducers;
