import { useDispatch } from "react-redux";
import { deleteGroup } from '../../store/groups';
import deleteIcon from './images/delete.png';

const GroupDelete = ({ selectedGroupId, setSelectedGroupId }) => {
    const dispatch = useDispatch();

    const handleDeleteGroup = (selectedGroupId) => (e) => {
        e.preventDefault();
        dispatch(deleteGroup(selectedGroupId));
        setSelectedGroupId(undefined);
    }

    return (
        selectedGroupId ? (
            <div
                className="index-sidebar-groups"
                onClick={handleDeleteGroup(selectedGroupId)}
            >
                <div className='delete-position'>
                    <div class-name='delete-header'>
                        <p>delete group</p>
                    </div>
                    <img className='delete-icon' src={deleteIcon} />
                </div>
            </div>
        ) : (
            <></>
        )
    );
}

export default GroupDelete;