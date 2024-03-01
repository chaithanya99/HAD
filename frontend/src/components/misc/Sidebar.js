// src/components/Sidebar.js
import React from 'react';
import './NavbarSidebar.css'; // Import the CSS file for styling

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="user-info">
        <span>Username</span>
        <div className="user-photo">Photo</div>
      </div>
      <div className="sidebar-icons">
        <div className="icon">Icon 1</div>
        <div className="icon">Icon 2</div>
      </div>
    </aside>
  );
};

export default Sidebar;
