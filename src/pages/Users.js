import React, { useState } from 'react';
import '../styles/Users.css';
import Layout from '../Components/Layout';
import usersIcon from '../assets/usersusericon.png';
import simNumberIcon from '../assets/usersSim.png';
import activeUserIcon from '../assets/activeuser.png';
import inActiveUserIcon from '../assets/inactiveuser.png';
import departmentIcon from '../assets/usersdepartment.png';
import searchicon from '../assets/searchicon.png';
import addUserIcon from '../assets/useradd.png';
import eyeUserIcon from '../assets/eyeuser.png';
import editIcon from '../assets/editIcon.png';
import deleteIcon from '../assets/deleteIcon.png';
import copyUserIcon from '../assets/copyuser.png';
import crossIcon from '../assets/crossIcon.png';
// import AddUserModal from '../Components/AddUserModel';


const Users = () => {
    const [addUser, setAddUser] = useState(false);


    return (
        <div>
            <div className="department_titel_container">
                <h1 className='department_title'>USERS</h1>
                <Layout></Layout>
            </div>
            <div className='users_second_container'>
                <div className='users_second_container_card'>
                    <div className='users_second_container_card_left'>
                        <span>Users</span>
                        <p>2</p>
                    </div>

                    <div className='users_second_container_card_right'>
                        <img src={usersIcon} alt='user' className='users_second_container_card_right_icon' />
                    </div>
                </div>
                <div className='users_second_container_card'>
                    <div className='users_second_container_card_left'>
                        <span>SIM Numbers</span>
                        <p>4</p>
                    </div>

                    <div className='users_second_container_card_right'>
                        <img src={simNumberIcon} alt='SIM Number' className='users_second_container_card_right_icon' />
                    </div>
                </div>
                <div className='users_second_container_card'>
                    <div className='users_second_container_card_left'>
                        <span>Active Users</span>
                        <p>2</p>
                    </div>

                    <div className='users_second_container_card_right'>
                        <img src={activeUserIcon} alt='active user' className='users_second_container_card_right_icon' />
                    </div>
                </div>
                <div className='users_second_container_card'>
                    <div className='users_second_container_card_left'>
                        <span>Inactive Users</span>
                        <p>0</p>
                    </div>

                    <div className='users_second_container_card_right'>
                        <img src={inActiveUserIcon} alt='Inactive User' className='users_second_container_card_right_icon' />
                    </div>
                </div>
                <div className='users_second_container_card'>
                    <div className='users_second_container_card_left'>
                        <span>Department</span>
                        <p>4</p>
                    </div>

                    <div className='users_second_container_card_right'>
                        <img src={departmentIcon} alt='Department' className='users_second_container_card_right_icon' />
                    </div>
                </div>
            </div>
            <div className='department_second_container'>
                <div className='department_second_container_top'>
                    <h3>User Details</h3>
                    <div className='department_second_container_top_right'>
                        <div className='search_box_container'>
                            <img src={searchicon} alt='search' className='searchicon' />
                            <input type='search' placeholder='Search' className='search_box' />
                        </div>


                        <button className='add_dept_btn' onClick={() => setAddUser(true)}> <img src={addUserIcon} alt='department' className='dept_icon' />Add User</button>


                    </div>
                </div>
                <div className='main_container_table'>
                    <table>
                        <thead className=' table_heading'>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Phone Numbers</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='table_body'>
                            <tr>
                                <td>Rohit</td>
                                <td>rohit@gmail.com</td>
                                <td>Technical</td>
                                <td>999999999</td>
                                <td>Active</td>
                                <td >
                                    <div className='user_action_icons'>
                                        <img src={eyeUserIcon} alt='View Phone Numbers' className='user_deleteicon' />
                                        <span className='user_divider'></span>
                                        <img src={editIcon} alt='edit' className='user_editicon' />
                                        <span className='user_divider'></span>
                                        <img src={deleteIcon} alt='delete' className='user_deleteicon' />
                                        <span className='user_divider'></span>
                                        <img src={copyUserIcon} alt='Copy User' className='user_copyicon' />
                                    </div>

                                </td>
                            </tr>
                            <tr>
                                <td>Rohit</td>
                                <td>rohit@gmail.com</td>
                                <td>Technical</td>
                                <td>999999999</td>
                                <td>Active</td>
                                <td >
                                    <div className='user_action_icons'>
                                        <img src={eyeUserIcon} alt='View Phone Numbers' className='user_deleteicon' />
                                        <span className='user_divider'></span>
                                        <img src={editIcon} alt='edit' className='user_editicon' />
                                        <span className='user_divider'></span>
                                        <img src={deleteIcon} alt='delete' className='user_deleteicon' />
                                        <span className='user_divider'></span>
                                        <img src={copyUserIcon} alt='Copy User' className='user_copyicon' />
                                    </div>

                                </td>
                            </tr>
                            <tr>
                                <td>Rohit</td>
                                <td>rohit@gmail.com</td>
                                <td>Technical</td>
                                <td>999999999</td>
                                <td>Active</td>
                                <td >
                                    <div className='user_action_icons'>
                                        <img src={eyeUserIcon} alt='View Phone Numbers' className='user_deleteicon' />
                                        <span className='user_divider'></span>
                                        <img src={editIcon} alt='edit' className='user_editicon' />
                                        <span className='user_divider'></span>
                                        <img src={deleteIcon} alt='delete' className='user_deleteicon' />
                                        <span className='user_divider'></span>
                                        <img src={copyUserIcon} alt='Copy User' className='user_copyicon' />
                                    </div>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>


            </div>
            <div className="pagination_container">
                <button>Previous</button>
                <button className="active_page">1</button>
                <button>Next</button>
            </div>
            {addUser && (
                <div className='main_container_model'>
                    <div className='department_model_container'>
                        <div className='department_model_title'>
                            <h3>Add User</h3>
                            <img src={crossIcon} alt='back' className='model_cross_icon' onClick={() => setAddUser(false)} />
                        </div>
                        <div className='mainphonemodel'>
                            <div className='phone_model_content'>
                                <div className='phone_model_input_container'>
                                    <label>Name <span style={{ color: 'red' }}>*</span></label>
                                    <input type='text' name='name' required />
                                </div>
                                <div className='phone_model_input_container'>
                                    <label>Email <span style={{ color: 'red' }}>*</span></label>
                                    <input type='email' name='email' required />
                                </div>
                            </div>
                            <div className='phone_model_content'>
                                <div className='phone_model_input_container'>
                                    <label>Password <span style={{ color: 'red' }}>*</span></label>
                                    <input type='password' name='password' required />
                                </div>
                                <div className='phone_model_input_container'>
                                    <p>Department <span style={{ color: 'red' }}>*</span></p>
                                    <select name='department' required className='phone_model_input_container_department'>
                                        <option></option>
                                        <option value="">Select All</option>
                                        <option>Admin</option>
                                        <option>DWS HR</option>
                                        <option>Noida HR</option>
                                        <option>Outreach(Noida)</option>
                                    </select>
                                </div>
                            </div>
                            <div className='phone_model_content'>
                                <div className='phone_model_input_container'>
                                    <p>Allowed Department<span style={{ color: 'red' }}>*</span></p>
                                    <select name='allowedDepartment' required className='phone_model_input_container_department'>
                                        <option></option>
                                        <option value="">Select All</option>
                                        <option>Admin</option>
                                        <option>DWS HR</option>
                                        <option>Noida HR</option>
                                        <option>Outreach(Noida)</option>
                                    </select>
                                </div>
                                <div className='phone_model_input_container'>
                                    <p>Phone Numbers<span style={{ color: 'red' }}>*</span></p>
                                    <select name='phoneNumbers' className='phone_model_input_container_department'>
                                        <option></option>
                                        <option>SIM 1</option>
                                        <option>SIM 2</option>

                                    </select>
                                </div>
                            </div>
                            <div className='phone_model_content_radio'>
                                <div className='phone_model_input_container_radio'>
                                    <label>Status <span style={{ color: 'red' }}>*</span></label>
                                    <div className='adduser_model_radio'>
                                        <div className='adduser_model_radio_inp'>
                                            <input
                                                type="radio"
                                                name="status"
                                                value="Active"

                                            />
                                            <p>Active</p>
                                        </div>
                                        <div className='adduser_model_radio_inp'>
                                            <input
                                                type="radio"
                                                name="status"
                                                value="Inactive"


                                            /> Inactive
                                        </div>
                                    </div>
                                </div>
                                <div className='phone_model_input_container_passexp'>
                                    <label>Password Expire In (Days)<span style={{ color: 'red' }}>*</span></label>
                                    <input type='number' name='passwordExpire' required className='phone_model_input_container_department'/>
                                </div>
                            </div>
                            <div className='phone_model_content'>
                                <div className='phone_model_input_container'>
                                    <label>Preferred Date Format<span style={{ color: 'red' }}>*</span></label>
                                    <select name='dateFormate' required className='phone_model_input_container_department'>
                                        <option value=""></option>
                                        <option>YYYY/MM/DD - 2025/08/25</option>
                                        <option>DD/MM/YYYY - 25/08/2025</option>
                                        <option>MM/DD/YYYY - 08/25/2025</option>
                                    </select>
                                </div>
                                <div className='phone_model_input_container'>
                                    <label>Allowed Reports<span style={{ color: 'red' }}>*</span></label>
                                    <div className="reports-list">
                                        {/* {reportsList.map((report, idx) => (
                                            <div key={idx}>
                                                <input
                                                    type="checkbox"
                                                    checked={formData.allowedReports.includes(report)}
                                                    onChange={() => handleReportChange(report)}
                                                />
                                                {report}
                                            </div>
                                        ))} */}
                                        <select className='phone_model_input_container_department'>
                                            <input type='checkbox' />
                                        </select>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='model_btn_container'>

                            <button className='model_btn_can' onClick={() => setAddUser(false)}>Cancel</button>
                            <button className='model_btn_sub'>Add User</button>
                        </div>
                    </div>

                </div>
            )}
            {/* {addUser && (
                <AddUserModal
                    onClose={() => setAddUser(false)}
                    onSubmit={(data) => {
                        console.log("New User Data:", data);
                        setAddUser(false);
                    }}
                />
            )} */}

        </div>
    );
};

export default Users;
