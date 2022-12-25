import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { fetchCurrentUserGroups } from '../../store/groups';
import { fetchCurrentUserSavedArticles } from '../../store/articles';

import NewsIndex from './NewsIndex';
import IndexSidebar from './IndexSidebar';
import GroupsIndex from '../Groups/GroupsIndex';

import './MainPage.css';


function MainPage() {
  const currentUser = useSelector(state => state.session.user);

  // const groupsObj = useSelector(state => state.groups);

  const fetchedArticlesObj = useSelector(state => state.articles.fetched);

  const savedArticlesObj = useSelector(state => state.articles.saved);

  // const groups = groupsObj ? Object.values(groupsObj) : [];

  const fetchedArticles = fetchedArticlesObj ? Object.values(fetchedArticlesObj) :[];

  const savedArticles = savedArticlesObj ? Object.values(savedArticlesObj) : [];


  function getFigures(groups) {
    const figures = [];
    if (groups) {
      for (let i = 0; i < groups.length; i++) {
        for (let j = 0; j < groups[i].figures.length; j++){
          figures.push(groups[i].figures[j]);
        }
      }
    }
    return figures;
  }

  // const figures = groups ? getFigures(groups) : [];

  const [selectedGroupId, setSelectedGroupId] = useState(undefined);

  const [selectedFigureId, setSelectedFigureId] = useState(undefined);


  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      // dispatch(fetchCurrentUserGroups());
      // dispatch(fetchCurrentUserSavedArticles());
    }
  }, [dispatch, currentUser])


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

        <IndexSidebar
          selectedGroupId={selectedGroupId}
          setSelectedGroupId={setSelectedGroupId}
          setSelectedFigureId={setSelectedFigureId}
          // figures={
          //   selectedGroupId === undefined ? figures : groupsObj[selectedGroupId].figures
          // }
        />
      </div>
    </>
  );
}


export default MainPage;