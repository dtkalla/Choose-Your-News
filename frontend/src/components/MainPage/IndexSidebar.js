import './MainPage.css'


function IndexSidebar({ groups }) {

  const groupItems = groups.map((group) => {
    if (group.name !== "No group") {
      return (
        <div key={group.id} className="index-sidebar-groups">
          {group.name}
        </div>
      )
    }
  })


  return (
    <div className="index-sidebar-container">
      <h1 className="index-sidebar-title">Groups</h1>
      <div className="index-sidebar-groups-container">
        {groupItems}
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
  