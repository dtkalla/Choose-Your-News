import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

const RECEIVE_GROUPS = "groups/RECEIVE_GROUPS";
const RECEIVE_USER_GROUPS = "groups/RECEIVE_USER_GROUPS";
const ADD_GROUP = "groups/CREATE_GROUP";
// const RECEIVE_NEW_TWEET = "tweets/RECEIVE_NEW_TWEET";
const RECEIVE_GROUPS_ERRORS = "groups/RECEIVE_GROUPS_ERRORS";
const CLEAR_GROUP_ERRORS = "groups/CLEAR_GROUP_ERRORS";

// const RECEIVE_TWEETS = "tweets/RECEIVE_TWEETS";
// const RECEIVE_USER_TWEETS = "tweets/RECEIVE_USER_TWEETS";
// const RECEIVE_NEW_TWEET = "tweets/RECEIVE_NEW_TWEET";
// const RECEIVE_TWEET_ERRORS = "tweets/RECEIVE_TWEET_ERRORS";
// const CLEAR_TWEET_ERRORS = "tweets/CLEAR_TWEET_ERRORS";

const receiveGroups = groups => ({
  type: RECEIVE_GROUPS,
  groups
});

const receiveUserGroups = groups => ({
  type: RECEIVE_USER_GROUPS,
  groups
});

const addGroup = group => ({
  type: ADD_GROUP,
  group
})

// const receiveNewTweet = tweet => ({
//   type: RECEIVE_NEW_TWEET,
//   tweet
// });

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

export const fetchUserGroups = id => async dispatch => {
  try {
    const res = await jwtFetch(`/api/groups/user/${id}`);
    const groups = await res.json();
    dispatch(receiveUserGroups(groups));
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

// export const composeTweet = data => async dispatch => {
//   try {
//     const res = await jwtFetch('/api/tweets/', {
//       method: 'POST',
//       body: JSON.stringify(data)
//     });
//     const tweet = await res.json();
//     dispatch(receiveNewTweet(tweet));
//   } catch(err) {
//     const resBody = await err.json();
//     if (resBody.statusCode === 400) {
//       return dispatch(receiveErrors(resBody.errors));
//     }
//   }
// };

const nullErrors = null;

export const groupsErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_GROUPS_ERRORS:
      return action.errors;
    // case RECEIVE_NEW_GROUP:
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
    case RECEIVE_USER_GROUPS:
      return { ...state, user: action.groups, new: undefined};
    case ADD_GROUP:
      return {...state, ...action.group}
    // case RECEIVE_NEW_TWEET:
    //   return { ...state, new: action.tweet};
    // case RECEIVE_USER_LOGOUT:
    //   return { ...state, user: {}, new: undefined }
    default:
      return state;
  }
};

export default groupsReducer;
