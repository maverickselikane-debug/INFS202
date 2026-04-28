import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  function handleLogout() {
    // Clear the token and username
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/home">🎓 Student Directory</Link>
      </div>

      <div className="navbar-links">
        <Link to="/home">Home</Link>
        <Link to="/list">Students</Link>
        <Link to="/add">Add Student</Link>
      </div>

      <div className="navbar-user">
        <span>Hi, {username}</span>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
