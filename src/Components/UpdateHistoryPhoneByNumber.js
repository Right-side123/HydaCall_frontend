import React, { useState, useEffect } from 'react';
import '../styles/ManagePhone.css';
import Layout from '../Components/Layout';
import downloadicon from '../assets/downloadicon.png';
import searchicon from '../assets/searchicon.png';
import crossIcon from '../assets/crossIcon.png';
import Sidebar from '../Components/Sidebar';
import eyeUserIcon from '../assets/eyeuser.png';
import api from '../Components/Api';
import { useParams } from 'react-router-dom';

const UpdatedPhoneHistoryByNumber = () => {
    const [historyPhone, setHistoryPhone] = useState(false);
    const [selectedSim, setSelectedSim] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { sim_number } = useParams();
    const [history, setHistory] = useState([]);

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });


    useEffect(() => {
        const fetchUpdatedSimNumbers = async () => {
            try {
                if (!sim_number) return;
                const res = await api.get(`/updatedsimnumber/phone_number/${sim_number}`);
                setHistory(res.data);
                // console.log(res);
            } catch (err) {
                console.error('Error fetching SIM history:', err);
            }
        };

        fetchUpdatedSimNumbers();
    }, [sim_number]);


    const filteredSimNumbers = history.filter(sim =>
        sim.sim_number.toString().includes(searchTerm)
    );

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    // Calculate indexes
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Apply search + pagination together
    const currentHistoryPage = filteredSimNumbers.slice(indexOfFirstItem, indexOfLastItem);

    // Total pages
    const totalPages = Math.ceil(filteredSimNumbers.length / itemsPerPage);
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);


    const handleEditClick = (sim) => {
        setSelectedSim(sim);
        setHistoryPhone(true);
    };


    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sortedData = [...filteredSimNumbers].sort((a, b) => {
            if (key === 'updated_at') {
                // date sorting
                return direction === 'asc'
                    ? new Date(a.updated_at) - new Date(b.updated_at)
                    : new Date(b.updated_at) - new Date(a.updated_at);
            } else {
                // string sorting (case-insensitive)
                return direction === 'asc'
                    ? a[key].toString().localeCompare(b[key].toString())
                    : b[key].toString().localeCompare(a[key].toString());
            }
        });

        setHistory(sortedData);
    };


    return (
        <div className='main-layout'>
            <Sidebar />
            <div className='page-content'>
                <div className="department_titel_container">
                    <h1 className='department_title'>MANAGE PHONE</h1>
                    <Layout />
                </div>

                <div className='department_second_container'>
                    <div className='mangephone_second_container_top'>
                        <h3 className='mangephone_second_container_top_title'>Manage Phone</h3>
                        <div className='managephone_second_container_top_right'>
                            <div className='search_box_container'>
                                <img src={searchicon} alt='search' className='searchicon' />
                                <input
                                    type='search'
                                    placeholder='Search'
                                    className='search_box'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button className='download_btn_container'>
                                <img src={downloadicon} alt='download' className='dept_icon' />
                            </button>
                        </div>
                    </div>

                    <div className='main_container_table'>
                        <table>
                            <thead className='table_heading'>
                                <tr>
                                    <th>Sr. No.</th>
                                    <th onClick={() => handleSort('updated_at')} style={{ cursor: 'pointer' }}>Date Time  {sortConfig.key === 'updated_at' && (
                                        <span style={{ fontSize: '10px', fontWeight: 'bold' }}>
                                            {sortConfig.direction === 'asc' ? '▲' : '▼'}
                                        </span>
                                    )}</th>
                                    <th onClick={() => handleSort('sim_number')} style={{ cursor: 'pointer' }}>SIM Number {sortConfig.key === 'sim_number' && (
                                        <span style={{ fontSize: '10px', fontWeight: 'bold' }}>
                                            {sortConfig.direction === 'asc' ? '▲' : '▼'}
                                        </span>
                                    )}</th>
                                    <th onClick={() => handleSort('event_type')} style={{ cursor: 'pointer' }}>Event {sortConfig.key === 'event_type' && (
                                        <span style={{ fontSize: '10px', fontWeight: 'bold' }}>
                                            {sortConfig.direction === 'asc' ? '▲' : '▼'}
                                        </span>
                                    )}</th>
                                    <th>User Name</th>
                                    <th>IP Address</th>
                                    <th style={{ textAlign: 'center' }}>Action</th>
                                </tr>
                            </thead>


                            <tbody className='table_body'>
                                {currentHistoryPage.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" style={{ textAlign: 'center' }}>No Records Found!!</td>
                                    </tr>
                                ) : (
                                    currentHistoryPage.map((sim, index) => (
                                        <tr key={sim.id}>
                                            <td>{index + 1}</td>
                                            <td> {new Date(sim.updated_at).toLocaleString('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit',
                                                hour12: false
                                            })}</td>
                                            <td>{sim.sim_number}</td>
                                            <td>{sim.event_type}</td>
                                            <td>{sim.new_name}</td>
                                            <td>{sim.ip_address}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <div
                                                    style={{
                                                        width: '30px',
                                                        height: '30px',
                                                        backgroundColor: '#e3effa',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    <img
                                                        src={eyeUserIcon}
                                                        alt='view'
                                                        style={{ width: '20px', height: '18px', cursor: 'pointer' }}
                                                        onClick={() => handleEditClick(sim)}
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

                {historyPhone && (
                    <div className='main_container_model'>
                        <div className='manage_phone_model_container'>
                            <div className='manage_phone_model_title'>
                                <h3>Changes</h3>
                                <img src={crossIcon} alt='close' className='model_cross_icon' onClick={() => setHistoryPhone(false)} />
                            </div>
                            <div className='manage_mainphonemodel'>
                                <div className='manage_mainphonemodel_first_container'>
                                    <p>Column</p>
                                    <p>New Data</p>
                                    <p>Old Data</p>
                                </div>

                                <div className='manage_mainphonemodel_second_container'>
                                    <h6>SIM Number</h6>
                                    <p>{selectedSim?.sim_number}</p>
                                    <p>{selectedSim?.sim_number}</p>
                                </div>

                                <div className='manage_mainphonemodel_second_container'>
                                    <h6>Name</h6>
                                    <p
                                        style={{
                                            color:
                                                selectedSim?.new_name !== selectedSim?.old_name
                                                    ? 'green'
                                                    : 'black'
                                        }}
                                    >
                                        {selectedSim?.new_name}
                                    </p>
                                    <p
                                        style={{
                                            color:
                                                selectedSim?.new_name !== selectedSim?.old_name
                                                    ? 'red'
                                                    : 'black'
                                        }}
                                    >
                                        {selectedSim?.old_name}
                                    </p>
                                </div>

                                <div className='manage_mainphonemodel_second_container'>
                                    <h6>Department</h6>
                                    <p
                                        style={{
                                            color:
                                                selectedSim?.new_department !== selectedSim?.old_department
                                                    ? 'green'
                                                    : 'black'
                                        }}
                                    >
                                        {selectedSim?.new_department}
                                    </p>
                                    <p
                                        style={{
                                            color:
                                                selectedSim?.new_department !== selectedSim?.old_department
                                                    ? 'red'
                                                    : 'black'
                                        }}
                                    >
                                        {selectedSim?.old_department}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpdatedPhoneHistoryByNumber;
