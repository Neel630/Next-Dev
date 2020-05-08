import axios from 'axios';
import { setAlert } from './alert';
import * as ACTION_TYPES from './types';

//Get current user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('api/profile/me');
    dispatch({
      type: ACTION_TYPES.GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ACTION_TYPES.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all Profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: ACTION_TYPES.CLEAR_PROFILE });

  try {
    const res = await axios.get('api/profile/');

    dispatch({
      type: ACTION_TYPES.GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ACTION_TYPES.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get Profile by ID
export const getProfileById = (id) => async (dispatch) => {
  try {
    let res = await axios.get(`/api/profile/user/${id}`);

    dispatch({
      type: ACTION_TYPES.GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ACTION_TYPES.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Create or Update Profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: ACTION_TYPES.GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Prifole Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ACTION_TYPES.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Experience

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/profile/experience', formData, config);

    dispatch({
      type: ACTION_TYPES.UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Experience Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ACTION_TYPES.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Education

export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/profile/education', formData, config);

    dispatch({
      type: ACTION_TYPES.UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Education Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ACTION_TYPES.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete an Experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: ACTION_TYPES.UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch({
      type: ACTION_TYPES.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete an Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: ACTION_TYPES.UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: ACTION_TYPES.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Account and Profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Do you want to delete account?')) {
    try {
      await axios.delete('/api/profile');
      dispatch({
        type: ACTION_TYPES.CLEAR_PROFILE,
      });

      dispatch({
        type: ACTION_TYPES.ACCOUNT_DELETED,
      });

      dispatch(setAlert('Your account is permantly deleted'));
    } catch (err) {
      dispatch({
        type: ACTION_TYPES.PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
