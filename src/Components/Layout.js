import React from 'react';
// import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import '../styles/Layout.css';
import logoutbtn from '../assets/logouticon.png';
import clockicon from '../assets/clock.png';

const Layout = () => {
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem("auth");
  //   navigate('/')
  // };


  const handleLogout = () => {
    localStorage.removeItem("auth");
    // window.location.reload();
    navigate('/')
  }


  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="layout-container">
      {/* <Sidebar /> */}

      <div className="main-content">
        <div className="topbar">
          <div className="time-section">
            <img src={clockicon} alt="time" className="clockicon" />
            <span className="time">{currentTime}</span>
          </div>

          <div className="divider"></div>

          <button className="logout_button" onClick={handleLogout}>
            <img src={logoutbtn} alt="logout" className="logoutbtn" />
            <span className="logout_tooltip">Logout</span>
          </button>
        </div>


        {/* <div className="page-content">
          {children}
        </div> */}

      </div>
    </div>
  );
};

export default Layout;
