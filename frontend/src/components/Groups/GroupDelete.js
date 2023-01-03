import { useDispatch } from "react-redux";
import { deleteGroup } from "../../store/groups";
import deleteIcon from "./images/delete.png";
import "./css/GroupDelete.css";

const GroupDelete = ({ selectedGroupId, setSelectedGroupId }) => {
    const dispatch = useDispatch();

    const handleDeleteGroup = (selectedGroupId) => (e) => {
        e.preventDefault();
        if (selectedGroupId) {
            dispatch(deleteGroup(selectedGroupId));
            setSelectedGroupId(null);
        }
    }

    return (
        selectedGroupId ? (
            <div
                className="sidebar-body-items"
                onClick={handleDeleteGroup(selectedGroupId)}
            >
                <div className='delete-position'>
                    <div class-name='delete-header'>
                        <p>Delete Group</p>
                    </div>
                    <img 
                        className='delete-icon' 
                        src={deleteIcon} 
                        alt="delete-group-icon"
                    />
                </div>
            </div>
        ) : (
            <></>
        )
    );
}

export default GroupDelete;