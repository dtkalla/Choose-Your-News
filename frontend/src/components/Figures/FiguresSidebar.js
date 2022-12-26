import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { fetchCurrentUserFetchedArticles, fetchCurrentUserFetchedArticlesByGroup, fetchCurrentUserFetchedArticlesByFigure } from '../../store/articles';
import FigureCreate from "./FigureCreate";
import FiguresIndex from "./FiguresIndex";
import GroupDelete from "../Groups/GroupDelete";
import '../MainPage/MainPage.css';

function FiguresSidebar({ selectedGroupId, setSelectedGroupId, selectedFigureId, setSelectedFigureId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedFigureId) {
      // dispatch(fetchCurrentUserFetchedArticlesByGroup(selectedGroupId));
    }
    else {
      if (selectedGroupId) {
        dispatch(fetchCurrentUserFetchedArticlesByGroup(selectedGroupId));
      }
      else {
        dispatch(fetchCurrentUserFetchedArticles());
      }
    }
  }, [selectedGroupId])

  return (
    <div className="index-sidebar-container">
      <div className="index-sidebar-title">
        <FigureCreate selectedGroupId={selectedGroupId} />
      </div>
      <div className="index-sidebar-groups-container">
        <hr></hr>
        <FiguresIndex selectedGroupId={selectedGroupId} setSelectedFigureId={setSelectedFigureId} />
        <hr></hr>
        <GroupDelete selectedGroupId={selectedGroupId} setSelectedGroupId={setSelectedGroupId} />
      </div>
    </div>
  );
}

export default FiguresSidebar;