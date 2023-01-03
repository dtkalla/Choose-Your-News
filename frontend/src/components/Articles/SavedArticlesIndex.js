import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUserSavedArticles, 
    unsaveArticle } from "../../store/articles";
import "./css/SavedArticlesIndex.css";

function SavedArticlesIndex() {
    const savedArticles = useSelector(state => 
        state.articles.saved ? Object.values(state.articles.saved) : []);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCurrentUserSavedArticles());
    }, [dispatch])

    const handleUnsaveSavedArticle = (savedArticleId) => (e) => {
        e.preventDefault();
        dispatch(unsaveArticle(savedArticleId));
    }

    const savedArticleItems = savedArticles.map((savedArticle) => {
        return (
            <div 
                key={savedArticle._id} 
                className="saved-articles-index-items-container"
            >
                <a 
                    className="saved-articles-index-items-link" 
                    href={savedArticle.url}
                >
                    <div className="saved-articles-index-items-headline">
                        {savedArticle.headline}
                    </div>
                    
                    <div className="saved-articles-index-items-summary">
                        {savedArticle.summary}
                    </div>
                
                    <div className="saved-articles-index-items-date">
                        Published Date: {savedArticle.publishedDate.slice(0,10)}
                    </div>
                </a>
            
            <div id='unsave-button-div'>
                <div id='empty-spacing-div'></div>
                <button 
                    className="saved-articles-index-items-delete" 
                    onClick={handleUnsaveSavedArticle(savedArticle._id)}
                >
                    Unsave
                </button>
            </div>
          </div>
        )
    });

    return (
        <div className="saved-articles-container">
            <div className="saved-articles-container-title">
                Saved Articles
            </div>
            <hr className="saved-articles-title-divider"></hr>
            <div className="saved-articles-index-container">
                {savedArticleItems}
            </div>
        </div>
    );
}

export default SavedArticlesIndex;