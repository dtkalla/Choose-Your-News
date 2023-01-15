import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createFigure } from "../../store/groups";
import { Modal } from "../../context/Modal";
import "./css/FigureCreate.css";

function FigureCreate({ selectedGroupId }) {
    const [figure, setFigure] = useState(null);

    const dispatch = useDispatch();

    const [showFigureCreateModal, setShowFigureCreateModal] = useState(false);

    const handleCreateFigure = (e) => {
        e.preventDefault();
        if (figure) {
            dispatch(createFigure(figure, selectedGroupId));
        }
        setFigure(null);
        setShowFigureCreateModal(false);
    }

    const openModal = (e) => {
        e.preventDefault();
        setFigure(null);
        setShowFigureCreateModal(true);
    }

    const closeModal = (e) => {
        e.preventDefault();
        setFigure(null);
        setShowFigureCreateModal(false);
    }

    const groups = useSelector(state => state.groups);
    const noGroup = Object.values(groups)
        .find(group => group.name === "No group");

    let inputField;

    if (selectedGroupId) {
        const defaultOption = (
            <option key={"null"} value={""} default>Select Figure</option>
        );

        const figureOptions = [defaultOption];

        for (let i = 0; i < noGroup.figures.length; i++) {
            const figure = noGroup.figures[i];
            const figureOption = (
                <option key={figure._id} value={figure._id}>{figure.name}</option>
            );
            figureOptions.push(figureOption);
        }

        inputField = (
            <>
                <select 
                    value={figure ? figure : ""}
                    onChange={e => setFigure(e.target.value)} 
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
                    value={figure ? figure : ""}
                    onChange={e => setFigure(e.target.value)}
                />
            </>
        );
    }

    return (
        <>
            <h1 className="sidebar-title">
                {selectedGroupId ? `${groups[selectedGroupId].name}` : "All"} figures
            </h1>
            <div className="title-add">
                <button className="add-button" onClick={openModal}>
                    {selectedGroupId ? "Add" : "Create"} Figure
                </button>

                {showFigureCreateModal &&
                <Modal onClose={closeModal}>
                    <form className="figure-form" onSubmit={handleCreateFigure}>
                        <div className='modal-words'>
                            Enter a name to { selectedGroupId ? "add" : "create" } a figure
                        </div>
                        <span>
                            Name:
                        </span>
                        {inputField}
                        <br />
                        <button className="form-button" type="submit">
                            {selectedGroupId ? "Add" : "Create"} Figure
                        </button>
                    </form>
                </Modal>
                }
            </div>
        </>
    );
}

export default FigureCreate;