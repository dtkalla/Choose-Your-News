import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCurrentUserGroups } from '../../store/groups';
import { fetchCurrentUserFetchedArticles, fetchCurrentUserSavedArticles } from '../../store/articles';

import NewsIndex from './NewsIndex';
import IndexSidebar from './IndexSidebar';

import './MainPage.css';


function MainPage() {
  const currentUser = useSelector(state => state.session.user);

  const groups = useSelector(state => Object.values(state.groups));

  const savedArticles = useSelector(state => state.articles.saved);

  const fetchedArticles = useSelector(state => state.articles.fetched);

  const figures = [];
  if (groups) {
    for (let i = 0; i < groups.length; i++) {
      for (let j = 0; j < groups[i].figures.length; j++){
        figures.push(groups[i].figures[j]);
      }
    }
  }

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchCurrentUserGroups());

      dispatch(fetchCurrentUserSavedArticles());

      dispatch(fetchCurrentUserFetchedArticles());
    }
  }, [dispatch, currentUser])


  return (
    <>
      <div className="index-container">
        {fetchedArticles &&
          <NewsIndex fetchedArticles={fetchedArticles} savedArticles={savedArticles}/>
        }

        {groups &&
          <IndexSidebar groups={groups}/>
        }
      </div>
    </>
  );
}


export default MainPage;