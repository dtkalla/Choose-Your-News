import React, { useState } from "react";
import GroupsIndex from '../Groups/GroupsIndex';
import NewsIndex from '../Articles/NewsIndex';
import Sidebar from '../Sidebar/Sidebar';
import './MainPage.css';

function MainPage() {
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  return (
    <>
      <div className="groups-container">
        <GroupsIndex 
          selectedGroupId={selectedGroupId}
          setSelectedGroupId={setSelectedGroupId}
        />
      </div>

      <div className="index-container">
        <NewsIndex />
        <Sidebar
          selectedGroupId={selectedGroupId}
          setSelectedGroupId={setSelectedGroupId}
        />
      </div>
    </>
  );
}


export default MainPage;