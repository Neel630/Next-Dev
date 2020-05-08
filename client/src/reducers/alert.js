import * as ACTION_TYPES from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.SET_ALERT:
      return [...state, payload];

    case ACTION_TYPES.REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);

    default:
      return state;
  }
}
