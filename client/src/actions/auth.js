import * as ACTION_TYPES from '../actions/types';
import { setAlert } from './alert';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

//Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('api/auth');

    dispatch({
      type: ACTION_TYPES.USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ACTION_TYPES.AUTH_ERROR
    });
  }
};

//Register User

export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'Application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: ACTION_TYPES.REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ACTION_TYPES.REGISTER_FAIL
    });
  }
};

//Login User

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'Application/json'
    }
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: ACTION_TYPES.LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ACTION_TYPES.LOGIN_FAIL
    });
  }
};

// Logout/Clear Profile

export const logout = () => dispatch => {
  dispatch({
    type: ACTION_TYPES.CLEAR_PROFILE
  });

  dispatch({
    type: ACTION_TYPES.LOGOUT
  });
};
