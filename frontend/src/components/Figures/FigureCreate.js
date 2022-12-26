import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { LargeModal } from '../../context/Modal';

function FigureCreate({ selectedGroupId, value, setValue, handleSubmit, setShowModal}) {
    const [figureName, setFigureName] = useState(undefined);

    const dispatch = useDispatch();

    const [showFigureCreateModal, setShowFigureCreateModal] = useState(false);

    const openModal = (e) => {
        e.preventDefault();
        setShowFigureCreateModal(true);
    }

    const closeModal = (e) => {
        e.preventDefault();
        setShowFigureCreateModal(false);
    }

    const noGroup = useSelector(state => Object.values(state.groups)
        .find(group => group.name === "No group"));

    let inputField;

    if (selectedGroupId) {
        const defaultOption = (
            <option value={undefined} default>select figure</option>
        );

        const figureOptions = [defaultOption];

        for (let i = 0; i < noGroup.figures.length; i++) {
            const figure = noGroup.figures[i];
            const figureOption = (
                <option value={figure._id}>{figure.name}</option>
            );
            figureOptions.push(figureOption);
        }

        inputField = (
            <>
                <select 
                    value={figureName}
                    onChange={e => setFigureName(e.target.value)} 
                >
                    {figureOptions}
                </select>
            </>
        );
    }
    else {
        inputField = (
            <>
                <input
                    type="text"
                    value={figureName}
                    onChange={e => setFigureName(e.target.value)}
                />
            </>
        );
    }

    return (
        <>
            <div className="title-add">
                <button className="add-button" onClick={openModal}>
                    {selectedGroupId ? "add figure" : "create figure"}
                </button>
            </div>

            {showFigureCreateModal &&
            <LargeModal onClose={closeModal}>
                <form className="figure-form" onSubmit={handleSubmit}>
                    <div className='modal-words'>
                        enter a name to create a figure
                    </div>
                    <span>
                        name: 
                    </span>
                    {inputField}
                    <br />
                    <button className="form-button" type="submit">
                        create figure
                    </button>
                </form>
            </LargeModal>
            }
        </>
    );
}

export default FigureCreate;