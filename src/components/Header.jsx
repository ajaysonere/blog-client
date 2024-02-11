import { Link } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { AiOutlineClose } from 'react-icons/ai';
import { useState, useContext } from "react";

import { UserContext } from '../contexts/userContext';

const Header = () => {
  
  const [showNavbar , setShowNavbar] = useState(true);
  const {currentUser} = useContext(UserContext);
  
  const id = currentUser?.id;
  
  const handleNavbar = () => {
      setShowNavbar(!showNavbar);
  }
  
  
  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="nav__logo">
          <img src="/images/logo.png"></img>
        </Link>
        {currentUser?.id && showNavbar && (
          <ul className="nav__menu">
            <li>
              <Link to={`/profile/${id}`}>{currentUser.name}</Link>
            </li>
            <li>
              <Link to="/create">Create Post</Link>
            </li>
            <li>
              <Link to="/authors" className="authors">
                Authors
              </Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        )}
        { !currentUser?.id && showNavbar && (
          <ul className="nav__menu">
            <li>
              <Link to="/authors" className="authors">
                Authors
              </Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
        <button className="nav__toggle-btn" onClick={() => handleNavbar()}>
          {showNavbar ? <AiOutlineClose /> : <FaBarsStaggered />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
