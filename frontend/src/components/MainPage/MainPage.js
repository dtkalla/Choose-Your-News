import React, { useState } from "react";
import Topbar from "./Topbar";
import NewsIndex from '../Articles/NewsIndex';
import Sidebar from './Sidebar/Sidebar';
import './MainPage.css';

function MainPage() {
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  return (
    <>
      <div className="groups-container">
        <div className="groups-index-container">
          <Topbar />
        </div>
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