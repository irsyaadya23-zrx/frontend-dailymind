import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Home, Smile, Calendar, Clock, BookOpen, MessageSquare, LogOut } from 'lucide-react';
import logoApp from "../assets/dailymind_logo.png";
import homeIcon from '../assets/home.png';
import moodIcon from '../assets/mood.png';
import todoIcon from '../assets/todo.png';
import pomodoroIcon from '../assets/pomodoro.png';
import jurnalIcon from '../assets/jurnal.png';
import feedbackIcon from '../assets/feedback.png';
import exitIcon from '../assets/exit.png';

const Sidebar = () => {
  const location = useLocation();

  const menus = [
  { name: 'Home', path: "/home", icon: homeIcon },
  { name: 'Mood Track', path: "/moodtrack", icon: moodIcon },
  { name: 'To - Do', path: "/todolist", icon: todoIcon },
  { name: 'Pomodoro', path: "/pomodoro", icon: pomodoroIcon },
  { name: 'Jurnal', path: "/journal", icon: jurnalIcon },
  { name: 'Feedback', path: "/feedback", icon: feedbackIcon },
  { name: 'Exit', path: "/", icon: exitIcon, isExit: true }
];

  return (
    <aside style={sidebarStyle}>
      {/* Logo Section */}
      <div style={logoContainerStyle}>
        <div style={{
          filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2))', // Shadow di sini!
          display: 'flex',
          alignItems: 'center'
          }}></div>
        <img src={logoApp} alt="DailyMind Logo" style={logoImageStyle} />
      </div>

      {/* Menu List */}
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px', flex: 1 }}>
        {menus.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <li key={item.name} style={{ marginBottom: '5px' }}>
              <Link 
                to={item.path} 
                style={{
                  ...menuItemStyle,
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  color: item.isExit ? '#B91C1C' : '#1F2A44',
                  boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                  borderRadius: isActive ? '50px 50px 50px 50px' : '12px', // Efek oval seperti di gambar
                  paddingRight: '20px',
                  paddingLeft: '20px',
                  marginLeft: '-5px',
                  width: isActive ? 'calc(100% + 10px)' : '100%',
                  border: isActive ? '1.5px solid white' : '1.5px solid transparent',
                }}
              >

                <img
                   src={item.icon} alt={item.name} 
                   style={{ 
                    width: '24px', 
                    height: '24px', 
                    marginRight: '0px',
                    objectFit: 'contain'
                }}/>

                <span style={{ 
                  marginRight: '12px',
                  display: 'flex',
                  color: isActive ? '#1F2A44' : '#4A5568' // Warna icon ikut berubah jika aktif
                  }}>
                    </span>

                <span style={{ 
                  fontWeight: isActive ? '900' : '600', // 700 saat aktif sesuai Figma
                  fontSize: '16px', // Sesuai ukuran di desain kamu
                  fontFamily: "'Manrope', sans-serif", // Memastikan font Manrope terpasang
                  lineHeight: '100%'
                  }}>
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


const sidebarStyle = {
  width: '180px',
  height: '832px',
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
  justifyContent: 'flex-start', // Logo rata kiri
  paddingLeft: '10px',
  paddingTop: '15px',
  marginBottom: '80px',
  width: '100%',
};

const logoTextStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#4A5568',
  letterSpacing: '0.5px'
};

const logoImageStyle = {
  height: '50px',
  width: 'auto',
  objectFit: 'contain',
  filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))',
};

const menuItemStyle = {
  padding: '8px 8px',
  gap: '-10px',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '15px',
  display: 'flex',
  alignItems: 'center',
  transition: 'all 0.3s ease',
  fontFamily: "'Manrope', sans-serif",
  lineHeight: '100%',
  letterSpacing: '0%',
};

export default Sidebar;