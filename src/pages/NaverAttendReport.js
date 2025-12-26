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

const NeverAttendReport = () => {
    const [departments, setDepartments] = useState([]);
    const [numbers, setNumbers] = useState([]);
    const [users, setUsers] = useState([]);
    const [neverAttendData, setNeverAttentData] = useState([])
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



    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calculate indexes
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Apply search + pagination together
    const currentNeverAttendData = neverAttendData.slice(indexOfFirstItem, indexOfLastItem);

    // Total pages
    const totalPages = Math.ceil(neverAttendData.length / itemsPerPage);

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

    const fetchNeverAttendData = async () => {
        try {
            const { startDate, endDate, department, simNumber, userId } = filters;

            if (!startDate || !endDate) {
                alert("Please select start and end date");
                return;
            }

            const res = await api.get("/neverattendreport", {
                params: { startDate, endDate, department_id: department, simNumber, userId }
            });

            console.log("Employee Summary Data:", res.data);
            setNeverAttentData(res.data);
        } catch (err) {
            console.error("Error fetching Employee Summary:", err);
        }
    };



    useEffect(() => {
        fetchDepartments();
        fetchSimNumbers();
        fetchUsers();
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
        fetchNeverAttendData();
    }

    const downloadCSV = () => {
        if (neverAttendData.length === 0) return;

        const headers = ["#", "Employee", "To Number", "Call Type", "Date", "Time"];

        const rows = neverAttendData.map(c => [
            c["#"],
            `${c.Employee} - ${c.EmployeeName}`,
            c.ToNumber,
            c.CallType,
            c.Date,
            c.Time
        ]);

        let csvContent =
            "data:text/csv;charset=utf-8," +
            [headers, ...rows].map(r => r.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "NeverAttendedReport.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <div className='main-layout'>
            <Sidebar />

            <div className='page-content'>
                <div className="department_titel_container">
                    <h1 className='department_title'>NEVER ATTENDED REPORT</h1>
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
                                <DateRange align='left' onDateChange={handleDateChange} clearSignal={clearDate} />
                                X
                            </div>
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
                            >
                                <option value=""></option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
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
                        <h3>Never Attended</h3>
                        <button onClick={downloadCSV}>Download CSV</button>
                    </div>


                    <div className='never_attend_container_table'>
                        <table>
                            <thead>
                                <tr>
                                    <th rowSpan="2">#</th>
                                    <th rowSpan="2">Employee</th>
                                    <th rowSpan="2">To Number</th>
                                    <th colSpan="3"></th>
                                </tr>
                                <tr style={{ border: "none" }}>
                                    <th>Call Type</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentNeverAttendData.length === 0 ? (
                                    <tr><td colSpan="6" style={{ textAlign: 'center' }}>No data found</td></tr>
                                ) : currentNeverAttendData.map((call, index) => (
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

export default NeverAttendReport;
