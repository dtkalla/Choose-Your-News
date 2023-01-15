import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUserFetchedArticles, 
  fetchCurrentUserSavedArticles, saveArticle } from "../../store/articles";
import "./css/FetchedArticlesIndex.css"; 

function FetchedArticlesIndex() {
  const fetchedArticles = useSelector(state =>
    state.articles.fetched ? Object.values(state.articles.fetched) : [{
      headline: "",
      summary: "",
      source: "",
      publishedDate: "",
      url: ""
    }]);

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

  const fetchedArticlesItems = Object.keys(fetchedArticles).length === 0 ? 
  <div className="API-error-message">
    Your search returned no articles.
    <br/>
    <br/>
    It could be because you're fetching articles too quickly (the API has a limit of 10 searches per minute) or because no articles match your search.
    <br/>
    <br/>
    Try again in a minute, or try looking at a different figure if the problem persists.
  </div> :
fetchedArticles.map(fetchedArticle => {
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
        : fetchedArticle.url != '' ?
        (<div 
          className="save-button" 
          onClick={handleSaveFetchedArticle(fetchedArticle)}
        >
          Save
        </div>) : <></>
        )}
      </div>
    );
<<<<<<< HEAD
  }) : 
        <div className="API-error-message">
          Your search returned no articles.  It could be because you're fetching articles too quickly (the API has a limit of 10 searches per minute) or because no articles match your search.  Try again in a minute, or try looking at a different figure if the problem persists.
        </div>;
=======
  });
        
>>>>>>> c82010e66ae6a048a56ae3d955cec58b8a45ab1d

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