import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';

function Dropdown () {
  const loggedIn = useSelector(state => !!state.session.user);
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

//   const getLinks = () => {
//     if (loggedIn) {
//       return (
//         <div className="links-nav">
//           <Link to={'/tweets'}>All Tweets</Link>
//           <Link to={'/profile'}>Profile</Link>
//           <Link to={'/tweets/new'}>Write a Tweet</Link>
//           <button onClick={logoutUser}>Logout</button>
//         </div>
//       );
//     } else {
//       return (
//         <div className="links-auth">
//           <Link to={'/signup'}>Signup</Link>
//           <Link to={'/login'}>Login</Link>
//         </div>
//       );
//     }
//   }

  return (
    <>
      <button className="dropdown-button" onClick={openMenu}>
        {/* {loggedIn.username} */}
          user
      </button>
    
      {showMenu && (
        <ul className="dropdown-menu">
          <li className="dropdown-options">
            Figures
          </li>
          <li className="dropdown-options">
            Figures
          </li>
          <li className="dropdown-options">
            Groups
          </li>
          <li className="dropdown-options">
            Saved Articles
          </li>
          <li className="dropdown-options">
            Logout
          </li>
        </ul>
      )}
    
    </>
  );
}

export default Dropdown;
