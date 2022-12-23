import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCurrentUserSavedArticles } from '../../store/articles';

import ArticlesIndex from './ArticlesIndex';
import './Articles.css';

function Articles() {
  const currentUser = useSelector(state => state.session.user);

  const savedArticlesObj = useSelector(state => state.articles.saved);

  const savedArticles = savedArticlesObj ? Object.values(savedArticlesObj) : [];

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchCurrentUserSavedArticles());
    }
  }, [dispatch, currentUser])


  return (
    <div className="articles-container">
        <div className="articles-user-title">
          Saved Articles
        </div>
        {savedArticles && 
        <ArticlesIndex articles={savedArticles}/>
        }

        {/* <p>Choose Your News</p>
        <footer>
          Copyright &copy; 2022 Choose Your News
        </footer> */}
    </div>
  );
}


export default Articles;