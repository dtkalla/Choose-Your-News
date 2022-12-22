import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

const RECEIVE_USERS = "users/RECEIVE_USERS";
const RECEIVE_USER = "users/RECEIVE_USER";
const RECEIVE_USERS_ERRORS = "users/RECEIVE_USERS_ERRORS";
const CLEAR_USER_ERRORS = "users/CLEAR_USER_ERRORS";

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

const receiveErrors = errors => ({
  type: RECEIVE_USERS_ERRORS,
  errors
});

export const clearUserErrors = errors => ({
    type: CLEAR_USER_ERRORS,
    errors
});

export const fetchUsers = () => async dispatch => {
  try {
    const res = await jwtFetch ('/api/users/');
    const users = await res.json();
    dispatch(receiveUsers(users));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchUser = () => async dispatch => {
    try {
      const res = await jwtFetch(`/api/users/current`);
      const user = await res.json();
      dispatch(receiveUser(user));
    } catch(err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        return dispatch(receiveErrors(resBody.errors));
      }
    }
  };

const nullErrors = null;

export const usersErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_USERS_ERRORS:
      return action.errors;
    case CLEAR_USER_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const usersReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
  switch(action.type) {
    case RECEIVE_USERS:
      return { ...state, all: action.users, new: undefined};
    case RECEIVE_USER:
      return { ...state, user: action.user, new: undefined};
    default:
      return state;
  }
};

export default usersReducer;
