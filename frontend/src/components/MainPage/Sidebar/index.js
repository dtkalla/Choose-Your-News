import FigureCreate from "../../Figures/FigureCreate";
import FiguresIndex from "../../Figures/FiguresIndex";
import GroupDelete from "../../Groups/GroupDelete";
import "./index.css";

function Sidebar({ selectedGroupId, setSelectedGroupId }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <FigureCreate
          selectedGroupId={selectedGroupId}
        />
      </div>
      <div className="sidebar-body">
        <hr></hr>
        <FiguresIndex
          selectedGroupId={selectedGroupId}
        />
        <hr></hr>
        <GroupDelete
          selectedGroupId={selectedGroupId}
          setSelectedGroupId={setSelectedGroupId}
        />
      </div>
    </div>
  );
}

export default Sidebar;