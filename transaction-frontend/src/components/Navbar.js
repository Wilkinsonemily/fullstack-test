import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Full Stack Test</h1>
      <div className="nav-links">
        <Link to="/">List</Link>
        <Link to="/add">+ Add New</Link>
      </div>
    </nav>
  );
}

export default Navbar;