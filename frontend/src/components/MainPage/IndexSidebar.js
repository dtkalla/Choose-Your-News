
import './MainPage.css'


function IndexSidebar() {
    return (
      <div className="index-sidebar-container">
        <h1 className="index-sidebar-title">Groups</h1>
        <div className="index-sidebar-groups-container">
          <div className="index-sidebar-groups">
            Group 1
          </div>
          <div className="index-sidebar-groups">
            Group 2
          </div>
          <div className="index-sidebar-groups">
            Add a group
          </div>
          <div className="index-sidebar-groups">
            Add a group
          </div>
        </div>

        <div className="index-sidebar-footer">
          See more groups
        </div>
      </div>
    );
  }
  
  export default IndexSidebar;
  