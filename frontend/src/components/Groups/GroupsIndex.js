import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUserFetchedArticles, fetchCurrentUserFetchedArticlesByGroup } from '../../store/articles';
import { fetchCurrentUserGroups } from '../../store/groups';
import folder from './folder.png'
import GroupCreate from './GroupCreate'
import './Groups.css'

function GroupsIndex({ setSelectedGroupId }) {
    const dispatch = useDispatch();

    const handleClick = (groupId = undefined) => (e) => {
      e.preventDefault();
      if(groupId){
        setSelectedGroupId(groupId);
        dispatch(fetchCurrentUserGroups());
        dispatch(fetchCurrentUserFetchedArticlesByGroup(groupId));
      }
      else {
        setSelectedGroupId(undefined);
        dispatch(fetchCurrentUserGroups());
        dispatch(fetchCurrentUserFetchedArticles());
      }
    }

    const groups = useSelector(state => state.groups);
    const groupsArray = groups ? Object.values(groups) : [];
    const groupItems = [];
    for (let i = 0; i < groupsArray.length; i++) {
        const group = groupsArray[i];
        const groupId = group.name === "No group" ? undefined : group._id;
        const groupName = group.name === "No group" ? "All" : group.name;
        const groupItem = (
            <div 
                className="groups-index-items-container"
                key={groupId}
                onClick={handleClick(groupId)}
            >
                <img 
                    className="groups-index-items-icon" 
                    src={folder}
                />
                <div className="groups-index-items-details">
                    <h1 className="groups-index-items-name">
                        {groupName}
                    </h1>
                </div>
            </div>
        )
        groupItems.push(groupItem);
    }

    return (
        <div className="groups-index-container">
            {groupItems}
            <GroupCreate />
        </div>
    );
}


export default GroupsIndex;