import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroup, clearGroupErrors } from '../../store/groups';
import GroupsIndex from './GroupsIndex'
import './Groups.css'

function GroupShow() {
    const groupId = useParams()
    const dispatch = useDispatch();
    // const user = useSelector(state => state.users.user);
    const group = useSelector(state => state.groups.group);

    useEffect(() => {
        dispatch(fetchGroup(groupId));
        return () => dispatch(clearGroupErrors());
    }, [dispatch])
    console.log(groupId)
    console.log(group)

    // if (!group) {
    //     return null;
    // }

  return (

    <div className="groups-container">
        <div className="groups-user-profile">
            <img className="groups-user-icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxXj6tCpW_4LDNshUHKhTxsajwGNQPjfXj3A&usqp=CAU"></img>
            <div className="groups-user-name">{group.name}</div>
            <div className="groups-user-email">Demo@user.io</div>
        </div>


        <p>A Twitter Clone</p>
        <footer>
            Copyright &copy; 2022 Chirper
        </footer>
    </div>
    
  );
}


export default GroupShow;