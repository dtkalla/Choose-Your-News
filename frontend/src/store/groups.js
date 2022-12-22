import jwtFetch from './jwt';


const RECEIVE_GROUP = "groups/RECEIVE_GROUP";

const receiveGroup = group => ({
  type: RECEIVE_GROUP,
  group
});

export const fetchGroup = (id) => async dispatch => {
  const res = await jwtFetch(`/api/groups/${id}`);
  const group = await res.json();
  dispatch(receiveGroup(group));
};


const ADD_GROUP = "groups/ADD_GROUP";

const addGroup = group => ({
  type: ADD_GROUP,
  group
})

export const createGroup = (group) => async dispatch => {
  const res = await jwtFetch(`/api/groups/`, {
    method: "POST",
    body: JSON.stringify(group)
  });
  const createdGroup = await res.json();
  dispatch(addGroup(createdGroup));
};


const RECEIVE_CURRENT_USER_GROUPS = "groups/RECEIVE_CURRENT_USER_GROUPS";

const receiveCurrentUserGroups = (groups) => ({
  type: RECEIVE_CURRENT_USER_GROUPS,
  groups
});

export const fetchCurrentUserGroups = () => async dispatch => {
    const res = await jwtFetch(`/api/groups/user/current`);
    const groups = await res.json();
    dispatch(receiveCurrentUserGroups(groups));
};


const groupsReducer = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_GROUP:
      return { ...state, ...action.group};
    case RECEIVE_CURRENT_USER_GROUPS:
      return { ...state, ...action.groups};
    case ADD_GROUP:
      return { ...state, ...action.group};
    default:
      return state;
  }
};

export default groupsReducer;
