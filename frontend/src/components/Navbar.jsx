import React from 'react';
import './Navbar.css';

// The Navbar now receives the current 'page' to highlight the active link.
function Navbar({ page, setPage }) {
  
  // A helper function to determine if a link is active
  const getLinkClass = (linkName) => {
    return `navbar-item ${page === linkName ? 'active' : ''}`;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <a onClick={() => setPage('home')} href="#" className="navbar-item">
            SplitIt
          </a>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            <a onClick={() => setPage('home')} href="#" className={getLinkClass('home')}>
              Home
            </a>
            <a onClick={() => setPage('groups')} href="#" className={getLinkClass('groups')}>
              Groups
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
