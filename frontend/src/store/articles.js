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

const articlesReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
  switch(action.type) {
    case UNSAVE_ARTICLE:
      delete state[action.articleId]
      return {...state};
    default:
      return state;
  }
};

export default articlesReducer;
