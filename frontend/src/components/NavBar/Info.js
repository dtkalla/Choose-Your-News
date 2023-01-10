import React, { useState } from "react";
import { LargeModal } from "../../context/Modal";
import info from "./images/info.png"

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
            <img className='info-button' onClick={openModal} src={info} />

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
                        When you create a figure, it starts as just part of the All group. By clicking on a figure on the sidebar, you can fetch articles related only to that figure. You can add ungrouped figures from your default All group into your custom groups.
                    </p>
                    <h1 className="instructions-title">Articles</h1>
                    <p className="instructions-details">
                        Articles are taken from the NY Times Articles Search API.  This API has a limits of 10 requests per minute; if you request new sets of articles more frequently than that, it will stop working temporarily.  Wait a minute and it should work again. 
                    </p>
                </div>
            </LargeModal>
            )}
        </>
    );
}

export default Info;