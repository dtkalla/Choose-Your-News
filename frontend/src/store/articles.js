import jwtFetch from './jwt';


const SAVE_ARTICLE = "articles/SAVE_ARTICLE";

const saveArticle = article => ({
  type: SAVE_ARTICLE,
  article
})

export const addArticle = (article) => async dispatch => {
  const res = await jwtFetch(`/api/articles/`, {
    method: "POST",
    body: JSON.stringify(article)
  });
  const addedArticle = await res.json();
  dispatch(saveArticle(addedArticle));
};


const UNSAVE_ARTICLE = "articles/UNSAVE_ARTICLE"

const unsaveArticle = articleId => ({
  type: UNSAVE_ARTICLE,
  articleId
})

export const deleteSavedArticle = articleId => async dispatch => {
  const res = await jwtFetch(`/api/articles/${articleId}`, {
    method: 'DELETE'
  });
  dispatch(unsaveArticle(articleId));
};


const RECEIVE_CURRENT_USER_FETCHED_ARTICLES = "articles/RECEIVE_CURRENT_USER_FETCHED_ARTICLES";

const receiveCurrentUserFetchedArticles = (fetchedArticles) => ({
  type: RECEIVE_CURRENT_USER_FETCHED_ARTICLES,
  fetchedArticles
});

export const fetchCurrentUserFetchedArticles = () => async dispatch => {
  const res = await jwtFetch(`/api/articles/user/current/fetched`);
  const fetchedArticles = await res.json();
  dispatch(receiveCurrentUserFetchedArticles(fetchedArticles));
};

export const fetchCurrentUserFetchedArticlesByGroup = (groupId) => async dispatch => {
  const res = await jwtFetch(`/api/articles/group/${groupId}/fetched`);
  const fetchedArticles = await res.json();
  dispatch(receiveCurrentUserFetchedArticles(fetchedArticles));
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


const articlesReducer = (state = {}, action) => {
  switch(action.type) {
    case SAVE_ARTICLE:
      return { ...state, ...action.article }
    case UNSAVE_ARTICLE:
      delete state[action.articleId]
      return {...state};
    case RECEIVE_CURRENT_USER_FETCHED_ARTICLES:
      return { ...state, fetched: action.fetchedArticles };
    case RECEIVE_CURRENT_USER_SAVED_ARTICLES:
      return { ...state, saved: action.savedArticles };
    default:
      return state;
  }
};


export default articlesReducer;
