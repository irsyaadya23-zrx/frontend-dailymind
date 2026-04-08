import React from 'react';
import { Link } from "react-router-dom"

const Sidebar = () => {
  const menus = [
    { name: 'Home', path: "/home"},
    { name: 'Pomodoro', path: "/pomodoro"},
    { name: 'To-Do List', path: "/todolist"},
    { name: 'Mood Tracker', path: "/moodtrack"},
    { name: 'Jurnal', path: "/journal" },
  ];

  return (
    <aside style={sidebarStyle}>
      <div style={logoStyle}>DailyMind</div>
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {menus.map((item) => (
          <li key={item.name} style={menuItemStyle}>
            <span style={{ marginRight: '10px' }}>{item.icon}</span>
            <Link to={item.path} style={menuItemStyle}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Profile ditaruh di bawah Sidebar biasanya cakep */}
      <div style={profileStyle}>
        <div style={avatarStyle}>SR</div>
        <span style={{ fontSize: '0.9rem' }}>Syiefa Rahma</span>
      </div>
    </aside>
  );
};

const sidebarStyle = {
  width: '240px',
  height: '100vh',
  background: '#ffffff',
  borderRight: '1px solid #eee',
  position: 'fixed',
  top: 0,
  left: 0,
  padding: '20px',
  display: 'flex',
  flexDirection: 'column'
};

const logoStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#4A90E2',
  marginBottom: '40px',
  textAlign: 'center'
};

const menuItemStyle = {
  padding: '12px 15px',
  marginBottom: '8px',
  borderRadius: '8px',
  cursor: 'pointer',
  color: '#555',
  fontWeight: '500',
  transition: '0.2s',
  display: 'flex',
  alignItems: 'center'
};

const profileStyle = {
  marginTop: 'auto', // Dorong ke paling bawah sidebar
  paddingTop: '20px',
  borderTop: '1px solid #eee',
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
};

const avatarStyle = {
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  background: '#4A90E2',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '0.7rem',
  fontWeight: 'bold'
};

export default Sidebar;