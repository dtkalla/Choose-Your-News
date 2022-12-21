import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';
import Dropdown from './Dropdown'

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  // const getLinks = () => {
  //   if (loggedIn) {
  //     return (
  //       <div className="links-nav">
  //         <Link to={'/tweets'}>All Tweets</Link>
  //         <Link to={'/profile'}>Profile</Link>
  //         <Link to={'/tweets/new'}>Write a Tweet</Link>
  //         <button onClick={logoutUser}>Logout</button>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="links-auth">
  //         <Link to={'/signup'}>Signup</Link>
  //         <Link to={'/login'}>Login</Link>
  //       </div>
  //     );
  //   }
  // }

  return (
    <nav className="nav-bar-container">
      <div className="nav-bar">
        <div className="left-nav">
          <Link className="logo" to="/index">Choose Your News</Link>
        </div>
        <div classname="right-nav">
          <Dropdown />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;