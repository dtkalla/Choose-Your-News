import { useSelector, useDispatch } from "react-redux";
import { deleteSavedArticle } from '../../store/articles';

import './Articles.css'

function ArticlesIndex({articles}) {
    const dispatch = useDispatch()

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
            {/* <button className="articles-index-items-delete"> */}
            <button className="articles-index-items-delete" onClick={() => dispatch(deleteSavedArticle(article._id))}>
                Delete
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