import React, { useState, useEffect } from 'react';
import '../styles/Reports.css';
import Layout from '../Components/Layout';
// import reportCallIcon from '../assets/reportcall.png';
// import analysisIcon from '../assets/reportsicon.png';
// import hourlyIcon from '../assets/hourrport.png';
// import dayAnalysisIcon from '../assets/dayreport.png';
// import nevericon from '../assets/neverattend.png';
// import notPickupIcon from '../assets/reportclient.png';
import Sidebar from '../Components/Sidebar';
import DateRange from '../Components/DateRange';
import api from '../Components/Api';
// import downloadicon from '../assets/downloadicon.png';

const NotPickupClientReport = () => {
    const [departments, setDepartments] = useState([]);
    const [numbers, setNumbers] = useState([]);
    const [users, setUsers] = useState([]);
    const [clearDate, setClearDate] = useState(false);
    const [notPickupClientData, setNotPickupClientData] = useState([]);

    const [filters, setFilters] = useState({
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        callType: "",
        department: "",
        simNumber: "",
        userId: "",
    });
    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };
    const handleDateChange = (start, end) => {
        setFilters({ ...filters, startDate: start, endDate: end });
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentNotPickupData = notPickupClientData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(notPickupClientData.length / itemsPerPage);



    const fetchDepartments = async () => {
        try {
            const res = await api.get("/department");
            setDepartments(res.data);
        } catch (err) {
            console.error("Error fetching department:", err);
        }
    }

    const fetchUsers = async () => {
        try {
            const res = await api.get("/user");
            setUsers(res.data);
        } catch (err) {
            console.error("Error fetching user:", err)
        }
    }

    const fetchSimNumbers = async () => {
        try {
            const res = await api.get("/simnumber");
            setNumbers(res.data);
        } catch (err) {
            console.error("Error fetching SIM Number:", err);
        }
    }


    const fetchNotPickipClientData = async () => {
        try {
            const { startDate, endDate, department, simNumber, userId } = filters;

            if (!startDate || !endDate) {
                alert("Please select start and end date");
                return;
            }

            const res = await api.get("/notpickupbyclient", {
                params: { startDate, endDate, department_id: department, simNumber, userId }
            });

            console.log("Employee Summary Data:", res.data);
            setNotPickupClientData(res.data);
        } catch (err) {
            console.error("Error fetching Employee Summary:", err);
        }
    };

    useEffect(() => {
        fetchDepartments();
        fetchUsers();
        fetchSimNumbers();
    }, []);

    const clearFilters = () => {
        setFilters({
            startDate: "",
            endDate: "",
            startTime: "",
            endTime: "",
            department: "",
            userId: "",
            simNumber: ""
        });
        setClearDate(true);
    };

    const handlesubmit = () => {
        fetchNotPickipClientData();
    }

    return (
        <div className='main-layout'>
            <Sidebar />
            <div className='page-content'>
                <div className="department_titel_container">
                    <h1 className='department_title'>NOT PICKUP BY CLIENT REPORT</h1>
                    <Layout></Layout>
                </div>
                <div className='call_summary_top_container'>
                    <div className='call_summary_top_container_title'>
                        <h3>Filter</h3>
                        <div className='call_summary_top_container_btn'>
                            <button className='call_summary_top_container_btn_clearall' onClick={clearFilters}>Clear All</button>
                            <button className='call_summary_top_container_btn_apply' onClick={handlesubmit}>Apply Filter</button>
                        </div>
                    </div>
                    <div className='call_summary_top_container_filter'>
                        <div className='call_summary_top_container_filter_content'>
                            <p>Date Range</p>
                            <div className='call_summary_top_container_filter_content_daterange'>
                                <DateRange align='left' onDateChange={handleDateChange} clearSignal={clearDate}></DateRange>
                                X
                            </div>
                        </div>
                        <div className='call_summary_top_container_filter_content'>
                            <p>Department</p>
                            <select
                                name="department"
                                value={filters.department}
                                onChange={handleChange}
                                required
                            >
                                <option value=""></option>
                                {departments.map((dept) => (
                                    <option key={dept.id} value={dept.id}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='call_summary_top_container_filter_content'>
                            <p>User</p>
                            <select
                                name="userId"
                                value={filters.userId}
                                onChange={handleChange}
                                required
                            >
                                <option value=""></option>
                                {users.map((dept) => (
                                    <option key={dept.id} value={dept.id}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='call_summary_top_container_filter_content'>
                            <p>SIM Number</p>
                            <select
                                name="simNumber"
                                value={filters.simNumber}
                                onChange={handleChange}
                                required
                            >
                                <option value=""></option>
                                {numbers.map((num) => (
                                    <option key={num.SIM_Number} value={num.SIM_Number}>
                                        {num.SIM_Number} - {num.Name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='call_summary_top_container_search_archive'>
                        <input
                            type='checkbox' /> <p>Search In Archive</p>
                    </div>
                </div>
                <div className='call_summary_top_container'>
                    <div className='never_attend_container_card_title'>
                        <h3>Not Pickup By Client Call Logs</h3>
                        <p>Total record: {notPickupClientData.length}</p>
                    </div>
                    <div className='never_attend_container_table'>
                        <table>
                            <thead>
                                <tr>
                                    <th rowSpan="2">#</th>
                                    <th rowSpan="2">Employee</th>
                                    <th rowSpan="2">To Number</th>
                                    <th colSpan="3" style={{ border: "none" }}></th>
                                </tr>
                                <tr style={{ border: "none" }}>
                                    <th >Call Type</th>
                                    <th style={{ border: "none" }}>Date</th>
                                    <th style={{ border: "none" }}>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentNotPickupData.length === 0 ? (
                                    <tr><td colSpan="6" style={{ textAlign: 'center' }}>No data found</td></tr>
                                ) : currentNotPickupData.map((call, index) => (
                                    <tr key={index}>
                                        <td>{call["#"]}</td>
                                        <td>{`${call.Employee} - ${call.EmployeeName}`}</td>
                                        <td>{call.ToNumber}</td>
                                        <td>{call.CallType}</td>
                                        <td>{call.Date}</td>
                                        <td>{call.Time}</td>
                                    </tr>
                                ))}
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
            </div>
        </div>
    );
};

export default NotPickupClientReport;
