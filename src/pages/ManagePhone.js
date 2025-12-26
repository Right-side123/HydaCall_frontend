import React, { useState, useEffect } from 'react';
import '../styles/ManagePhone.css';
import Layout from '../Components/Layout';
import historyicon from '../assets/historyicon.png';
import downloadicon from '../assets/downloadicon.png';
import searchicon from '../assets/searchicon.png';
import editicon from '../assets/editIcon.png';
import historyiconblue from '../assets/historyiconblue.png';
import crossIcon from '../assets/crossIcon.png';
import Sidebar from '../Components/Sidebar';

import api from '../Components/Api';
import { NavLink, useNavigate, } from 'react-router-dom';
const ManagePhone = () => {
    const [editPhone, setEditPhone] = useState(false);
    const [simNumbers, setSimNumbers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [selectedSim, setSelectedSim] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    const fetchSimNumbers = async () => {
        try {

            const res = await api.get('/simnumber');
            setSimNumbers(res.data);
        } catch (err) {
            console.error('Error fetching SIM numbers', err);
        }
    };

    const fetchDepartments = async () => {
        try {
            const res = await api.get("/department");
            setDepartments(res.data);
        } catch (err) {
            console.log("Error fetching department:", err);
        }
    };


    useEffect(() => {
        fetchSimNumbers();
        fetchDepartments();
    }, []);



    const handleUpdate = async () => {
        try {
            await api.put(`/simnumber/${selectedSim.id}`, {
                Name: selectedSim.Name,
                Department: selectedSim.Department
            });
            setEditPhone(false);
            fetchSimNumbers();
        } catch (err) {
            console.error('Error updating SIM', err);
        }
    };




    const filteredSimNumbers = simNumbers.filter(sim =>
        sim.SIM_Number.toString().includes(searchTerm) ||
        sim.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1;

    // Calculate indexes
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Apply search + pagination together
    const currentMangePhone = filteredSimNumbers.slice(indexOfFirstItem, indexOfLastItem);

    // Total pages
    const totalPages = Math.ceil(filteredSimNumbers.length / itemsPerPage);
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const handleEditClick = (sim) => {
        setSelectedSim(sim);
        setEditPhone(true);
    };

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
                                <input
                                    type='search'
                                    placeholder='Search'
                                    className='search_box'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            {/* <div className='add_dept_btn_container'> */}

                            <button className='download_btn_container'><img src={downloadicon} alt='department' className='dept_icon' /></button>
                            {/* </div> */}
                            <NavLink to="/manage-phone-history">
                                <button className='history_btn_container'><img src={historyicon} alt='history' className='dept_icon' /></button>
                            </NavLink>

                        </div>
                    </div>
                    <div className='main_container_table'>
                        <table>
                            <thead className='table_heading'>
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>SIM Number</th>
                                    <th>Name</th>
                                    <th>Department</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className='table_body'>
                                {currentMangePhone.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center' }}>No Records Found!!</td>
                                    </tr>
                                ) : (
                                    currentMangePhone.map((sim, index) => (
                                        <tr key={sim.id}>
                                            <td>{index + 1}</td>
                                            <td>{sim.SIM_Number}</td>
                                            <td>{sim.Name}</td>
                                            <td>{sim.Department}</td>
                                            <td>
                                                <div className='action_icons'>
                                                    <img src={editicon} alt='edit' className='editicon' onClick={() => handleEditClick(sim)} />
                                                    <span className='divider'></span>
                                                    <img
                                                        src={historyiconblue}
                                                        alt='history'
                                                        className='deleteicon'
                                                        onClick={() => navigate(`/updated-phone-history/${sim.SIM_Number}`)}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="pagination_container">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Previous
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            className={currentPage === index + 1 ? "active_page" : ""}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>

                </div>
                {editPhone && (
                    <div className='main_container_model'>
                        <div className='manage_phone_model_container'>
                            <div className='manage_phone_model_title'>
                                <h3>Edit Phone</h3>
                                <img src={crossIcon} alt='back' className='model_cross_icon' onClick={() => setEditPhone(false)} />
                            </div>
                            <div className='mainphonemodel'>
                                <div className='phone_model_content'>
                                    <div className='phone_model_input_container'>
                                        <label>SIM Number</label>
                                        <input type='text' value={selectedSim.SIM_Number} readOnly />
                                    </div>
                                    <div className='phone_model_input_container'>
                                        <label>Name <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            type='text'
                                            value={selectedSim.Name}
                                            onChange={(e) =>
                                                setSelectedSim({ ...selectedSim, Name: e.target.value })
                                            }
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='phone_model_content'>
                                    <div className='phone_model_input_container'>
                                        <label>Department <span style={{ color: 'red' }}>*</span></label>
                                        <select
                                            value={selectedSim.Department}
                                            onChange={(e) =>
                                                setSelectedSim({ ...selectedSim, Department: e.target.value })
                                            }
                                            required
                                        >
                                            {departments.map(dep => (
                                                <option key={dep.id} value={dep.name}>{dep.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='model_btn_container'>

                                <button className='model_btn_can' onClick={() => setEditPhone(false)}>Cancel</button>
                                <button className='model_btn_sub' onClick={handleUpdate}>Update</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManagePhone;
