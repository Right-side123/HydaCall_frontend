import React, { useState } from 'react';
// import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import '../styles/Layout.css';
import logoutbtn from '../assets/logouticon.png';
import clockicon from '../assets/clock.png';
import logoutModelIconOne from '../assets/logoutmodelicon.png';
// import logoutModelIconTwo from '../assets/logoutmodelicon3.png';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Layout = () => {
  const navigate = useNavigate();
  const [logoutModel, setLogoutModel] = useState(false)

  // const handleLogout = () => {
  //   localStorage.removeItem("auth");
  //   navigate('/')
  // };


  const handleLogout = () => {
    localStorage.removeItem("auth");
    // window.location.reload();

    toast.success("Logged out Successfully", {
      position: "top-right",
      autoClose: 2400,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: true,
      style: {
        backgroundColor: "#009c5b",
        color: "#fff",
        width: "300px",
        minHeight: "70px",
        fontSize: "16px",
        fontWeight: "bold",
        borderRadius: "10px",
      },
    });
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };


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

          <button className="logout_button" onClick={() => setLogoutModel(true)}>
            <img src={logoutbtn} alt="logout" className="logoutbtn" />
            <span className="logout_tooltip">Logout</span>
          </button>
        </div>


        {/* <div className="page-content">
          {children}
        </div> */}

      </div>
      {logoutModel && (
        <div className='logout_model_main_container'>
          <div className='logout_model_container'>
            <h3 className='logout_model_container_title'><img src={logoutModelIconOne} alt='logout' />Logout</h3>
            <p className='logout_model_p'>Are you sure you want to logout ?</p>
            <div className='model_logout_btn_container'>
              <button className='model_logout_cancel_btn' onClick={() => setLogoutModel(false)}>Cancel</button>
              <button className='model_logout_button' onClick={handleLogout}><span className="model_logout_icon"></span>Log Out</button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Layout;
