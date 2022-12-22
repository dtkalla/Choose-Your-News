import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

// const RECEIVE_ARTICLES = "articles/RECEIVE_ARTICLES";
// const RECEIVE_USER_ARTICLES = "articles/RECEIVE_USER_ARTICLES";
// const RECEIVE_NEW_TWEET = "tweets/RECEIVE_NEW_TWEET";
const UNSAVE_ARTICLE = "articles/UNSAVE_ARTICLE"
const RECEIVE_ARTICLES_ERRORS = "articles/RECEIVE_ARTICLES_ERRORS";
const CLEAR_ARTICLE_ERRORS = "articles/CLEAR_ARTICLE_ERRORS";

// const receiveArticles = articles => ({
//   type: RECEIVE_ARTICLES,
//   articles
// });

// const receiveUserArticles = articles => ({
//   type: RECEIVE_USER_ARTICLES,
//   articles
// });

const unsaveArticle = articleId => ({
  type: UNSAVE_ARTICLE,
  articleId
})

// const receiveNewTweet = tweet => ({
//   type: RECEIVE_NEW_TWEET,
//   tweet
// });

const receiveErrors = errors => ({
  type: RECEIVE_ARTICLES_ERRORS,
  errors
});

export const clearArticleErrors = errors => ({
    type: CLEAR_ARTICLE_ERRORS,
    errors
});

// export const fetchArticles = () => async dispatch => {
//   try {
//     const res = await jwtFetch ('/api/articles/');
//     const articles = await res.json();
//     dispatch(receiveArticles(articles));
//   } catch (err) {
//     const resBody = await err.json();
//     if (resBody.statusCode === 400) {
//       dispatch(receiveErrors(resBody.errors));
//     }
//   }
// };

// export const fetchUserArticles = id => async dispatch => {
//   try {
//     const res = await jwtFetch(`/api/articles/user/${id}`);
//     const articles = await res.json();
//     dispatch(receiveUserArticles(articles));
//   } catch(err) {
//     const resBody = await err.json();
//     if (resBody.statusCode === 400) {
//       return dispatch(receiveErrors(resBody.errors));
//     }
//   }
// };

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
//   const response = await csrfFetch(`/api/reservations/${reservationId}`, {
//       method: 'DELETE'
//   });

//   dispatch(removeReservation(reservationId));
// };

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

export const articlesErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_ARTICLES_ERRORS:
      return action.errors;
    // case RECEIVE_NEW_ARTICLE:
    case CLEAR_ARTICLE_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const articlesReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
  switch(action.type) {
    // case RECEIVE_ARTICLES:
    //   return { ...state, all: action.articles, new: undefined};
    // case RECEIVE_USER_ARTICLES:
    //   return { ...state, user: action.articles, new: undefined};
    case UNSAVE_ARTICLE:
      delete state[action.articleId]
      return {...state};
    // case RECEIVE_NEW_TWEET:
    //   return { ...state, new: action.tweet};
    // case RECEIVE_USER_LOGOUT:
    //   return { ...state, user: {}, new: undefined }
    default:
      return state;
  }
};

export default articlesReducer;
