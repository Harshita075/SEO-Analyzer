import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../App.css'; // Make sure this includes the responsive styles

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);

  const routes = ['analyzer', 'guide', 'about', 'login'];

  return (
    <nav
      className="navbar"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.8rem 2rem',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#e0f2ff',
        height: '110px',
        position: 'relative',
        fontFamily: "'Poppins', sans-serif",
        flexWrap: 'wrap',
      }}
    >
      {/* 🔹 Logo Left */}
      <div style={{ flex: 1 }}>
        <NavLink to="/analyzer" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={logo}
            alt="SEOCRUNCH Logo"
            style={{
              height: '100px',
              maxWidth: '490px',
              width: 'auto',
              objectFit: 'contain',
              marginLeft: '20px',
            }}
          />
        </NavLink>
      </div>

      {/* 🔹 Desktop Nav Links */}
     {/* <div className="desktop-links" style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: '1.5rem' }}> */}
<div className="desktop-links">

        {routes.map((route) => (
          <NavLink
            key={route}
            to={`/${route}`}
            style={({ isActive }) => ({
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '1rem',
              color: isActive ? '#007bff' : '#333',
              transition: 'color 0.3s',
            })}
          >
            {route.charAt(0).toUpperCase() + route.slice(1)}
          </NavLink>
        ))}
      </div>

      {/* 🔸 Mobile Menu Icon */}
      <div className="menu-icon" onClick={toggleMenu}>
        &#8942;
      </div>

      {/* 🔽 Mobile Dropdown Menu */}
      {showMenu && (
        <div
          className="mobile-dropdown"
          style={{
            position: 'absolute',
            top: '100%',
            right: '2rem',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '0.8rem 1.2rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            zIndex: 100,
          }}
        >
          {routes.map((route) => (
            <NavLink
              key={route}
              to={`/${route}`}
              style={{
                display: 'block',
                padding: '0.5rem 0',
                textDecoration: 'none',
                color: '#333',
                fontWeight: 500,
              }}
              onClick={() => setShowMenu(false)}
            >
              {route.charAt(0).toUpperCase() + route.slice(1)}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
