import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUserFetchedArticles, 
  fetchCurrentUserSavedArticles, saveArticle } from "../../store/articles";
import "./css/FetchedArticlesIndex.css"; 

function FetchedArticlesIndex() {
  const fetchedArticles = useSelector(state =>
    state.articles.fetched ? Object.values(state.articles.fetched) : []);

  const savedArticles = useSelector(state =>
    state.articles.saved ? Object.values(state.articles.saved) : []);
    
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUserFetchedArticles());
    dispatch(fetchCurrentUserSavedArticles());
  }, [dispatch]);

  const saved = (url, savedArticles) => {
    for (let i = 0; i < savedArticles.length; i++) {
      if (url === savedArticles[i].url) {
        return true;
      }
    }
    return false;
  }

  const handleSaveFetchedArticle = (fetchedArticle) => (e) => {
      e.preventDefault();
      dispatch(saveArticle({
        headline: fetchedArticle.headline,
        summary: fetchedArticle.summary,
        source: fetchedArticle.source,
        publishedDate: fetchedArticle.publishedDate,
        url: fetchedArticle.url
      }));
  }

  const fetchedArticlesItems = fetchedArticles.map(fetchedArticle => {
    return (
      <div className="fetched-articles" key={fetchedArticle.url}>
        <a href={fetchedArticle.url}>
            <div className="title-one">
              {fetchedArticle.headline}
            </div>
            <div className="summary-one"> 
              {fetchedArticle.summary}
            </div>
            <div className="date-one">
              {fetchedArticle.publishedDate.slice(0, 10)} {fetchedArticle.publishedDate.slice(11,19)} 
            </div>
        </a>
        {(saved(fetchedArticle.url, savedArticles) ? 
        (<div className="save-button">
          Saved
        </div>)
        :
        (<div 
          className="save-button" 
          onClick={handleSaveFetchedArticle(fetchedArticle)}
        >
          Save
        </div>)
        )}
      </div>
    );
  });

  return (
    <div className="fetched-articles-index-container">
      <div className="fetched-articles-index-title-container">
        <h1 className="fetched-articles-index-title">
          Your News
          <hr></hr>
        </h1>
      </div>
      <div className="fetched-articles-container">
        {fetchedArticlesItems}
      </div>
    </div>
  );
}

export default FetchedArticlesIndex;