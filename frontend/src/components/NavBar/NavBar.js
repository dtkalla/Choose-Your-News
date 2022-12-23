import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
// import { logout } from '../../store/session';
import Dropdown from './Dropdown'



function NavBar () {
  // const loggedIn = useSelector(state => !!state.session.user);
  // const dispatch = useDispatch();
  
  // const logoutUser = e => {
  //     e.preventDefault();
  //     dispatch(logout());
  // }


  return (
    <nav className="nav-bar-container">
      <div className="nav-bar">
        <div className="left-nav">
          <Link className="logo" to="/">Choose Your News</Link>
        </div>
        <div className="right-nav">
          <Dropdown />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;