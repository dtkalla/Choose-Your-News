import './MainPage.css'


function IndexSidebar({ groups }) {

  // const groupItems = groups.map((group) => {
  //   if (group.name !== "No group") {
  //     return (
  //       <div key={group._id} className="index-sidebar-groups">
  //         {group.name}
  //       </div>
  //     )
  //   }
  // })

  const groupItems = [];
  groups.forEach(group => {
    if (group.name !== "No group") {
      const groupItem = (
        <div key={group._id} className="index-sidebar-groups">
          {group.name}
        </div>
      )
      groupItems.push(groupItem);
    }
  });


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
  