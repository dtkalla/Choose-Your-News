import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { deleteGroup, createFigure, deleteFigure } from '../../store/groups';
import { fetchCurrentUserFetchedArticles, fetchCurrentUserFetchedArticlesByGroup, fetchCurrentUserFetchedArticlesByFigure } from '../../store/articles';

import './MainPage.css'
import IndexModal from "./IndexModal";


function IndexSidebar({ selectedGroupId, setSelectedGroupId, figures }) {
  const currentUser = useSelector(state => state.session.user);

  const groupsObj = useSelector(state => state.groups);

  useEffect(() => {
    if(currentUser) {
      if(selectedGroupId){
        dispatch(fetchCurrentUserFetchedArticlesByGroup(selectedGroupId));
      }
      else {
        dispatch(fetchCurrentUserFetchedArticles());
      }
    }
  }, [currentUser, groupsObj])

  const dispatch = useDispatch();

  const [figure, setFigure] = useState(undefined);
  const [showFigureCreateModal, setShowFigureCreateModal] = useState(false);


  const handleShowFigure = (figureName) => (e) => {
    e.preventDefault();
    dispatch(fetchCurrentUserFetchedArticlesByFigure(figureName));
  }

  const handleAddFigure = (e) => {
    e.preventDefault();
    if(figure){
      dispatch(createFigure(figure, selectedGroupId));
    }
    setFigure(undefined);
    setShowFigureCreateModal(false);
  }

  const handleDeleteFigure = (figureId, selectedGroupId) => (e) => {
    e.preventDefault();
    dispatch(deleteFigure(selectedGroupId, figureId));
  }


  const handleDeleteGroup = (selectedGroupId) => (e) => {
    e.preventDefault();
    dispatch(deleteGroup(selectedGroupId));
    setSelectedGroupId(undefined);
  }


  const figureItems = [];
  for (let i = 0; i < figures.length; i++) {
    const figure = figures[i];
    const figureItem = (
      <>
        <div 
          key={figure._id}
          className="index-sidebar-groups" 
          onClick={handleShowFigure(figure.name)}
        >
        {figure.name}
        </div>
        <div>
          <button
            onClick={handleDeleteFigure(selectedGroupId, figure._id)}
          >
            {selectedGroupId ? "Remove figure from group" : "Delete figure"}
          </button>
        </div>
      </>
    );
    figureItems.push(figureItem);
  };

  return (
    <>
    <div className="index-sidebar-container">
      
      <h1 className="index-sidebar-title">
        Figures
        <div>
          <button onClick={() => setShowFigureCreateModal(true)}>
            {selectedGroupId ? "Add figure to group" : "Add figure"}
          </button>
        </div>
      </h1>
      
      <div className="index-sidebar-groups-container">
        
        <hr></hr>
        {figureItems}
        <hr></hr>
        
        {selectedGroupId &&
          <div 
            className="index-sidebar-groups"
            onClick={handleDeleteGroup(selectedGroupId)}
          >
            <h2>Delete Group</h2>
          </div>
        }
        <hr></hr>
      
      </div>
    </div>

      {showFigureCreateModal && (
        <IndexModal
          selectedGroupId={selectedGroupId}
          value={figure}
          setValue={setFigure}
          handleSubmit={handleAddFigure}
          setShowModal={setShowFigureCreateModal}
        />
      )}
    </>
  );
}


export default IndexSidebar;
  