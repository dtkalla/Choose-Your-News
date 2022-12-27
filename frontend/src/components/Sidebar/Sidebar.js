import FigureCreate from "../Figures/FigureCreate";
import FiguresIndex from "../Figures/FiguresIndex";
import GroupDelete from "../Groups/GroupDelete";
import '../MainPage/MainPage.css';

function Sidebar({ selectedGroupId, setSelectedGroupId }) {
  return (
    <div className="index-sidebar-container">
      <div className="index-sidebar-title">
        <FigureCreate selectedGroupId={selectedGroupId} />
      </div>
      <div className="index-sidebar-groups-container">
        <hr></hr>
        <FiguresIndex selectedGroupId={selectedGroupId} />
        <hr></hr>
        <GroupDelete selectedGroupId={selectedGroupId} setSelectedGroupId={setSelectedGroupId} />
      </div>
    </div>
  );
}

export default Sidebar;