import React from 'react';

import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

import { X } from 'lucide-react';

import logoApp from "../assets/dailymind_logo.png";

import homeIcon from '../assets/home.png';
import moodIcon from '../assets/mood.png';
import todoIcon from '../assets/todo.png';
import pomodoroIcon from '../assets/pomodoro.png';
import jurnalIcon from '../assets/jurnal.png';
import feedbackIcon from '../assets/feedback.png';
import profile from '../assets/profile.png';
import exitIcon from '../assets/exit.png';

import {
  getSession,
  logout
} from "../AuthService";

const Sidebar = ({ isOpen, onClose }) => {

  const location = useLocation();

  const navigate = useNavigate();

  // PROFILE MODAL
  const [showProfile, setShowProfile] = React.useState(false);

  // USER DATA
  const [user, setUser] = React.useState(null);

  // GET SESSION
  React.useEffect(() => {

    const fetchSession = async () => {

      const session = await getSession();

      console.log(session);

      if (session?.user) {
        setUser(session.user);
      }
    };

    fetchSession();

  }, []);

  // LOGOUT
  const handleLogout = async () => {

    await logout();

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");
  };

  const menus = [
    {
      name: 'Home',
      path: "/home",
      icon: homeIcon
    },

    {
      name: 'Mood Track',
      path: "/moodtrack",
      icon: moodIcon
    },

    {
      name: 'To - Do',
      path: "/todolist",
      icon: todoIcon
    },

    {
      name: 'Pomodoro',
      path: "/pomodoro",
      icon: pomodoroIcon
    },

    {
      name: 'Jurnal',
      path: "/journal",
      icon: jurnalIcon
    },

    {
      name: 'Feedback',
      path: "/feedback",
      icon: feedbackIcon
    },

    {
      name: 'Profile',
      icon: profile,
      isProfile: true
    },

    {
      name: 'Exit',
      icon: exitIcon,
      isExit: true
    }
  ];

  return (
    <>

      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-[180px]
          transition-transform duration-300
          lg:translate-x-0
          ${isOpen
            ? "translate-x-0"
            : "-translate-x-full"}
        `}
        style={sidebarStyle}
      >

        {/* CLOSE BUTTON */}
        <div className="flex justify-end lg:hidden mb-4">

          <button onClick={onClose}>
            <X size={28} />
          </button>

        </div>

        {/* LOGO */}
        <div style={logoContainerStyle}>

          <img
            src={logoApp}
            alt="DailyMind Logo"
            style={logoImageStyle}
          />

        </div>

        {/* MENU */}
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            marginTop: '20px',
            flex: 1
          }}
        >

          {menus.map((item) => {

            const isActive =
              location.pathname === item.path;

            return (

              <li
                key={item.name}
                style={{ marginBottom: '5px' }}
              >

                {/* EXIT BUTTON */}
                {item.isExit ? (

                  <button
                    onClick={handleLogout}
                    style={{
                      ...menuItemStyle,

                      backgroundColor:
                        'transparent',

                      color: '#B91C1C',

                      borderRadius: '12px',

                      paddingRight: '20px',

                      paddingLeft: '15px',

                      width: '100%',

                      border:
                        '1.5px solid transparent',

                      cursor: 'pointer',

                      background: 'none'
                    }}
                  >

                    <img
                      src={item.icon}
                      alt={item.name}
                      style={{
                        width: '24px',
                        height: '24px',
                        marginRight: '0px',
                        objectFit: 'contain'
                      }}
                    />

                    <span
                      style={{
                        marginRight: '12px',
                        display: 'flex',
                      }}
                    ></span>

                    <span
                      style={{
                        fontWeight: '600',
                        fontSize: '16px',
                        fontFamily:
                          "'Manrope', sans-serif",
                        lineHeight: '100%'
                      }}
                    >
                      {item.name}
                    </span>

                  </button>

                ) : item.isProfile ? (

                  <button
                    onClick={() => setShowProfile(true)}
                    style={{
                      ...menuItemStyle,

                      backgroundColor: 'transparent',

                      color: '#1F2A44',

                      borderRadius: '12px',

                      paddingRight: '20px',

                      paddingLeft: '15px',

                      width: '100%',

                      border:
                        '1.5px solid transparent',

                      cursor: 'pointer',

                      background: 'none',

                      display: 'flex',

                      alignItems: 'center'
                    }}
                  >

                    <img
                      src={item.icon}
                      alt={item.name}
                      style={{
                        width: '24px',
                        height: '24px',
                        objectFit: 'contain'
                      }}
                    />

                    <span
                      style={{
                        marginRight: '12px',
                        display: 'flex',
                      }}
                    ></span>

                    <span
                      style={{
                        fontWeight: '600',
                        fontSize: '16px',
                        fontFamily:
                          "'Manrope', sans-serif",
                      }}
                    >
                      {item.name}
                    </span>

                  </button>

                ) : (

                  // MENU NORMAL
                  <Link
                    to={item.path}
                    style={{
                      ...menuItemStyle,

                      backgroundColor:
                        isActive
                          ? 'rgba(255, 255, 255, 0.2)'
                          : 'transparent',

                      color: '#1F2A44',

                      boxShadow:
                        isActive
                          ? '0 4px 12px rgba(0,0,0,0.05)'
                          : 'none',

                      borderRadius:
                        isActive
                          ? '50px'
                          : '12px',

                      paddingRight: '20px',

                      paddingLeft: '20px',

                      marginLeft: '-5px',

                      width:
                        isActive
                          ? 'calc(100% + 10px)'
                          : '100%',

                      border:
                        isActive
                          ? '1.5px solid white'
                          : '1.5px solid transparent',
                    }}
                  >

                    <img
                      src={item.icon}
                      alt={item.name}
                      style={{
                        width: '24px',
                        height: '24px',
                        marginRight: '0px',
                        objectFit: 'contain'
                      }}
                    />

                    <span
                      style={{
                        marginRight: '12px',
                        display: 'flex',
                      }}
                    ></span>

                    <span
                      style={{
                        fontWeight:
                          isActive
                            ? '900'
                            : '600',

                        fontSize: '16px',

                        fontFamily:
                          "'Manrope', sans-serif",

                        lineHeight: '100%'
                      }}
                    >
                      {item.name}
                    </span>

                  </Link>
                )}

              </li>
            );
          })}
        </ul>
      </aside>

      {/* PROFILE MODAL */}
      {showProfile && (

        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            // background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            justifyContent: 'center',
            padding: '20px',
            alignItems: 'center',
            zIndex: 999
          }}
        >

          <div
            style={{
              width: '100%',
              maxWidth: '661px',
              minHeight: '512px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '30px',
              position: 'relative',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
          >

            {/* CLOSE */}
            <button
              onClick={() => setShowProfile(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                border: 'none',
                background: 'none',
                cursor: 'pointer'
              }}
            >
              <X size={24} />
            </button>

            {/* FOTO */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '20px'
              }}
            >

              <img
                src={
                  user?.image ||
                  "https://i.imgur.com/HeIi0wU.png"
                }
                alt="Profile"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />

            </div>

            <h2
              style={{
                textAlign: 'center',
                marginBottom: '25px'
              }}
            >
              {user?.name || "Unknown User"}
            </h2>

            {/* EMAIL */}
            <div style={{ marginBottom: '15px' }}>

              <label>Email</label>

              <input
                type="text"
                value={user?.email || ""}
                readOnly
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  border: '1px solid #ccc',
                  marginTop: '5px'
                }}
              />

            </div>

            {/* NAMA */}
            <div>

              <label>Nama</label>

              <input
                type="text"
                value={user?.name || ""}
                readOnly
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  border: '1px solid #ccc',
                  marginTop: '5px'
                }}
              />

            </div>

          </div>

        </div>

      )}

    </>
  );
};

// STYLE

const sidebarStyle = {
  width: '180px',
  height: '100vh',
  background:
    'linear-gradient(180deg, rgba(230, 240, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
  backdropFilter: 'blur(15px)',
  WebkitBackdropFilter: 'blur(15px)',
  border:
    '1px solid rgba(255, 255, 255, 0.4)',
  padding: '30px 5px',
  display: 'flex',
  flexDirection: 'column'
};

const logoContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingLeft: '10px',
  paddingTop: '15px',
  marginBottom: '80px',
  width: '100%',
};

const logoImageStyle = {
  height: '50px',
  width: 'auto',
  objectFit: 'contain',
  filter:
    'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))',
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
  fontFamily:
    "'Manrope', sans-serif",
  lineHeight: '100%',
  letterSpacing: '0%',
};

export default Sidebar;