import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from '../../context/Modal';
import { LargeModal } from '../../context/Modal';
import { createGroup } from '../../store/groups';
import { fetchUser, clearUserErrors } from '../../store/users';
import './Groups.css'

function GroupsCreate({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [groupName, setGroupName] = useState("")

    const [showGroupCreateModal, setShowGroupCreateModal] = useState(false);

    const handleClose = () => {
        setShowGroupCreateModal(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowGroupCreateModal(false)

        return dispatch(
            createGroup({ user: user._id, name: groupName, figures: [], share: true })
        )
    }


    return (
        <>
            <div className="groups-index-items-container" onClick={() => setShowGroupCreateModal(true)}>
                <img className="groups-index-items-icon" src="https://iconarchive.com/download/i22631/kyo-tux/aeon/Sign-Add.ico"></img>
                <div className="groups-index-items-details">
                    <h1 className="groups-index-items-name">
                        {/* Create a Group */}
                    </h1>
                </div>         
            </div>
            {showGroupCreateModal && (
            <LargeModal onClose={() => handleClose()}>
                <form onSubmit={handleSubmit}>
                    Name:
                    <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                    <br />
                    <button type="submit">Create</button>
                </form>
            </LargeModal>
            )}
        </>
    );
}


export default GroupsCreate;