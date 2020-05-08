import { v4 as uuid } from 'uuid';
import * as ACTION_TYPES from './types';

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuid();
  dispatch({
    type: ACTION_TYPES.SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(
    () => dispatch({ type: ACTION_TYPES.REMOVE_ALERT, payload: id }),
    timeout
  );
};
