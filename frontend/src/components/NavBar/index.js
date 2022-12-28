import { Link } from 'react-router-dom';
import './NavBar.css';
import Dropdown from './Dropdown'

<<<<<<< HEAD:frontend/src/components/NavBar/index.js
function NavBar() {
  // const loggedIn = useSelector(state => !!state.session.user);
  // const dispatch = useDispatch();
  
  // const logoutUser = e => {
  //     e.preventDefault();
  //     dispatch(logout());
  // }

=======

function NavBar () {
>>>>>>> main:frontend/src/components/NavBar/NavBar.js

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