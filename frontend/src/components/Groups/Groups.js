import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearGroupErrors, fetchUserGroups } from '../../store/groups';
import GroupsIndex from './GroupsIndex'
import './Groups.css'

function Groups() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const userGroups = useSelector(state => state.groups.user);

  useEffect(() => {
    dispatch(fetchUserGroups(currentUser._id));
    return () => dispatch(clearGroupErrors());
  }, [dispatch])

  if (!(userGroups.length > 0)) {
    return null
  }

  return (
    <div className="groups-container">
        <div className="groups-user-profile">
            <img className="groups-user-icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-WUx40RcbMrWzkDttvsv2_JkDqm0UezjQWw&usqp=CAU"></img>
            <div className="groups-user-name">Demo</div>
            <div className="groups-user-email">Demo@user.io</div>
        </div>


        <GroupsIndex groups={userGroups}/>


        <p>A Twitter Clone</p>
        <footer>
            Copyright &copy; 2022 Chirper
        </footer>
    </div>
  );
}


export default Groups;