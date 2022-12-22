import { useDispatch } from 'react-redux';

import { deleteGroup } from '../../store/groups';
import { fetchCurrentUserFetchedArticlesByFigure } from '../../store/articles';

import './MainPage.css'


function IndexSidebar({ groupId, figures }) {
  const dispatch = useDispatch();
  
  const handleClick = (figureName) => (e) => {
    e.preventDefault();
    dispatch(fetchCurrentUserFetchedArticlesByFigure(figureName));
  }

  const handleDelete = (groupId) => (e) => {
    e.preventDefault();
    dispatch(deleteGroup(groupId));
  }

  const figureItems = [];
  for (let i = 0; i < figures.length; i++) {
    const figure = figures[i];
    const figureItem = (
      <div 
        key={figure._id}
        className="index-sidebar-groups" 
        onClick={handleClick(figure.name)}
      >
        {figure.name}
      </div>
    );
    figureItems.push(figureItem);
  };

  return (
    <div className="index-sidebar-container">
      
      <h1 className="index-sidebar-title">Figures</h1>
      
      <div className="index-sidebar-groups-container">
        
        <hr></hr>
        {figureItems}
        <hr></hr>
        
        {groupId &&
          <div 
            className="index-sidebar-groups"
            onClick={handleDelete(groupId)}
          >
            <h2>Delete Group</h2>
          </div>
        }
        <hr></hr>
      
      </div>

      <div className="index-sidebar-footer">
        See more figures
      </div>

    </div>
  );
}

export default IndexSidebar;
  