import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUserFetchedArticles, fetchCurrentUserFetchedArticlesByGroup } from '../../store/articles';

import GroupCreate from './GroupCreate'
import './Groups.css'

function GroupsIndex({ setSelectedGroupId }) {
    const groupsObj = useSelector(state => state.groups);

    const groups = groupsObj ? Object.values(groupsObj) : [];

    const dispatch = useDispatch();

    const handleClick = (groupId = undefined) => (e) => {
      e.preventDefault();
      if(groupId){
        setSelectedGroupId(groupId);
        dispatch(fetchCurrentUserFetchedArticlesByGroup(groupId));
      }
      else {
        setSelectedGroupId(undefined);
        dispatch(fetchCurrentUserFetchedArticles());
      }
    }

    const groupItems = [];
    for(let i = 0; i < groups.length; i++) {
        const group = groups[i];
        if(group.name !== "No group") {
            const groupItem = (
                <div 
                    key={group._id} 
                    className="groups-index-items-container"
                    onClick={handleClick(group._id)}
                >
                    <img 
                        className="groups-index-items-icon" 
                        src="https://www.iconpacks.net/icons/2/free-folder-icon-1437-thumb.png"
                    />

                    <div className="groups-index-items-details">
                        <h1 className="groups-index-items-name">
                            {group.name}
                        </h1>
                    </div>
                </div>
            )
            groupItems.push(groupItem);
        }
    }

    return (
        <div className="groups-index-container">
            <div onClick={handleClick()}>
                <h1>All Figures</h1>
            </div>
            {groupItems}
            <GroupCreate />
        </div>
    );
}


export default GroupsIndex;