import jwtFetch from './jwt';


const RECEIVE_CURRENT_USER_FETCHED_ARTICLES = "articles/RECEIVE_CURRENT_USER_FETCHED_ARTICLES";

const receiveCurrentUserFetchedArticles = (fetchedArticles) => ({
  type: RECEIVE_CURRENT_USER_FETCHED_ARTICLES,
  fetchedArticles
});

export const fetchCurrentUserFetchedArticles = () => async dispatch => {
  const res = await jwtFetch(`/api/articles/user/current/fetched`);
  const fetchedArticles = await res.json();
  if (Object.keys(fetchedArticles).length > 0) {
    dispatch(receiveCurrentUserFetchedArticles(fetchedArticles));
  }
};

export const fetchCurrentUserFetchedArticlesByGroup = (groupId) => async dispatch => {
  const res = await jwtFetch(`/api/articles/group/${groupId}/fetched`);
  const fetchedArticles = await res.json();
  if (Object.keys(fetchedArticles).length > 0) {
    dispatch(receiveCurrentUserFetchedArticles(fetchedArticles));
  }
};

export const fetchCurrentUserFetchedArticlesByFigure = (figureId) => async dispatch => {
  const res = await jwtFetch(`/api/articles/figure/${figureId}/fetched`);
  const fetchedArticles = await res.json();
  if (Object.keys(fetchedArticles).length > 0) {
    dispatch(receiveCurrentUserFetchedArticles(fetchedArticles));
  }
};


const RECEIVE_CURRENT_USER_SAVED_ARTICLES = "articles/RECEIVE_CURRENT_USER_SAVED_ARTICLES";

const receiveCurrentUserSavedArticles = (savedArticles) => ({
  type: RECEIVE_CURRENT_USER_SAVED_ARTICLES,
  savedArticles
});

export const fetchCurrentUserSavedArticles = () => async dispatch => {
  const res = await jwtFetch(`/api/articles/user/current/saved`);
  const savedArticles = await res.json();
  dispatch(receiveCurrentUserSavedArticles(savedArticles));
};

export const saveArticle = (article) => async dispatch => {
  const res = await jwtFetch(`/api/articles/`, {
    method: "POST",
    body: JSON.stringify(article)
  });
  const savedArticles = await res.json();
  dispatch(receiveCurrentUserSavedArticles(savedArticles));
};

export const unsaveArticle = (articleId) => async dispatch => {
  const res = await jwtFetch(`/api/articles/${articleId}`, {
    method: 'DELETE'
  });
  const savedArticles = await res.json();
  dispatch(receiveCurrentUserSavedArticles(savedArticles));
};


const articlesReducer = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_CURRENT_USER_FETCHED_ARTICLES:
      return { ...state, fetched: action.fetchedArticles };

    case RECEIVE_CURRENT_USER_SAVED_ARTICLES:
      return { ...state, saved: action.savedArticles };
      
    default:
      return state;
  }
};


export default articlesReducer;
