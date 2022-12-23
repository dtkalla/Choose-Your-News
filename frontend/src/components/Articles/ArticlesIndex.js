import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { unsaveArticle } from '../../store/articles';

import { fetchCurrentUserSavedArticles } from '../../store/articles';

import './Articles.css';

function ArticlesIndex({articles}) {
    const currentUser = useSelector(state => state.session.user);
    
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchCurrentUserSavedArticles());
        }
    }, [dispatch, currentUser])

    const handleUnsaveArticle = (articleId) => (e) => {
        e.preventDefault();

        dispatch(unsaveArticle(articleId));
    }

    const articleItems = articles.map((article) => {
        return (
          <div key={article._id} className="articles-index-items-container">
            <a className="articles-index-items-link" href={article.url}>
                <div className="articles-index-items-headline">
                    {article.headline}
                    <div className="articles-index-items-summary">
                    {article.summary}
                </div>
                </div>
               
                <div className="articles-index-items-date">
                    Published Date: {article.publishedDate.slice(0,10)}
                </div>
            </a>
            <button 
                className="articles-index-items-delete" 
                onClick={handleUnsaveArticle(article._id)}
            >
                Unsave
            </button>
          </div>
        )
    })

    return (
        <div className="articles-index-container">
            {articleItems}
        </div>
    );
}


export default ArticlesIndex;