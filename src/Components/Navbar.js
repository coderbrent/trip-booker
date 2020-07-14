import React from 'react';
import { BrowserRouter as Router,
  Link,
  Switch,
  Route,
} from 'react-router-dom';
import UserAvatar from '../Components/UserAvatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoginButton from './LoginButton';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  const { isAuthenticated, user } = useAuth0();
  
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item">
        <h1 className="title">Trip Maker</h1>
      </a>
  
      <a 
        role="button" 
        className="navbar-burger burger" 
        aria-label="menu" 
        aria-expanded="false" 
        data-target="navigation"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
  
    <div id="navigation" className="navbar-menu">
      <div className="navbar-start">
        <a className="navbar-item">
          Home
        </a>
        <a className="navbar-item">
          My Trips
        </a>
        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link">
            More
          </a>
          <div className="navbar-dropdown">
            <a className="navbar-item">
              About
            </a>
            <a className="navbar-item">
              Contact
            </a>
            <hr className="navbar-divider" />
            <a className="navbar-item">
              Report an issue
            </a>
          </div>
        </div>
      </div>
  
        <div className="navbar-end">
          <div className="navbar-item">
            <div style={{ display: 'flex' }}>{ isAuthenticated ? <UserAvatar user={user} /> : null }</div>
          </div>
          <div className="navbar-item">
            <div className="buttons">
              <LoginButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;