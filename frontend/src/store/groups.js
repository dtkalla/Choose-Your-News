import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

const RECEIVE_GROUPS = "groups/RECEIVE_GROUPS";
const RECEIVE_GROUP = "groups/RECEIVE_GROUP";
const ADD_GROUP = "groups/CREATE_GROUP";
const RECEIVE_GROUPS_ERRORS = "groups/RECEIVE_GROUPS_ERRORS";
const CLEAR_GROUP_ERRORS = "groups/CLEAR_GROUP_ERRORS";

const receiveGroups = groups => ({
  type: RECEIVE_GROUPS,
  groups
});

const receiveGroup = group => ({
  type: RECEIVE_GROUP,
  group
});

const addGroup = group => ({
  type: ADD_GROUP,
  group
})

const receiveErrors = errors => ({
  type: RECEIVE_GROUPS_ERRORS,
  errors
});

export const clearGroupErrors = errors => ({
    type: CLEAR_GROUP_ERRORS,
    errors
});

export const fetchGroups = () => async dispatch => {
  try {
    const res = await jwtFetch ('/api/groups/');
    const groups = await res.json();
    dispatch(receiveGroups(groups));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchGroup = id => async dispatch => {
  try {
    const res = await jwtFetch(`/api/groups/${id}`);
    const group = await res.json();
    dispatch(receiveGroup(group));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const createGroup = (group) => async dispatch => {
  const { user, name, figures, shared } = group;
  try {
    const res = await jwtFetch(`/api/groups/`, {
      method: "POST",
      body: JSON.stringify({
        user,
        name,
        figures,
        shared
      })
    });
    const group = await res.json();
    dispatch(addGroup(group));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

const nullErrors = null;

export const groupsErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_GROUPS_ERRORS:
      return action.errors;
    case CLEAR_GROUP_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const groupsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
  switch(action.type) {
    case RECEIVE_GROUPS:
      return { ...state, all: action.groups, new: undefined};
    case RECEIVE_GROUP:
      return { ...state, group: action.group, new: undefined};
    case ADD_GROUP:
      return {...state, ...action.group}
    default:
      return state;
  }
};

export default groupsReducer;
