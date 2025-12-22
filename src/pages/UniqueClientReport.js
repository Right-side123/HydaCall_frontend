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

const UniqueClientReport = () => {
    const [departments, setDepartments] = useState([]);
    const [numbers, setNumbers] = useState([]);
    const [users, setUsers] = useState([]);

    const [uniqueclient, setUniqueClient] = useState([])
    const [clearDate, setClearDate] = useState(false);


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

    useEffect(() => {
        fetchDepartments();
        fetchUsers();
        fetchSimNumbers();
    }, []);

    const fetchUniqueData = async () => {
        try {
            const { startDate, endDate, callType, department, simNumber, userId } = filters;

            if (!startDate || !endDate) {
                alert("Please select start and end date");
                return;
            }

            const res = await api.get("/uniqueclient", {
                params: { startDate, endDate, callType, department_id: department, simNumber, userId }
            });

            console.log("Employee Summary Data:", res.data);
            setUniqueClient(res.data);
        } catch (err) {
            console.error("Error fetching Employee Summary:", err);
        }
    };

    const clearFilters = () => {
        setFilters({
            startDate: "",
            endDate: "",
            startTime: "",
            endTime: "",
            callType: "",
            department: "",
            userId: "",
            simNumber: ""
        });
        setClearDate(true);
    };

    const handlesubmit = () => {
        fetchUniqueData();
    }


    return (
        <div className='main-layout'>
            <Sidebar />
            <div className='page-content'>
                <div className="department_titel_container">
                    <h1 className='department_title'>UNIQUE CLIENT REPORT</h1>
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
                            <p>Call Type</p>

                            <select className='analysis_report_type_select'
                                name="callType"
                                value={filters.callType}
                                onChange={handleChange}>
                                <option className='calllogs_type_option'></option>

                                <option className='calllogs_type_option'>INBOUND</option>
                                <option className='calllogs_type_option'>OUTBOUND</option>
                            </select>

                        </div>
                        <div className='call_summary_top_container_filter_content'>
                            <p>Department</p>
                            <select
                                name="department"
                                value={filters.department}
                                onChange={handleChange}

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
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>
                    <div style={{ display: 'flex', gap: '30px' }}>
                        <div className='call_summary_top_container_filter_content'>
                            <p>SIM Number</p>
                            <select
                                name="simNumber"
                                value={filters.simNumber}
                                onChange={handleChange}

                            >
                                <option value=""></option>
                                {numbers.map((num) => (
                                    <option key={num.SIM_Number} value={num.SIM_Number}>
                                        {num.SIM_Number} - {num.Name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='call_summary_top_container_search_archive'>
                            <input
                                type='checkbox' /><p>Search In Archive</p>
                        </div>
                    </div>
                </div>
                <div className='call_summary_top_container'>
                    <div className='never_attend_container_card_title'>
                        <h3>Unique Client</h3>
                        <p>Total record: {uniqueclient.length}</p>
                    </div>
                    <div className='never_attend_container_table'>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Customer Number</th>
                                    <th>Total Calls</th>
                                    <th>
                                        Total Duration
                                    </th>
                                    <th>Incoming Calls</th>
                                    <th>Incoming Duration</th>
                                    <th>Outgoing Calls</th>
                                    <th>Outgoing Duration</th>
                                    <th>Missed</th>
                                    <th>Connected Calls</th>
                                    <th>Never Attended</th>
                                    <th>Last Call Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {uniqueclient.length === 0 ? (
                                    <tr><td colSpan="12" style={{ textAlign: 'center' }}>No data found</td></tr>
                                ) : uniqueclient.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data["#"]}</td>
                                        <td>{data.CustomerNumber}</td>
                                        <td>{data.TotalCalls}</td>
                                        <td>{data.TotalDuration}</td>
                                        <td>{data.IncomingCalls}</td>
                                        <td>{data.IncomingDuration}</td>
                                        <td>{data.OutgoingCalls}</td>
                                        <td>{data.OutgoingDuration}</td>
                                        <td>{data.Missed}</td>
                                        <td>{data.ConnectedCalls}</td>
                                        <td>{data.NeverAttend}</td>
                                        <td>{data.LastCallDate}-{data.LastCallTime}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UniqueClientReport;
