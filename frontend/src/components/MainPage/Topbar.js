import GroupsIndex from "../Groups/GroupsIndex";
import GroupCreate from "../Groups/GroupCreate";

function Topbar({ selectedGroupId, setSelectedGroupId }) {
    return (
        <>
            <GroupsIndex
                selectedGroupId={selectedGroupId}
                setSelectedGroupId={setSelectedGroupId}
            />
            <GroupCreate />
        </>
    );
}

export default Topbar;