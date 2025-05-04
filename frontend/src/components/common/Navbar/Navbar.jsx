import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import logo from '../../../assets/cube_logo.svg';
import useUserStore from '../../../stores/userStore.js';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="button navbar-logo">
        <img src={logo} alt="Logo" className="logo-img" />
      </Link>

      <div className="navbar-links">
        {!user ? (
          <>
            <Link to="/login" className="button button-primary">Login</Link>
            {/* <Link to="/register" className="navbar-link">Register</Link> */}
          </>
        ) : (
          <>
            {user.role === "admin" && (
              <Link to="/stats" className="button button-primary">Analytics</Link>
            )}
            {/* <span className="navbar-text">Bonjour {user.name}</span> */}
            <button onClick={handleLogout} className="button-secondary">Logout</button>
          </>
        )}
      </div>

    </nav>
  );
}

export default Navbar;
