import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { fetchCurrentUserGroups } from '../../store/groups';
import { fetchCurrentUserSavedArticles } from '../../store/articles';

import NewsIndex from './NewsIndex';

import GroupsIndex from '../Groups/GroupsIndex';
import FiguresSidebar from '../Figures/FiguresSidebar';

import './MainPage.css';


function MainPage() {
  const currentUser = useSelector(state => state.session.user);

  // const fetchedArticlesObj = useSelector(state => state.articles.fetched);

  // const savedArticlesObj = useSelector(state => state.articles.saved);

  // const fetchedArticles = fetchedArticlesObj ? Object.values(fetchedArticlesObj) :[];

  // const savedArticles = savedArticlesObj ? Object.values(savedArticlesObj) : [];

  const [selectedGroupId, setSelectedGroupId] = useState(undefined);

  const [selectedFigureId, setSelectedFigureId] = useState(undefined);

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchCurrentUserGroups());
      // dispatch(fetchCurrentUserSavedArticles());
  }, [dispatch])

  return (
    <>
      <div className="groups-container">
        <GroupsIndex setSelectedGroupId={setSelectedGroupId} />
      </div>

      <div className="index-container">
        {/* <NewsIndex 
          fetchedArticles={fetchedArticles} 
          savedArticles={savedArticles}
          selectedFigureId={selectedFigureId}
        /> */}
        <FiguresSidebar
          selectedGroupId={selectedGroupId}
          setSelectedGroupId={setSelectedGroupId}
          setSelectedFigureId={setSelectedFigureId}
        />
      </div>
    </>
  );
}


export default MainPage;