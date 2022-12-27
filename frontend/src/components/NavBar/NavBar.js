import { Link } from 'react-router-dom';
import './NavBar.css';
import Dropdown from './Dropdown'


function NavBar () {

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