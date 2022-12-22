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

  const groups = useSelector(state => Object.values(state.groups));

  const savedArticles = useSelector(state => state.articles.saved);

  const fetchedArticles = useSelector(state => state.articles.fetched);

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

  const [selectedGroup, setSelectedGroup] = useState(undefined);


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
      <div className="groups-container">
        <GroupsIndex groups={groups} setSelectedGroup={setSelectedGroup} />
      </div>

      <div className="index-container">
        {fetchedArticles &&
          <NewsIndex fetchedArticles={fetchedArticles} savedArticles={savedArticles} />
        }

        {groups &&
          <IndexSidebar
            groupId={
              selectedGroup === undefined ? undefined : selectedGroup._id
            }

            figures={
              selectedGroup === undefined ? figures : selectedGroup.figures
            } 
          />
        }
      </div>
    </>
  );
}


export default MainPage;