import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { deleteGroup, createFigure, deleteFigure } from '../../store/groups';
import { fetchCurrentUserGroups } from '../../store/groups';
import { fetchCurrentUserFetchedArticles, fetchCurrentUserFetchedArticlesByGroup, fetchCurrentUserFetchedArticlesByFigure } from '../../store/articles';
import IndexModal from "./IndexModal";

import './MainPage.css'
import deleteicon from './delete.png'


function IndexSidebar({ selectedGroupId, setSelectedGroupId, setSelectedFigureId }) {
  const currentUser = useSelector(state => state.session.user);

  const groups = useSelector(state => state.groups);

  const dispatch = useDispatch();
  useEffect(() => {
    if(currentUser) {
      dispatch(fetchCurrentUserGroups());

      // if(selectedGroupId){
      //   dispatch(fetchCurrentUserFetchedArticlesByGroup(selectedGroupId));
      // }
      // else {
      //   dispatch(fetchCurrentUserFetchedArticles());
      // }
    }
  }, [currentUser])


  const [figure, setFigure] = useState(undefined);
  const [showFigureCreateModal, setShowFigureCreateModal] = useState(false);


  const handleShowFigure = (figure) => (e) => {
    e.preventDefault();
    dispatch(fetchCurrentUserFetchedArticlesByFigure(figure));
    setSelectedFigureId(figure._id);
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


  function getFigures(groups) {
    const figures = [];
    if (selectedGroupId) {
      const group = groups[selectedGroupId];
      for (let i = 0; i < group.figures.length; i++) {
        figures.push(group.figures[i]);
      }
    }
    else {
      const groupsArray = Object.values(groups);
      for (let i = 0; i < groupsArray.length; i++) {
        const group = groupsArray[i];
        for (let j = 0; j < group.figures.length; j++) {
          figures.push(group.figures[j]);
        }
      }
    }
    return figures;
  }

  const figures = groups ? getFigures(groups) : [];
  // const figures = [];

  const figureItems = [];
  for (let i = 0; i < figures.length; i++) {
    const figure = figures[i];
    const figureItem = (
      <>
        <div
          key={figure._id}
          className="index-sidebar-groups"
          onClick={handleShowFigure(figure)}
        >
          {figure.name}
        </div>
        <div id='delete-button-div'>
          <div id='empty-spacing-div'></div>
          <button className="delete-button"
            onClick={handleDeleteFigure(selectedGroupId, figure._id)}
          >
            {/* {selectedGroupId ? "Remove figure from group" : "Delete figure"} */}
            {selectedGroupId ? "Remove" : "Delete"}
          </button>
        </div>
      </>
    );
    figureItems.push(figureItem);
  };

  return (
    <>
    <div className="index-sidebar-container">
      
      <div className="index-sidebar-title">
        <h1>
          {selectedGroupId ? 
          `${groups[selectedGroupId].name} figures` : "All figures"}
        </h1>
        <div className="title-add">
          <button className="add-button" onClick={() => setShowFigureCreateModal(true)}>
            {selectedGroupId ? "Add" : "Create"}
          </button>
        </div>
      </div>
      
      <div className="index-sidebar-groups-container">
        
        <hr></hr>
        {figureItems }
       
        <hr></hr>
        
        {selectedGroupId &&
          <div 
           
            className="index-sidebar-groups"
            onClick={handleDeleteGroup(selectedGroupId)}
          >

            <div className='delete-position'> <div class-name='delete-header'>delete group</div><img className='delete-icon' src={deleteicon}></img></div>
            
          </div>
        }

      
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
  