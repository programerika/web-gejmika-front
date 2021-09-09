import {UPDATE} from '../types';

const viewreducers = (
  state = {
    comb_in_progress: [
      "./icons/circle.png",
      "./icons/circle.png",
      "./icons/circle.png",
      "./icons/circle.png",
    ],
    attempts_view: [],
    correct_view: [],
    id: -1,
  },
  action
) => {
  switch (action.type) {
    case UPDATE: {
      const { newState_view } = action.payload;
      if (!newState_view) {
        return { ...state };
      } else return newState_view;
    }
    default: {
      return state;
    }
  }
};

export default viewreducers;