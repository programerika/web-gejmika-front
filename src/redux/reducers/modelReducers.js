import {UPDATE} from '../types';

const modelReducers = (
  state = {
    attempts: [],
    secretComb: [],
    score: -1,
  },
  action
) => {
  switch (action.type) {
    case UPDATE:
      const { newStateModel } = action.payload;
      if (newStateModel) {
        return newStateModel;
      } else
        return {
          ...state,
        };
    default:
      return state;
  }
};

export default modelReducers;