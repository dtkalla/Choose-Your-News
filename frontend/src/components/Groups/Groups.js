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
            <img className="groups-user-icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-WUx40RcbMrWzkDttvsv2_JkDqm0UezjQWw&usqp=CAU"></img>
            <div className="groups-user-name">Demo</div>
            <div className="groups-user-email">Demo@user.io</div>
        </div>


        <GroupsIndex groups={user.groups}/>


        <p>A Twitter Clone</p>
        <footer>
            Copyright &copy; 2022 Chirper
        </footer>
    </div>
  );
}


export default Groups;