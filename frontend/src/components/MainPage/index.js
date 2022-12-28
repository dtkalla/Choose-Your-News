import React, { useState } from "react";
import Topbar from "./Topbar";
import FetchedArticlesIndex from "../Articles/FetchedArticlesIndex";
import Sidebar from "./Sidebar";
import "./index.css";

function MainPage() {
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  return (
    <>
      <div className="top-bar-container">
        <Topbar
          selectedGroupId={selectedGroupId}
          setSelectedGroupId={setSelectedGroupId}
        />
      </div>
      <div className="body-container">
        <FetchedArticlesIndex />
        <Sidebar
          selectedGroupId={selectedGroupId}
          setSelectedGroupId={setSelectedGroupId}
        />
      </div>
    </>
  );
}

export default MainPage;