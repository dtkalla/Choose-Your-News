import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, clearUserErrors } from '../../store/users';
import GroupsIndex from './GroupsIndex'
import './Groups.css'

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
            <img className="groups-user-icon" src="https://cdn.icon-icons.com/icons2/2468/PNG/512/user_kids_avatar_icon_149311.png"></img>
            <div className="groups-user-name">Demo</div>
            <div className="groups-user-email">Demo@user.io</div>
        </div>

        {user.groups &&
          <GroupsIndex user={user}/>
        }

        <p>A Twitter Clone</p>
        <footer>
            Copyright &copy; 2022 Chirper
        </footer>
    </div>
  );
}


export default Groups;