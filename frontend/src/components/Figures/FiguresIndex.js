import { useDispatch, useSelector } from 'react-redux';
import { deleteFigure } from '../../store/groups';

const FiguresIndex = ({ selectedGroupId, setSelectedFigureId }) => {
    const groups = useSelector(state => state.groups);

    const dispatch = useDispatch();
    
    const handleShowFigure = (figure) => (e) => {
        e.preventDefault();
        // dispatch(fetchCurrentUserFetchedArticlesByFigure(figure));
        setSelectedFigureId(figure._id);
    }

    const handleDeleteFigure = (selectedGroupId, figureId) => (e) => {
        e.preventDefault();
        dispatch(deleteFigure(selectedGroupId, figureId));
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
                    onClick={handleShowFigure(figure)}
                >
                    {figure.name}
                </div>
                <div id='delete-button-div'>
                    <div id='empty-spacing-div'></div>
                    <button className="delete-button"
                        onClick={handleDeleteFigure(selectedGroupId, figure._id)}
                    >
                        {/* {selectedGroupId ? "Remove figure from group" : "Delete figure"} */}
                        {selectedGroupId ? "remove" : "delete"}
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