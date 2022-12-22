import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

const SAVE_ARTICLE = "articles/SAVE_ARTICLE";
const UNSAVE_ARTICLE = "articles/UNSAVE_ARTICLE"
const RECEIVE_ARTICLES_ERRORS = "articles/RECEIVE_ARTICLES_ERRORS";
const CLEAR_ARTICLE_ERRORS = "articles/CLEAR_ARTICLE_ERRORS";

const saveArticle = article => ({
  type: SAVE_ARTICLE,
  article
})

const unsaveArticle = articleId => ({
  type: UNSAVE_ARTICLE,
  articleId
})

const receiveErrors = errors => ({
  type: RECEIVE_ARTICLES_ERRORS,
  errors
});

export const clearArticleErrors = errors => ({
    type: CLEAR_ARTICLE_ERRORS,
    errors
});

export const addArticle = (article) => async dispatch => {
  const { headline, summary, source, publishedDate, url, figure } = article;
  try {
    const res = await jwtFetch(`/api/articles/`, {
      method: "POST",
      body: JSON.stringify({
        headline,
        summary,
        source,
        publishedDate,
        url,
        figure
      })
    });
    const article = await res.json();
    dispatch(saveArticle(article));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const deleteSavedArticle = articleId => async dispatch => {
  try {
    const res = await jwtFetch(`/api/articles/${articleId}`, {
      method: 'DELETE'
    });
    dispatch(unsaveArticle(articleId));
  } catch(err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

const nullErrors = null;

export const articlesErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_ARTICLES_ERRORS:
      return action.errors;
    case CLEAR_ARTICLE_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};


const RECEIVE_CURRENT_USER_FETCHED_ARTICLES = "articles/RECEIVE_CURRENT_USER_FETCHED_ARTICLES";

const receiveCurrentUserFetchedArticles = (fetchedArticles) => ({
  type: RECEIVE_CURRENT_USER_FETCHED_ARTICLES,
  fetchedArticles
});

export const fetchCurrentUserFetchedArticles = () => async dispatch => {
  try {
    const res = await jwtFetch(`/api/articles/user/current/fetched`);
    const fetchedArticles = await res.json();
    dispatch(receiveCurrentUserFetchedArticles(fetchedArticles));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};


const RECEIVE_CURRENT_USER_SAVED_ARTICLES = "articles/RECEIVE_CURRENT_USER_SAVED_ARTICLES";

const receiveCurrentUserSavedArticles = (savedArticles) => ({
  type: RECEIVE_CURRENT_USER_SAVED_ARTICLES,
  savedArticles
});

export const fetchCurrentUserSavedArticles = () => async dispatch => {
  try {
    const res = await jwtFetch(`/api/articles/user/current/saved`);
    const savedArticles = await res.json();
    dispatch(receiveCurrentUserSavedArticles(savedArticles));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

const articlesReducer = (state = {}, action) => {
  switch(action.type) {
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
