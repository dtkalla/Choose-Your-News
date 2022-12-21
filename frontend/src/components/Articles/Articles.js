import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearArticleErrors, fetchUserArticles } from '../../store/articles';
import ArticlesIndex from './ArticlesIndex'
import './Articles.css'

function Articles() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const userArticles = useSelector(state => state.articles.user);

  useEffect(() => {
    dispatch(fetchUserArticles(currentUser._id));
    return () => dispatch(clearArticleErrors());
  }, [dispatch])

  if (!(userArticles.length > 0)) {
    return null
  }

  console.log(userArticles)

  return (
    <div className="articles-container">
        <div className="articles-user-title">Saved Articles</div>
        <ArticlesIndex articles={userArticles}/>
        {/* <p>A Twitter Clone</p>
        <footer>
            Copyright &copy; 2022 Chirper
        </footer> */}
    </div>
  );
}


export default Articles;