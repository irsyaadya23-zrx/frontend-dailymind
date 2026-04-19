import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p style={{ margin: 0 }}>&copy; 2026 DailyMind Team</p>
    </footer>
  );
};

const footerStyle = {
  padding: '20px',
  textAlign: 'center',
  fontSize: '1rem',
  color: '#aaa',
  borderTop: '1px solid rgba(255, 255, 255, 0.8)',
  margin: '0',
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(2px) saturate(180%)',
  boxShadow: '0 -5px 8px rgba(31, 38, 135, 0.2), inset 0 4px 20px rgba(255, 255, 255, 0.3)',
  height: '150px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

export default Footer;