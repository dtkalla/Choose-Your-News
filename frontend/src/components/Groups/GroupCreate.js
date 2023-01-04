import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createGroup } from "../../store/groups";
import { Modal } from "../../context/Modal";
import createIcon from "./images/create.png";
import "./css/GroupsIndex.css";
import "./css/GroupCreate.css";

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
                className="create-group-container"
                onClick={openModal}
            >
                <div className="create-group-icon-container">
                    <img 
                        className="create-group-icon" 
                        src={createIcon}
                        alt="create-group-icon"
                    />
                </div>
                <div className="create-group-details">
                    <h1 className="create-group-name">
                        Create Group
                    </h1>
                </div>
            </div>

            {showGroupCreateModal && (
            <Modal onClose={closeModal}>
                <form className="figure-form" onSubmit={handleCreateGroup}>
                    <div className='modal-words'>
                        Enter a name to create a group
                    </div>
                    <span>
                        Name:
                    </span>
                    <input
                        type="text" 
                        value={groupName ? groupName : ""}
                        onChange={(e) => setGroupName(e.target.value)} 
                    />
                    <br />
                    <button className="form-button" type="submit">
                        Create Group
                    </button>
                </form>
            </Modal>
            )}
        </>
    );
}

export default GroupCreate;