import * as ACTION_TYPES from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.UPDATE_PROFILE:
    case ACTION_TYPES.GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };

    case ACTION_TYPES.GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };

    case ACTION_TYPES.PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    case ACTION_TYPES.CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false
      };

    default:
      return state;
  }
}
