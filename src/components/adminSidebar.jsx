import React from 'react';
import { Link, useLocation } from "react-router-dom";
import logoApp from "../assets/dailymind_logo.png";
import homeIcon from '../assets/home.png';
import exitIcon from '../assets/exit.png';

const Sidebar = () => {
  const location = useLocation();

  const menus = [
    { name: 'Home', path: "/admin", icon: homeIcon },
    { name: 'Exit', path: "/", icon: exitIcon, isExit: true }
  ];

  return (
    <aside style={sidebarStyle}>
      
      {/* LOGO */}
      <div style={logoContainerStyle}>
        <img src={logoApp} alt="DailyMind Logo" style={logoImageStyle} />
      </div>

      {/* MENU */}
      <ul style={menuContainerStyle}>
        
        {/* MENU ATAS */}
        {menus
          .filter(item => !item.isExit)
          .map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={item.name} style={{ marginBottom: '8px' }}>
                <Link 
                  to={item.path} 
                  style={{
                    ...menuItemStyle,
                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                    color: '#1F2A44',
                    boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                    borderRadius: '50px',
                    border: isActive ? '1.5px solid white' : '1.5px solid transparent',
                  }}
                >
                  <img src={item.icon} alt={item.name} style={iconStyle} />
                  <span style={textStyle(isActive)}>
                    {item.name}
                  </span>
                </Link>
              </li>
            );
        })}

        {/* PUSH EXIT KE BAWAH */}
        <div style={{ marginTop: 'auto' }} />

        {/* EXIT */}
        {menus
          .filter(item => item.isExit)
          .map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={item.name}>
                <Link 
                  to={item.path} 
                  style={{
                    ...menuItemStyle,
                    color: '#B91C1C',
                    backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
                    border: isActive ? '1.5px solid white' : '1.5px solid transparent',
                  }}
                >
                  <img src={item.icon} alt={item.name} style={iconStyle} />
                  <span style={textStyle(false)}>
                    {item.name}
                  </span>
                </Link>
              </li>
            );
        })}

      </ul>
    </aside>
  );
};

export default Sidebar;


/// ================= STYLE =================

const sidebarStyle = {
  width: '180px',
  height: '100vh',
  background: 'linear-gradient(180deg, rgba(230, 240, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
  backdropFilter: 'blur(15px)',
  WebkitBackdropFilter: 'blur(15px)',
  border: '1px solid rgba(255, 255, 255, 0.4)',
  padding: '30px 5px',
  display: 'flex',
  flexDirection: 'column',
  position: 'sticky',
  top: 0,
};

const logoContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '10px',
  paddingTop: '15px',
  marginBottom: '60px',
};

const logoImageStyle = {
  height: '50px',
  objectFit: 'contain',
};

const menuContainerStyle = {
  listStyle: 'none',
  padding: 0,
  marginTop: '20px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
};

const menuItemStyle = {
  padding: '10px 15px',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontWeight: '600',
  fontSize: '15px',
  fontFamily: "'Manrope', sans-serif",
  transition: 'all 0.3s ease',
};

const iconStyle = {
  width: '22px',
  height: '22px',
  objectFit: 'contain',
};

const textStyle = (isActive) => ({
  fontWeight: isActive ? '900' : '600',
  fontSize: '16px',
  color: isActive ? '#1F2A44' : '#4A5568',
});