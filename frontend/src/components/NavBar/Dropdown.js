import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from '../../store/session';

import './NavBar.css';
import profile from '../../assets/profile.png'

function Dropdown () {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logoutUser = e => {
    e.preventDefault();
    dispatch(logout());
  }

  return (
    <>
      <img className='dropdown-button' onClick={openMenu} src={profile} />
    
      {showMenu && (
        <ul className="dropdown-menu">
<<<<<<< HEAD
          {/* <Link className="dropdown-options" to="/articles/">
              Saved Articles
          </Link> */}
          <Link className="dropdown-options" to="/savedArticles/">
=======
          <Link className="dropdown-options" to="/articles/">
>>>>>>> main
              Saved Articles
          </Link>
          <Link className="dropdown-options" to="/about/">
              About Us
          </Link>
          <li className="dropdown-options" onClick={logoutUser}>
            Logout
          </li>
        </ul>
      )}
    
    </>
  );
}

export default Dropdown;