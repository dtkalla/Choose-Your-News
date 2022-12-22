import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { createGroup } from '../../store/groups';

import { LargeModal } from '../../context/Modal';
import './Groups.css'


function GroupsCreate() {
    const currentUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();

    const [groupName, setGroupName] = useState("");

    const [showGroupCreateModal, setShowGroupCreateModal] = useState(false);

    const openModal = (e) => {
        e.preventDefault();
        setShowGroupCreateModal(true);
    }

    const closeModal = (e) => {
        e.preventDefault();
        setShowGroupCreateModal(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newGroup = {
            user: currentUser._id, 
            name: groupName, 
            figures: []
        };

        dispatch(createGroup(newGroup));
        setShowGroupCreateModal(false);
    }


    return (
        <>
            <div className="groups-index-items-container" onClick={openModal}>
                <img 
                    className="groups-index-items-icon" 
                    src="https://iconarchive.com/download/i22631/kyo-tux/aeon/Sign-Add.ico" 
                />

                <div className="groups-index-items-details">
                    <h1 className="groups-index-items-name">
                        {/* Create a Group */}
                    </h1>
                </div>
            </div>

            {showGroupCreateModal && (
            <LargeModal onClose={closeModal}>
                <form onSubmit={handleSubmit}>
                    Name:
                    <input
                        type="text" 
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)} 
                    />
                    <br />
                    <button type="submit">
                        Create
                    </button>
                </form>
            </LargeModal>
            )}
        </>
    );
}


export default GroupsCreate;