import './Articles.css'

function ArticlesIndex({articles}) {

    const articleItems = articles.map((article) => {
        return (
          <div key={article._id} className="articles-index-items-container">
            {article.headline}
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