import React, { useState } from "react";
import { LargeModal } from "../../context/Modal";

import profile from './images/profile.png'

function Info() {
    const [showGroupCreateModal, setShowGroupCreateModal] = useState(false);

    const openModal = (e) => {
        e.preventDefault();
        setShowGroupCreateModal(true);
    }

    const closeModal = (e) => {
        e.preventDefault();
        setShowGroupCreateModal(false);
    }

    return (
        <>
            <img className='info-button' onClick={openModal} src="https://cdn-icons-png.flaticon.com/512/32/32175.png" />

            {showGroupCreateModal && (
            <LargeModal onClose={closeModal}>
                <div className="instructions-container">
                    <h1 className="instructions-header">Instructions</h1>
                    <h1 className="instructions-title">Groups</h1>
                    <p className="instructions-details">
                        The default group, All, contains all figures you follow -- you can create more specific groups as well. In the newly created group, you can add a figure that doesn't already belong to another group.
                        One figure cannot belong to two different groups at the same time. You can remove the figure from a group if you wish to add it to a different group, leave it ungrouped, or delete the figure entirely.
                    </p>
                    <h1 className="instructions-title">Figures</h1>
                    <p className="instructions-details">
                        When you create a figure, it starts as just part of the all group. By clicking on a figure on the sidebar, you can fetch articles related only to that figure. You can add ungrouped figures from your default All group into your custom groups.
                    </p>
                </div>
            </LargeModal>
            )}
        </>
    );
}

export default Info;