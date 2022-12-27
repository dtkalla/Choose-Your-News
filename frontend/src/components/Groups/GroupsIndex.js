import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUserGroups } from '../../store/groups';
import { fetchCurrentUserFetchedArticles, 
    fetchCurrentUserFetchedArticlesByGroup } from '../../store/articles';
import folder from './images/folder.png';
import './css/Groups.css';

function GroupsIndex({ selectedGroupId, setSelectedGroupId }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCurrentUserGroups());
    }, [dispatch]);
    
    const handleSelectGroup = (groupId) => (e) => {
        e.preventDefault();
        groupId = groupId === "" ? null : groupId;
        setSelectedGroupId(groupId);
        if(groupId){
            dispatch(fetchCurrentUserFetchedArticlesByGroup(groupId));
        }
        else {
            dispatch(fetchCurrentUserFetchedArticles());
        }
    }

    const groups = useSelector(state => state.groups);
    const groupsArray = groups ? Object.values(groups) : [];
    const groupItems = [];
    for (let i = 0; i < groupsArray.length; i++) {
        const group = groupsArray[i];
        const groupId = group.name === "No group" ? "" : group._id;
        const groupName = group.name === "No group" ? "all" : group.name;
        const groupStyle = ((selectedGroupId && selectedGroupId === groupId) ||
            (!selectedGroupId && group.name === "No group")) ?
            { backgroundColor: "lightblue" } : { backgroundColor: "transparent"};
        const groupItem = (
            <div 
                className="groups-index-items-container"
                key={groupId}
                onClick={handleSelectGroup(groupId)}
                style={groupStyle}
            >
                <img 
                    className="groups-index-items-icon" 
                    src={folder}
                    alt={group.name}
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
        <>
            {groupItems}
        </>
    );
}

export default GroupsIndex;