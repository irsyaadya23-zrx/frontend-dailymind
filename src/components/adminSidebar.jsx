import React from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { X } from "lucide-react";

import logoApp from "../assets/dailymind_logo.png";

import homeIcon from "../assets/home.png";

import exitIcon from "../assets/exit.png";

const AdminSidebar = ({
  isOpen,
  onClose,
}) => {

  const location = useLocation();

  const navigate = useNavigate();

  // =========================================
  // LOGOUT ADMIN
  // =========================================
  const handleLogout = () => {

    // HAPUS TOKEN ADMIN
    localStorage.removeItem("adminToken");

    // OPTIONAL
    localStorage.removeItem("admin");

    // REDIRECT KE LOGIN
    navigate("/");
  };

  const menus = [
    {
      name: "Home",
      path: "/admin",
      icon: homeIcon,
    },

    {
      name: "Exit",
      icon: exitIcon,
      isExit: true,
    },
  ];

  return (

    <aside
      className={`
        fixed top-0 left-0 z-50
        h-screen w-[180px]
        transition-transform duration-300
        lg:translate-x-0
        ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }
      `}
      style={sidebarStyle}
    >

      {/* CLOSE BUTTON MOBILE */}
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
          listStyle: "none",
          padding: 0,
          marginTop: "20px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >

        {/* HOME */}
        {menus
          .filter((item) => !item.isExit)
          .map((item) => {

            const isActive =
              location.pathname === item.path;

            return (

              <li
                key={item.name}
                style={{
                  marginBottom: "8px",
                }}
              >

                <Link
                  to={item.path}
                  style={{
                    ...menuItemStyle,

                    backgroundColor:
                      isActive
                        ? "rgba(255, 255, 255, 0.2)"
                        : "transparent",

                    color: "#1F2A44",

                    boxShadow:
                      isActive
                        ? "0 4px 12px rgba(0,0,0,0.05)"
                        : "none",

                    borderRadius:
                      isActive
                        ? "50px"
                        : "12px",

                    border:
                      isActive
                        ? "1.5px solid white"
                        : "1.5px solid transparent",

                    width:
                      isActive
                        ? "calc(100% + 10px)"
                        : "100%",

                    marginLeft: "-5px",

                    paddingLeft: "20px",

                    paddingRight: "20px",
                  }}
                >

                  <img
                    src={item.icon}
                    alt={item.name}
                    style={iconStyle}
                  />

                  <span
                    style={textStyle(isActive)}
                  >
                    {item.name}
                  </span>

                </Link>
              </li>
            );
          })}

        {/* PUSH EXIT KE BAWAH */}
        <div style={{ flex: 1 }} />

        {/* EXIT */}
        {menus
          .filter((item) => item.isExit)
          .map((item) => {

            return (

              <li key={item.name}>

                <button
                  onClick={handleLogout}
                  style={{
                    ...menuItemStyle,

                    backgroundColor:
                      "transparent",

                    color: "#B91C1C",

                    borderRadius: "12px",

                    border:
                      "1.5px solid transparent",

                    width: "100%",

                    marginLeft: "-5px",

                    paddingLeft: "20px",

                    paddingRight: "20px",

                    cursor: "pointer",

                    background: "none",
                  }}
                >

                  <img
                    src={item.icon}
                    alt={item.name}
                    style={iconStyle}
                  />

                  <span style={exitTextStyle}>
                    {item.name}
                  </span>

                </button>
              </li>
            );
          })}
      </ul>
    </aside>
  );
};

export default AdminSidebar;

// =========================================
// STYLE
// =========================================
const sidebarStyle = {

  width: "180px",

  height: "100vh",

  background:
    "linear-gradient(180deg, rgba(230, 240, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)",

  backdropFilter: "blur(15px)",

  WebkitBackdropFilter: "blur(15px)",

  border:
    "1px solid rgba(255, 255, 255, 0.4)",

  padding: "30px 5px",

  display: "flex",

  flexDirection: "column",
};

const logoContainerStyle = {

  display: "flex",

  alignItems: "center",

  justifyContent: "flex-start",

  paddingLeft: "10px",

  paddingTop: "15px",

  marginBottom: "80px",

  width: "100%",
};

const logoImageStyle = {

  height: "50px",

  width: "auto",

  objectFit: "contain",

  filter:
    "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))",
};

const menuItemStyle = {

  padding: "8px 8px",

  textDecoration: "none",

  display: "flex",

  alignItems: "center",

  gap: "12px",

  transition: "all 0.3s ease",

  fontFamily:
    "'Manrope', sans-serif",

  lineHeight: "100%",
};

const iconStyle = {

  width: "24px",

  height: "24px",

  objectFit: "contain",
};

const textStyle = (isActive) => ({

  fontWeight:
    isActive ? "900" : "600",

  fontSize: "16px",

  color:
    isActive ? "#1F2A44" : "#4A5568",
});

const exitTextStyle = {

  fontWeight: "700",

  fontSize: "16px",

  color: "#B91C1C",
};