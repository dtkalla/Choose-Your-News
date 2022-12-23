import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { fetchCurrentUserGroups } from '../../store/groups';
import { fetchCurrentUserFetchedArticles, fetchCurrentUserSavedArticles } from '../../store/articles';

import NewsIndex from './NewsIndex';
import IndexSidebar from './IndexSidebar';
import GroupsIndex from '../Groups/GroupsIndex';

import './MainPage.css';


function MainPage() {
  const currentUser = useSelector(state => state.session.user);

  const groupsObj = useSelector(state => state.groups);

  // const savedArticles = useSelector(state => state.articles.saved);

  const fetchedArticlesObj = useSelector(state => state.articles);

  const groups = groupsObj ? Object.values(groupsObj) : [];

  const fetchedArticles = fetchedArticlesObj ? Object.values(fetchedArticlesObj) :[];

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

  const figures = groups ? getFigures(groups) : [];

  const [selectedGroupId, setSelectedGroupId] = useState(undefined);


  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchCurrentUserGroups());
    }
  }, [dispatch, currentUser])


  return (
    <>
      <div className="groups-container">
        <GroupsIndex setSelectedGroupId={setSelectedGroupId} />
      </div>

      <div className="index-container">
        <NewsIndex fetchedArticles={fetchedArticles} savedArticles={[]} />

        <IndexSidebar
          selectedGroupId={selectedGroupId}
          setSelectedGroupId={setSelectedGroupId}
          figures={
            selectedGroupId === undefined ? figures : groupsObj[selectedGroupId].figures
          }
        />
      </div>
    </>
  );
}


export default MainPage;