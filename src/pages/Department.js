import React, { useState } from 'react';
import '../styles/Department.css';
import Layout from '../Components/Layout';
import departmenticon from '../assets/department.png';
import searchicon from '../assets/searchicon.png';
import editicon from '../assets/editIcon.png';
import deleteicon from '../assets/deleteIcon.png';
import crossIcon from '../assets/crossIcon.png';

const Department = () => {

    const [model, setModel] = useState(false);
    const [editDepartment, setEditDepartment] = useState(false);

    return (
        <div>
            <div className="department_titel_container">
                <h1 className='department_title'>DEPARTMENT</h1>
                <Layout></Layout>
            </div>
            <div className='department_second_container'>
                <div className='department_second_container_top'>
                    <h3>Department</h3>
                    <div className='department_second_container_top_right'>
                        <div className='search_box_container'> <img src={searchicon} alt='search' className='searchicon' />
                            <input type='search' placeholder='Search' className='search_box' />
                        </div>
                        {/* <div className='add_dept_btn_container'> */}

                        <button className='add_dept_btn' onClick={() => setModel(true)}>     <img src={departmenticon} alt='department' className='dept_icon' />Add Department</button>
                        {/* </div> */}

                    </div>
                </div>
                <div className='main_container_table'>
                    <table>
                        <thead className=' table_heading'>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='table_body'>
                            <tr>
                                <td>1</td>
                                <td>rohit</td>
                                <td >
                                    <div className='action_icons'>
                                        <img src={editicon} alt='edit' className='editicon' onClick={() => setEditDepartment(true)} />
                                        <span className='divider'></span>
                                        <img src={deleteicon} alt='delete' className='deleteicon' />
                                    </div>

                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>rohit</td>
                                <td>
                                    <div className='action_icons'>
                                        <img src={editicon} alt='edit' className='editicon' />
                                        <span className='divider'></span>
                                        <img src={deleteicon} alt='delete' className='deleteicon' />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>rohit</td>
                                <td>
                                    <div className='action_icons'>
                                        <img src={editicon} alt='edit' className='editicon' />
                                        <span className='divider'></span>
                                        <img src={deleteicon} alt='delete' className='deleteicon' />
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

            {/* model add department */}

            {model && (
                <div className='main_container_model'>
                    <div className='department_model_container'>
                        <div className='department_model_title'>
                            <h3>Create Department</h3>
                            <img src={crossIcon} alt='back' className='model_cross_icon' onClick={() => setModel(false)} />
                        </div>
                        <div className='model_input_container'>
                            <label>Name <span style={{ color: 'red' }}>*</span></label>
                            <input type='text' name='name' required />
                        </div>
                        <div className='model_btn_container'>

                            <button className='model_btn_can' onClick={() => setModel(false)}>Cancel</button>
                            <button className='model_btn_sub'>Create</button>
                        </div>
                    </div>
                </div>
            )}

            {/* model update department */}

            {editDepartment && (
                <div className='main_container_model'>
                    <div className='department_model_container'>
                        <div className='department_model_title'>
                            <h3>Edit Department</h3>
                            <img src={crossIcon} alt='back' className='model_cross_icon' onClick={() => setEditDepartment(false)} />
                        </div>
                        <div className='model_input_container'>
                            <label>Name <span style={{ color: 'red' }}>*</span></label>
                            <input type='text' name='name' required />
                        </div>
                        <div className='model_btn_container'>

                            <button className='model_btn_can' onClick={() => setEditDepartment(false)}>Cancel</button>
                            <button className='model_btn_sub'>Update</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Department;
