import React, { useState } from 'react';
import '../styles/ManagePhone.css';
import Layout from '../Components/Layout';
import historyicon from '../assets/historyicon.png';
import downloadicon from '../assets/downloadicon.png';
import searchicon from '../assets/searchicon.png';
import editicon from '../assets/editIcon.png';
import historyiconblue from '../assets/historyiconblue.png';
import crossIcon from '../assets/crossIcon.png';
import Sidebar from '../Components/Sidebar';

const ManagePhone = () => {
    const [editPhone, setEditPhone] = useState(false);



    return (
        <div className='main-layout'>
            <Sidebar />

            <div className='page-content'>
                <div className="department_titel_container">
                    <h1 className='department_title'>MANAGE PHONE</h1>
                    <Layout></Layout>
                </div>
                <div className='department_second_container'>
                    <div className='mangephone_second_container_top'>
                        <h3 className='mangephone_second_container_top_title'>Manage Phone</h3>
                        <div className='managephone_second_container_top_right'>
                            <div className='search_box_container'> <img src={searchicon} alt='search' className='searchicon' />
                                <input type='search' placeholder='Search' className='search_box' />
                            </div>
                            {/* <div className='add_dept_btn_container'> */}

                            <button className='download_btn_container'><img src={downloadicon} alt='department' className='dept_icon' /></button>
                            {/* </div> */}
                            <button className='history_btn_container'><img src={historyicon} alt='history' className='dept_icon' /></button>

                        </div>
                    </div>
                    <div className='main_container_table'>
                        <table>
                            <thead className=' table_heading'>
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>SIM Number</th>
                                    <th>Name</th>
                                    <th>Department</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className='table_body'>
                                <tr>
                                    <td>1</td>
                                    <td>1546546</td>
                                    <td>rohit</td>
                                    <td>CSE</td>
                                    <td >
                                        <div className='action_icons'>
                                            <img src={editicon} alt='edit' className='editicon' onClick={() => setEditPhone(true)} />
                                            <span className='divider'></span>
                                            <img src={historyiconblue} alt='history' className='deleteicon' />
                                        </div>

                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>1546546</td>
                                    <td>rohit</td>
                                    <td>CSE</td>
                                    <td>
                                        <div className='action_icons'>
                                            <img src={editicon} alt='edit' className='editicon' />
                                            <span className='divider'></span>
                                            <img src={historyiconblue} alt='history' className='deleteicon' />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>1546546</td>
                                    <td>rohit</td>
                                    <td>CSE</td>
                                    <td>
                                        <div className='action_icons'>
                                            <img src={editicon} alt='edit' className='editicon' />
                                            <span className='divider'></span>
                                            <img src={historyiconblue} alt='history' className='deleteicon' />
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
                {editPhone && (
                    <div className='main_container_model'>
                        <div className='department_model_container'>
                            <div className='department_model_title'>
                                <h3>Edit Phone</h3>
                                <img src={crossIcon} alt='back' className='model_cross_icon' onClick={() => setEditPhone(false)} />
                            </div>
                            <div className='mainphonemodel'>
                                <div className='phone_model_content'>
                                    <div className='phone_model_input_container'>
                                        <label>SIM Number</label>
                                        <input type='text' name='name' />
                                    </div>
                                    <div className='phone_model_input_container'>
                                        <label>Name <span style={{ color: 'red' }}>*</span></label>
                                        <input type='text' name='name' required />
                                    </div>
                                </div>
                                <div className='phone_model_content'>
                                    <div className='phone_model_input_container'>
                                        <label>Department <span style={{ color: 'red' }}>*</span></label>
                                        <input type='text' name='name' required />
                                    </div>
                                </div>
                            </div>
                            <div className='model_btn_container'>

                                <button className='model_btn_can' onClick={() => setEditPhone(false)}>Cancel</button>
                                <button className='model_btn_sub'>Update</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManagePhone;
