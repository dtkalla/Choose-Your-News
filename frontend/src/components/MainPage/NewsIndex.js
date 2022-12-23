import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { saveArticle } from '../../store/articles'
import './MainPage.css'


function NewsIndex({ fetchedArticles, savedArticles, selectedFigureId }) {
  const dispatch = useDispatch();

  const saved = (newsUrl, savedArticles) => {
    for (let i = 0; i < savedArticles.length; i++) {
      if (savedArticles[i].url === newsUrl) {
        return true
      }
    }
    return false;
  }

  const handleSaveArticle = (news) => (e) => {
      e.preventDefault();

      dispatch(saveArticle({
        headline: news.headline,
        summary: news.summary,
        source: news.source,
        publishedDate: news.publishedDate,
        url: news.url,
        figureId: selectedFigureId
      }));
  }

  const articleItems = [];

  if (fetchedArticles) {
    fetchedArticles.forEach(article => {
        const articleItem = (
          <div>
            <a href={article.url}>
              <div className="news-feed">
                <div className='title-one'>
                  
                  {article.headline}
                  
                  <div className='summary-one'> 
                    {article.summary}
                  </div>

                </div>

                <div className='date-one'>
                  {article.publishedDate.slice(0,10)} {article.publishedDate.slice(11,19)} 
                </div>

              </div>

              <hr></hr>
            </a>

            {selectedFigureId && (saved(article.url, savedArticles) ? 
              <div className='like-button'>
                Saved
              </div>
              :
              <div className='like-button' onClick={handleSaveArticle(article)}>
                Save
              </div>)
            }
          </div>
        );
        articleItems.push(articleItem);
    });
  }

  return (
    <div className="news-index-container">
      
      <div className='left-container-title'>
        <h1 className="news-index-title">
          Your news
          <hr></hr>
        </h1>
      </div>
      
      <div className="news-feed-container">
        { fetchedArticles ? articleItems : <p>Loading...</p> }
      </div>
    
    </div>
  );
}
  
export default NewsIndex;
  