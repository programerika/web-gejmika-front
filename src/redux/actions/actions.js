import {UPDATE} from '../types';

const update = (newStateModel, newStateView) => {
  return {
    type: UPDATE,
    payload: { newStateModel, newStateView },
  };
};

export default {
  update,
};