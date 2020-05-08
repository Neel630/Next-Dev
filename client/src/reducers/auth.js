import * as ACTION_TYPES from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.LOGIN_SUCCESS:
    case ACTION_TYPES.REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };

    case ACTION_TYPES.LOGOUT:
    case ACTION_TYPES.LOGIN_FAIL:
    case ACTION_TYPES.AUTH_ERROR:
    case ACTION_TYPES.REGISTER_FAIL:
    case ACTION_TYPES.ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };

    case ACTION_TYPES.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };

    default:
      return state;
  }
}
