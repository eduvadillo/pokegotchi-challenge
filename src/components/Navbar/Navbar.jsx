import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";

const Navbar = (props) => {
  return (
    <nav>
      <Link to={PATHS.HOMEPAGE} className='nav__projectName'>
        {CONSTS.CAPITALIZED_APP} - created by Edu Vadillo
      </Link>

      <div className='nav__authLinks'>
        {props.user ? (
          <>
            <Link to={PATHS.HOMEPAGELOGIN} className='authLink'>
              Create new game
            </Link>
            <Link to={PATHS.MYGAMES} className='authLink'>
              My games
            </Link>
            <button className='nav-logoutbtn' onClick={props.handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={PATHS.SIGNUPPAGE} className='authLink'>
              Signup
            </Link>
            <Link to={PATHS.LOGINPAGE} className='authLink'>
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
