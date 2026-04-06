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
  fontSize: '0.8rem',
  color: '#aaa',
  borderTop: '1px solid #f5f5f5',
  marginTop: 'auto' // Menempel di bawah konten
};

export default Footer;