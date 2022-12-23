import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { createGroup } from '../../store/groups';

import { LargeModal } from '../../context/Modal';
import './Groups.css'
import add from './add.png'

function GroupsCreate() {
    const currentUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();

    const [groupName, setGroupName] = useState(undefined);

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
        setGroupName(undefined);
        setShowGroupCreateModal(false);
    }


    return (
        <>
            <div className="groups-index-items-container" onClick={openModal}>
                <div className="add">
                <img 
                    className="groups-index-items-icon" 
                    src={add} 
                />
                </div>
                <div className="groups-index-items-details">
                    <h1 className="groups-index-items-name">
                        {/* Create a Group */}
                    </h1>
                </div>
            </div>

            {showGroupCreateModal && (
            <LargeModal onClose={closeModal}>
                <form className="figure-form" onSubmit={handleSubmit}>
                    <div className='modal-words'>
                        Enter a name to create a group
                    </div>
                    <span>Name:</span>
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