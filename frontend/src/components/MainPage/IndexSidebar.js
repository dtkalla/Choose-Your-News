import { useDispatch } from 'react-redux';
import './MainPage.css'


function IndexSidebar({ groups }) {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch();
  }

  const groupItems = [];
  for (let i = 0; i < groups.length; i++) {
    const group = groups[i];
    if (group.name !== "No group") {
      const groupItem = (
        <div 
          key={group._id}
          className="index-sidebar-groups" 
          onClick={handleClick}
        >
          {group.name}
        </div>
      );
      groupItems.push(groupItem);
    }
  };

  return (
    <div className="index-sidebar-container">
      
      <h1 className="index-sidebar-title">Groups</h1>
      
      <div className="index-sidebar-groups-container">
        
        <hr></hr>
        {groupItems}
        <hr></hr>
        
        <div className="index-sidebar-groups">
          <h2>Add a group</h2>
        </div>
        <hr></hr>
      
      </div>

      <div className="index-sidebar-footer">
        See more groups
      </div>

    </div>
  );
}

export default IndexSidebar;
  