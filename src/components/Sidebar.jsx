import React from 'react';
import { Link } from "react-router-dom";
import logoApp from "../assets/dailymind_logo.png";

const Sidebar = () => {
  const menus = [
    { name: 'Home', path: "/home"},
    { name: 'Pomodoro', path: "/pomodoro"},
    { name: 'To-Do List', path: "/todolist"},
    { name: 'Mood Tracker', path: "/moodtrack"},
    { name: 'Jurnal', path: "/journal" },
    { name: 'Exit', path: "/"}
  ];

  return (
    <aside style={sidebarStyle}>
      <div style={logoContainerStyle}>
        <img src={logoApp} alt="DailyMind Logo" style={logoImageStyle} />
      </div>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '70px' }}>
        {menus.map((item) => (
          <li key={item.name} style={{ marginBottom: '8px' }}>
            <Link to={item.path} style={menuItemStyle}>
              <span style={{ marginRight: '10px' }}>{item.icon}</span>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

    </aside>
  );
};

const sidebarStyle = {
  width: '240px',
  height: '100vh',
  background: 'rgba(255, 255, 255, 0.15)', // Transparansi liquid
  backdropFilter: 'blur(10px) saturate(180%)', // Efek blur kaca
  WebkitBackdropFilter: 'blur(10px) saturate(180%)',
  borderRight: '1px solid rgba(255, 255, 255, 0.8)',
  borderRadius: '0 30px 30px 0',
  boxShadow: '8px 0 32px rgba(31, 38, 135, 0.2), inset 0 4px 20px rgba(255, 255, 255, 0.3)',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  position: 'sticky',
  top: 0,
  left: 0,
  zIndex: 50
};

const logoContainerStyle = {
  marginBottom: '40px',
  display: 'flex',
  justifyContent: 'center', // Agar logo di tengah secara horizontal
  alignItems: 'center',
  paddingTop: '10px',
  width: '100%',
};

const logoImageStyle = {
  height: '60px',
  width: 'auto',
  maxWidth: '100%',
  display: 'block',
};

const menuItemStyle = {
  padding: '12px 15px',
  borderRadius: '8px',
  color: '#1F2A44',
  textDecoration: 'none',
  fontWeight: '500',
  display: 'flex',
  alignItems: 'center',
  transition: '0.2s',
  marginTop: '20px'
};

export default Sidebar;