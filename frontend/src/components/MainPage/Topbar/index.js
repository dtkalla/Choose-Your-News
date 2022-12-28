import GroupsIndex from "../../Groups/GroupsIndex";
import GroupCreate from "../../Groups/GroupCreate";
import "./index.css";

function Topbar({ selectedGroupId, setSelectedGroupId }) {
    return (
        <div className="groups-index-container">
            <GroupsIndex
                selectedGroupId={selectedGroupId}
                setSelectedGroupId={setSelectedGroupId}
            />
            <GroupCreate />
        </div>
    );
}

export default Topbar;