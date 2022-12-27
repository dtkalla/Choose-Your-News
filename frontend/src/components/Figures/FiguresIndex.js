import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUserFetchedArticlesByFigure } from '../../store/articles';
import { deleteFigure } from '../../store/groups';

const FiguresIndex = ({ selectedGroupId }) => {
    const groups = useSelector(state => state.groups);

    const dispatch = useDispatch();
    
    const handleShowFigure = (figureId) => (e) => {
        e.preventDefault();
        dispatch(fetchCurrentUserFetchedArticlesByFigure(figureId));
    }

    const handleDeleteFigure = (selectedGroupId, figureId) => (e) => {
        e.preventDefault();
        dispatch(deleteFigure(figureId, selectedGroupId));
    }

    function getFigures(groups) {
        const figures = [];
        if (selectedGroupId) {
            const group = groups[selectedGroupId];
            for (let i = 0; i < group.figures.length; i++) {
                figures.push(group.figures[i]);
            }
        }
        else {
            const groupsArray = Object.values(groups);
            for (let i = 0; i < groupsArray.length; i++) {
                const group = groupsArray[i];
                for (let j = 0; j < group.figures.length; j++) {
                    figures.push(group.figures[j]);
                }
            }
        }
        return figures;
    }

    const figures = groups ? getFigures(groups) : [];

    const figureItems = [];

    for (let i = 0; i < figures.length; i++) {
        const figure = figures[i];
        const figureItem = (
            <div key={figure._id}>
                <div
                    className="index-sidebar-groups"
                    onClick={handleShowFigure(figure._id)}
                >
                    {figure.name}
                </div>
                <div id='delete-button-div'>
                    <div id='empty-spacing-div'></div>
                    <button className="delete-button"
                        onClick={handleDeleteFigure(selectedGroupId, figure._id)}
                    >
                        {selectedGroupId ? "remove from group" : "delete"}
                    </button>
                </div>
            </div>
        );
        figureItems.push(figureItem);
    };

    return (
        <>
            {figureItems}
        </>
    );
}

export default FiguresIndex;