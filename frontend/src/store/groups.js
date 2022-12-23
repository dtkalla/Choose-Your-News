import jwtFetch from './jwt';


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


export const createFigure = (figure, groupId = undefined) => async dispatch => {
  let res;

  if(groupId){
    const figureId = figure;
    res = await jwtFetch(`/api/groups/${groupId}/figure/${figureId}`, {
      method: "PUT"
    });
  }
  else{
    const figureName = figure;
    res = await jwtFetch(`/api/figures`, {
      method: "POST",
      body: JSON.stringify({
        name: figureName
      })
    });
  }

  const groups = await res.json();
  dispatch(receiveCurrentUserGroups(groups));
};


export const deleteFigure = (figureId, groupId = undefined) => async dispatch => {
  let res;

  if(groupId){
    res = await jwtFetch(`/api/groups/${groupId}/figure/${figureId}`, {
      method: "PATCH"
    });
  }
  else{
    res = await jwtFetch(`/api/figures/${figureId}`, {
      method: "DELETE"
    });
  }

  const groups = await res.json();
  dispatch(receiveCurrentUserGroups(groups));
};


export const deleteGroup = (groupId) => async dispatch => {
  const res = await jwtFetch(`/api/groups/${groupId}`, {
    method: "DELETE"
  });

  const groups = await res.json();
  dispatch(receiveCurrentUserGroups(groups));
};


export const createGroup = (group) => async dispatch => {
  const res = await jwtFetch(`/api/groups/`, {
    method: "POST",
    body: JSON.stringify(group)
  });

  const groups = await res.json();
  dispatch(receiveCurrentUserGroups(groups));
};


const groupsReducer = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_CURRENT_USER_GROUPS:
      return { ...action.groups };

    default:
      return state;
  }
};


export default groupsReducer;
