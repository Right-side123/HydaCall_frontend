import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';
import rightsideicon from '../assets/newnewlogo.png'
import dashboardicon from '../assets/dashboard.png';
import calllogsicon from '../assets/calllogsicon.png';
import departmenticon from '../assets/department.png';
import managephoneicon from '../assets/callmanageicon.png';
import usericon from '../assets/users.png';
import reportsicon from '../assets/reportsicon.png';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className='logo_container'>
                <img src={rightsideicon} alt='rightside' className='rightside_icon' />
                <h2 className="logo_title">Right Side</h2>
            </div>
            <ul className="menu">
                <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}> <img src={dashboardicon} alt='dashboard' className='sidebar_icon' />Dashboard</NavLink></li>
                <li><NavLink to="/call-logs" className={({ isActive }) => isActive ? "active" : ""}> <img src={calllogsicon} alt='call-logs' className='sidebar_icon' />Call Logs</NavLink></li>
                <li><NavLink to="/department" className={({ isActive }) => isActive ? "active" : ""}> <img src={departmenticon} alt='department' className='sidebar_icon' />Departments</NavLink></li>
                <li><NavLink to="/manage-phone" className={({ isActive }) => isActive ? "active" : ""}> <img src={managephoneicon} alt='manage-phone' className='sidebar_icon' />Manage Phone</NavLink></li>
                <li><NavLink to="/user" className={({ isActive }) => isActive ? "active" : ""}> <img src={usericon} alt='users' className='sidebar_icon' />Users</NavLink></li>
                <li><NavLink to="/reports" className={({ isActive }) => isActive ? "active" : ""}> <img src={reportsicon} alt='reports' className='sidebar_icon' />Reports</NavLink></li>
            </ul>
        </div>
    );
};

export default Sidebar;
