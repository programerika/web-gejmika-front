import {UPDATE} from '../types';

const update = (newState_model, newState_view) => {
  return {
    type: UPDATE,
    payload: { newState_model, newState_view },
  };
};

export default {
  update,
};