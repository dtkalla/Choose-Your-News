import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, clearUserErrors } from '../../store/users';

import GroupsIndex from './GroupsIndex'
import './Groups.css'
import groupsimg from './groups-img.png'


function Groups() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const user = useSelector(state => state.users.user);

  useEffect(() => {
    dispatch(fetchUser());
    return () => dispatch(clearUserErrors());
  }, [dispatch])

  if (!user) {
    return null
  }

  return (
    <div className="groups-container">
        <div className="groups-user-profile">
            <img className="groups-user-icon" src={groupsimg}></img>
            <div className="groups-user-name">Demo</div>
            <div className="groups-user-email">Demo@user.io</div>
        </div>

        {user.groups &&
          <GroupsIndex user={user}/>
        }

        
    </div>
  );
}


export default Groups;