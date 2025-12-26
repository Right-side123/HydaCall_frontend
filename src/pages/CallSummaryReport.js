import React, { useState, useEffect } from 'react';
import '../styles/Reports.css';
import Layout from '../Components/Layout';
import Sidebar from '../Components/Sidebar';
import DateRange from '../Components/DateRange';
import api from '../Components/Api';
import downloadicon from '../assets/downloadicon.png';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


const CallSummaryReport = () => {
    const [departments, setDepartments] = useState([]);
    const [users, setUsers] = useState([]);
    const [numbers, setNumbers] = useState([]);
    const [clearDate, setClearDate] = useState(false);

    const [filters, setFilters] = useState({
        startDate: "",
        endDate: "",
        department: "",
        simNumber: "",
        userId: "",
    });

    const [reportData, setReportData] = useState({
        total_calls: 0,
        answered_calls: 0,
        missed_calls: 0,
        call_duration: "0h 0m 0s",
        outbound_total_calls: 0,
        outbound_answered_calls: 0,
        busy_calls: 0,
        noanswer_calls: 0,
        notreachable_calls: 0,
        outbound_call_duration: "0h 0m 0s",
        never_attended: 0,
        connected_calls: 0,
        unique_clients: 0
    });

    const [numberWiseReportData, setNumberWiseReportdata] = useState([]);

    // console.log(numberWiseReportData);

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


    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleDateChange = (start, end) => {
        setFilters({ ...filters, startDate: start, endDate: end });
    };

    // ---------------- Fetch Report API ----------------
    const fetchReport = async () => {
        try {
            const { startDate, endDate, department, simNumber, userId } = filters;

            if (!startDate || !endDate) {
                alert("Please select start and end date");
                return;
            }

            const res = await api.get(`/report?startDate=${startDate}&endDate=${endDate}&department=${department}&simNumber=${simNumber}&userId=${userId}`);

            setReportData(res.data);
            console.log("Report Data:", res.data);
        } catch (err) {
            console.error("Error fetching report:", err);
            alert("Error fetching report");
        }
    };


    // **************************************     Number Wise report data Fetch  ************----------------

    const fetchNumberWiseReport = async () => {
        try {
            const { startDate, endDate, department, simNumber, userId } = filters;

            if (!startDate || !endDate) {
                alert("Please select start and end date");
                return;
            }

            const res = await api.get(`/callsummeryreport?startDate=${startDate}&endDate=${endDate}&department=${department}&simNumber=${simNumber}&userId=${userId}`);

            setNumberWiseReportdata(res.data);
            console.log("Report Data:", res.data);
        } catch (err) {
            console.error("Error fetching report:", err);
            alert("Error fetching report");
        }
    };

    const handlesubmit = () => {
        fetchReport();
        fetchNumberWiseReport();
    }

    // ---------------- Clear All Filters ----------------
    const clearFilters = () => {
        setFilters({
            startDate: "",
            endDate: "",
            department: "",
            simNumber: "",
            userId: "",
        });
        setReportData({
            total_calls: 0,
            answered_calls: 0,
            missed_calls: 0,
            outbound_total_calls: 0,
            outbound_answered_calls: 0,
            busy_calls: 0,
            noanswer_calls: 0,
            notreachable_calls: 0,
            outbound_call_duration: 0,
        });
        setClearDate(true);
    };

    const downloadExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Call Summary");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, `CallSummary_${new Date().toISOString().split("T")[0]}.xlsx`);
    };

    // Convert "11h 34m 0s" -> seconds
    const timeToSeconds = (time) => {
        if (!time) return 0;
        const hMatch = time.match(/(\d+)h/);
        const mMatch = time.match(/(\d+)m/);
        const sMatch = time.match(/(\d+)s/);
        const hours = hMatch ? parseInt(hMatch[1]) : 0;
        const minutes = mMatch ? parseInt(mMatch[1]) : 0;
        const seconds = sMatch ? parseInt(sMatch[1]) : 0;
        return hours * 3600 + minutes * 60 + seconds;
    };

    // Convert seconds -> "Xh Ym Zs"
    const formatSeconds = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        return `${h}h ${m}m ${s}s`;
    };



    return (
        <div className='main-layout'>
            <Sidebar />
            <div className='page-content'>
                <div className="department_titel_container">
                    <h1 className='department_title'>CALL SUMMARY REPORT</h1>
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

                <div className='call_summary_middel_container'>
                    <div className='call_summary_middel_container_card'>
                        <div className='call_summary_middel_container_card_title'>
                            <h3>Inbound</h3>
                        </div>
                        <div className='call_summary_middel_container_card_table'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Call Status</th>
                                        <th>Calls</th>
                                        <th>Duration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Answered</td>
                                        <td>{reportData.answered_calls}</td>
                                        <td>{reportData.call_duration}</td>
                                    </tr>
                                    <tr>
                                        <td>Missed</td>
                                        <td>{reportData.missed_calls}</td>
                                        <td>-</td>
                                    </tr>

                                    <tr className='call_summary_middel_container_card_table_total_row'>
                                        <td>Total</td>
                                        <td>{reportData.total_calls}</td>
                                        <td>{reportData.call_duration}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='call_summary_middel_container_card'>
                        <div className='call_summary_middel_container_card_title'>
                            <h3>Outbound</h3>
                        </div>
                        <div className='call_summary_middel_container_card_table'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Call Status</th>
                                        <th>Calls</th>
                                        <th>Duration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Answered</td>
                                        <td>{reportData.outbound_answered_calls}</td>
                                        <td>{reportData.outbound_call_duration}</td>
                                    </tr>
                                    <tr>
                                        <td>Busy</td>
                                        <td>{reportData.busy_calls}</td>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <td>No Answered</td>
                                        <td>{reportData.noanswer_calls}</td>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <td>Not Reachable</td>
                                        <td>{reportData.notreachable_calls}</td>
                                        <td>-</td>
                                    </tr>

                                    <tr className='call_summary_middel_container_card_table_total_row'>
                                        <td>Total</td>
                                        <td>{reportData.outbound_total_calls}</td>
                                        <td>{reportData.outbound_call_duration}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='call_summary_middel_container_card'>
                        <div className='call_summary_middel_container_card_title'>
                            <h3>Call Insights</h3>
                        </div>
                        <div className='call_summary_middel_container_card_callinsight_content'>
                            <div className='call_summary_middel_container_card_callinsight_content_neverAttend'>
                                <div>
                                    <p>Never Attended</p>
                                </div>
                                <p className='call_summary_middel_container_card_callinsight_content_neverAttend_count'>{reportData.never_attended}</p>
                            </div>
                            <div className='call_summary_middel_container_card_callinsight_content_connected_call'>
                                <div>
                                    <p>Connected Calls</p>
                                </div>
                                <p className='call_summary_middel_container_card_callinsight_content_neverAttend_count'>{reportData.connected_calls}</p>
                            </div>
                            <div className='call_summary_middel_container_card_callinsight_content_connected_call'>
                                <div>
                                    <p>Unique Clients</p>
                                </div>
                                <p className='call_summary_middel_container_card_callinsight_content_neverAttend_count'>{reportData.unique_clients}</p>
                            </div>

                        </div>
                    </div>

                </div>

                <div className='call_summary_bottom_container'>
                    <div className='call_summary_bottom_container_card_title_container' style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className='call_summary_bottom_container_card_title'>
                            <h3>Employee Summary</h3>
                        </div>
                        <div className='call_summary_bottom_container_card_downloadbtn_container'>
                            <p>Total Records: {numberWiseReportData.length}</p>
                            <button onClick={() => downloadExcel(numberWiseReportData)}> <img src={downloadicon} alt='department' className='dept_icon' />Download Excel</button>
                        </div>

                    </div>

                    <div className='call_summary_bottom_container_table'>
                        <table>
                            <thead>
                                <tr>
                                    <th rowSpan='2'>#</th>
                                    <th rowSpan='2'>Phone Number</th>
                                    <th rowSpan='2'>Total Calls</th>
                                    <th rowSpan='2'>Total Duration</th>
                                    <th rowSpan='2'>Connected Calls</th>
                                    <th rowSpan='2'>Connected Calls Duration</th>
                                    <th rowSpan='2'>Connected Call Avg. Duration</th>
                                    <th rowSpan='2'>Unique Clients</th>
                                    <th colspan="5">Inbound</th>
                                    <th colspan="5">Outbound</th>
                                    <th rowSpan='2'>Missed</th>
                                    <th rowSpan='2'>Never Attended</th>
                                </tr>
                                <tr>
                                    <th>Total Call</th>
                                    <th>Total Duration</th>
                                    <th>Connected Calls</th>
                                    <th>Conn. Calls Duration</th>
                                    <th>Conn. Calls Avg. Duration</th>
                                    <th>Total Call</th>
                                    <th>Total Duration</th>
                                    <th>Connected Calls</th>
                                    <th>Conn. Calls Duration</th>
                                    <th>Conn. Calls Avg. Duration</th>
                                </tr>
                            </thead>

                            <tbody>
                                {numberWiseReportData.map((data, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{data.SIM_Number}</td>
                                        <td>{data.total_calls}</td>
                                        <td>{data.call_duration}</td>
                                        <td>{data.connected_calls}</td>
                                        <td>{data.connected_call_duration}</td>
                                        <td>
                                            {(() => {
                                                const connectedSec = timeToSeconds(data.connected_call_duration);
                                                const avgSec = data.connected_calls ? connectedSec / data.connected_calls : 0;
                                                return formatSeconds(avgSec);
                                            })()}
                                        </td>
                                        <td>{data.unique_clients}</td>

                                        {/* Inbound */}
                                        <td style={{ backgroundColor: '#e4eef8ff' }}>{data.inbound_total_calls}</td>
                                        <td style={{ backgroundColor: '#e4eef8ff' }}>{data.inbound_call_duration}</td>
                                        <td style={{ backgroundColor: '#e4eef8ff' }}>{data.inbound_connected_calls}</td>
                                        <td style={{ backgroundColor: '#e4eef8ff' }}>{data.inbound_connected_call_duration}</td>
                                        <td style={{ backgroundColor: '#e4eef8ff' }}>
                                            {(() => {
                                                const connectedSec = timeToSeconds(data.inbound_connected_call_duration);
                                                const avgSec = data.inbound_connected_calls ? connectedSec / data.inbound_connected_calls : 0;
                                                return formatSeconds(avgSec);
                                            })()}
                                        </td>

                                        {/* Outbound */}
                                        <td style={{ backgroundColor: '#e4e3e1ff' }}>{data.outbound_total_calls}</td>
                                        <td style={{ backgroundColor: '#e4e3e1ff' }}>{data.outbound_call_duration}</td>
                                        <td style={{ backgroundColor: '#e4e3e1ff' }}>{data.outbound_connected_calls}</td>
                                        <td style={{ backgroundColor: '#e4e3e1ff' }}>{data.outbound_connected_call_duration}</td>
                                        <td style={{ backgroundColor: '#e4e3e1ff' }}>
                                            {(() => {
                                                const connectedSec = timeToSeconds(data.outbound_connected_call_duration);
                                                const avgSec = data.outbound_connected_calls ? connectedSec / data.outbound_connected_calls : 0;
                                                return formatSeconds(avgSec);
                                            })()}
                                        </td>

                                        <td>{data.missed_calls}</td>
                                        <td>{data.never_attended}</td>

                                    </tr>
                                ))}
                            </tbody>


                            {/* <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>9876543210</td>
                                    <td>25</td>
                                    <td>02:15:30</td>
                                    <td>18</td>
                                    <td>01:40:20</td>
                                    <td>05:35</td>
                                    <td>12</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>12</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>00:55:20</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>10</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>00:40:15</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>04:01</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>13</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>01:20:10</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>8</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>01:00:05</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>07:30</td>
                                    <td>5</td>
                                    <td>2</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>9123456789</td>
                                    <td>30</td>
                                    <td>03:05:10</td>
                                    <td>20</td>
                                    <td>02:10:40</td>
                                    <td>06:32</td>
                                    <td>15</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>14</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>01:15:20</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }} >12</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>01:00:10</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>05:01</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>16</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>01:50:00</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>8</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>01:10:30</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>08:18</td>
                                    <td>4</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>9012345678</td>
                                    <td>15</td>
                                    <td>01:20:00</td>
                                    <td>10</td>
                                    <td>00:55:10</td>
                                    <td>05:31</td>
                                    <td>7</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>7</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>00:40:20</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>6</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>00:35:15</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>05:52</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>8</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>00:39:40</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>4</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>00:20:10</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>05:02</td>
                                    <td>3</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>8899776655</td>
                                    <td>40</td>
                                    <td>04:10:40</td>
                                    <td>28</td>
                                    <td>02:50:25</td>
                                    <td>06:02</td>
                                    <td>20</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>20</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>01:40:20</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>15</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>01:10:10</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>04:40</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>20</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>02:30:00</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>13</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>01:40:15</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>07:44</td>
                                    <td>6</td>
                                    <td>4</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>7766554433</td>
                                    <td>22</td>
                                    <td>02:00:10</td>
                                    <td>14</td>
                                    <td>01:20:05</td>
                                    <td>05:44</td>
                                    <td>10</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>10</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>00:50:30</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>8</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>00:40:00</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>05:00</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>12</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>01:10:40</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>6</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>00:40:05</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>06:40</td>
                                    <td>2</td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>6655443322</td>
                                    <td>18</td>
                                    <td>01:45:30</td>
                                    <td>12</td>
                                    <td>01:00:00</td>
                                    <td>05:00</td>
                                    <td>9</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>8</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>00:40:10</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>6</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>00:30:00</td>
                                    <td style={{ backgroundColor: '#e4eef8ff' }}>05:00</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>10</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>01:05:20</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>6</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>00:30:10</td>
                                    <td style={{ backgroundColor: '#e4e3e1ff' }}>05:01</td>
                                    <td>3</td>
                                    <td>2</td>
                                </tr>
                            </tbody> */}
                        </table>
                    </div>

                </div>
                <div className="pagination_container">
                    <button>Previous</button>
                    <button className="active_page">1</button>
                    <button>Next</button>
                </div>
            </div>
        </div>
    );
};

export default CallSummaryReport;
