
import './MainPage.css'

function NewsIndex({ newsFeed }) {

  const newsItems = [];
  newsFeed.forEach(news => {
      const newsItem = (
        <a href={news.url}>
          <div className="news-feed">
            <div className='title-one'>{news.headline}    
              <div className='summary-one'> 
                {news.summary}
              <div className='like-button'>
                Save
              </div>
            </div>
          </div>
            <div className='date-one'>
              {news.publishedDate.slice(0,10)} {news.publishedDate.slice(11,19)} 
             
            </div>
          </div> 
          <hr></hr>
        </a>
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
  