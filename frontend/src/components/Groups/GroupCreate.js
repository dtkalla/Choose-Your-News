import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createGroup } from '../../store/groups';
import { LargeModal } from '../../context/Modal';
import createIcon from './images/create.png';
import './css/Groups.css';

function GroupCreate() {
    const currentUser = useSelector(state => state.session.user);

    const [groupName, setGroupName] = useState(null);

    const dispatch = useDispatch();

    const [showGroupCreateModal, setShowGroupCreateModal] = useState(false);

    const handleCreateGroup = (e) => {
        e.preventDefault();
        const newGroup = {
            user: currentUser._id,
            name: groupName,
            figures: []
        };
        dispatch(createGroup(newGroup));
        setGroupName(null);
        setShowGroupCreateModal(false);
    }

    const openModal = (e) => {
        e.preventDefault();
        setGroupName(null);
        setShowGroupCreateModal(true);
    }

    const closeModal = (e) => {
        e.preventDefault();
        setGroupName(null);
        setShowGroupCreateModal(false);
    }

    return (
        <>
            <div
                className="groups-index-items-container"
                onClick={openModal}
            >
                <div className="add">
                    <img 
                        className="groups-index-items-icon" 
                        src={createIcon} 
                    />
                </div>
                <div className="groups-index-items-details">
                    <h1 className="groups-index-items-name">
                        create group
                    </h1>
                </div>
            </div>

            {showGroupCreateModal && (
            <LargeModal onClose={closeModal}>
                <form className="figure-form" onSubmit={handleCreateGroup}>
                    <div className='modal-words'>
                        enter a name to create a group
                    </div>
                    <span>
                        name:
                    </span>
                    <input
                        type="text" 
                        value={groupName ? groupName : ""}
                        onChange={(e) => setGroupName(e.target.value)} 
                    />
                    <br />
                    <button className="form-button" type="submit">
                        create group
                    </button>
                </form>
            </LargeModal>
            )}
        </>
    );
}

export default GroupCreate;