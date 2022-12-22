import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addArticle } from '../../store/articles'
import './MainPage.css'

// function NewsIndex({ newsFeed }) {
function NewsIndex({ fetchedArticles, savedArticles }) {
  const dispatch = useDispatch();
  const newsFeed = fetchedArticles


  const saved = (newsUrl, savedArticles) => {
    for (let i = 0; i < savedArticles.length; i++) {
      if (savedArticles[i].url === newsUrl) {
        return true
      }
    }
    return false;
  }

  const handleSave = (news) => () => {
    return dispatch(addArticle({ 
        headline: news.headline,
        summary: news.summary,
        source: news.source,
        publishedDate: news.publishedDate,
        url: news.url,
        figure: '63a470bdc80436748242920a'
      })
    ) 
  }

  const newsItems = [];
  newsFeed.forEach(news => {
      const newsItem = (
        <>
        <div className='news-feed'>
        {saved(news.url, savedArticles) ? 
                        <div className='like-button'>
                         <div className='save'>Saved</div> 
                        </div>
                        :
                        <div className='like-button' onClick={handleSave(news)}>
                            <div className='save'>Save</div> 
                        </div>
                        }
        
        <a href={news.url}>
       
          <div className='title-one'>{news.headline}
            <div className='summary-one'> 
            {news.summary}
            
            </div>
            </div>
            <div className="date-one">
            {news.publishedDate.slice(0,10)}
        </div>
        </a>
     
        </div>
        <hr></hr>
        </>
      )
      newsItems.push(newsItem);
  });

    return (
      <div className="news-index-container">
        <div className='left-container-title'><h1 className="news-index-title">Your news <hr></hr></h1></div>
        <div className="news-feed-container">
          {newsItems}
        </div>
      </div>
    );
  }
  
  export default NewsIndex;
  