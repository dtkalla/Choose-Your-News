import { useSelector } from 'react-redux';

import { LargeModal } from '../../context/Modal';


function IndexModal({ selectedGroupId, value, setValue, handleSubmit, setShowModal}) {
    const noGroup = useSelector(state => Object.values(state.groups)
        .find(group => group.name === "No group"));

    let inputField;
    
    if (selectedGroupId) {
        const defaultOption = (
            <option value={undefined} default>Select Figure</option>
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
                <span>Name: </span>
                
                <select 
                    value={value}
                    onChange={e => setValue(e.target.value)} 
                >
                    {figureOptions}
                </select>
            </>
        );
    }
    else {
        inputField = (
            <>
                <span>Name: </span>
                <input
                    type="text"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
            </>
        );
    }

    return (
        <LargeModal onClose={() => setShowModal(false)}>
            <form className="figure-form" onSubmit={handleSubmit}>
                <div className='modal-words'>
                    Enter a name to create a figure
                </div>
                { inputField }

                <br />

                <button type="submit">
                    Create
                </button>
            </form>
        </LargeModal>
    );
}


export default IndexModal;