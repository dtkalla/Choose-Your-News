import './Articles.css'

function ArticlesIndex({articles}) {

    const articleItems = articles.map((article) => {
        return (
          <div key={article._id} className="articles-index-items-container">
            <a className="articles-index-items-link" href={article.url}>
                <div className="articles-index-items-headline">
                    {article.headline}
                </div>
                <div className="articles-index-items-summary">
                    {article.summary}
                </div>
                <div className="articles-index-items-date">
                    Published Date: {article.publishedDate.slice(0,10)}
                </div>
            </a>
          </div>
        )
    })

    return (
        <div className="articles-index-container">
            {articleItems}
            <div className="articles-index-items-container">hello</div>
            <div className="articles-index-items-container">hello</div>
            <div className="articles-index-items-container">hello</div>
            <div className="articles-index-items-container">hello</div>
            <div className="articles-index-items-container">hello</div>
            <div className="articles-index-items-container">hello</div>
            <div className="articles-index-items-container">hello</div>
        </div>
    );
}


export default ArticlesIndex;