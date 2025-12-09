import React, { useState, useEffect } from 'react';
import '../styles/Reports.css';
import Layout from '../Components/Layout';
import Sidebar from '../Components/Sidebar';
import DateRange from '../Components/DateRange';
import api from '../Components/Api';

import CallVsConnectedChartDaywiseReport from '../Components/callvsConnectedCallDaywise'

const DayWiseAnalysisReport = () => {
    const [departments, setDepartments] = useState([]);
    const [startTime, setStartTime] = useState("00:00");
    const [endTime, setEndTime] = useState("23:59");

    const [clearDate, setClearDate] = useState(false);
    const [numbers, setNumbers] = useState([]);
    const [users, setUsers] = useState([]);

    const [summaryData, setSummaryData] = useState([]);



    const timeSlotsSummery = [
        "10:00 - 10:59",
        "11:00 - 11:59",
        "12:00 - 12:59",
        "13:00 - 13:59",
        "14:00 - 14:59",
        "15:00 - 15:59",
        "16:00 - 16:59",
        "17:00 - 17:59",
        "18:00 - 18:59"
    ];

    const slotToKey = {
        "10:00 - 10:59": "hr10",
        "11:00 - 11:59": "hr11",
        "12:00 - 12:59": "hr12",
        "13:00 - 13:59": "hr13",
        "14:00 - 14:59": "hr14",
        "15:00 - 15:59": "hr15",
        "16:00 - 16:59": "hr16",
        "17:00 - 17:59": "hr17",
        "18:00 - 18:59": "hr18"
    };


    const convertToSeconds = (duration) => {
        if (!duration) return 0;
        const [h, m, s] = duration.split(/[hms ]+/).filter(Boolean).map(Number);
        return (h * 3600) + (m * 60) + s;
    };

    //  Format seconds → h m s
    const formatDuration = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        return `${h}h ${m}m ${s}s`;
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }





    const dayWiseData = [
        {
            date: '11/10/2025',
            total: { calls: 4, connected: 2, duration: 180 },
            before10: { calls: 0, connected: 0, duration: 0 },
            hr10: { calls: 0, connected: 0, duration: 0 },
            hr11: { calls: 1, connected: 0, duration: 10 },
            hr12: { calls: 10, connected: 2, duration: 10 },
            hr13: { calls: 2, connected: 1, duration: 60 },
            hr14: { calls: 0, connected: 0, duration: 0 },
            hr15: { calls: 3, connected: 2, duration: 100 },
            hr16: { calls: 0, connected: 0, duration: 0 },
            hr17: { calls: 0, connected: 0, duration: 0 },
            hr18: { calls: 0, connected: 0, duration: 0 },
            after19: { calls: 0, connected: 0, duration: 0 },

        },

        {
            date: '12/10/2025',
            total: { calls: 4, connected: 2, duration: 180 },
            before10: { calls: 0, connected: 0, duration: 0 },
            hr10: { calls: 0, connected: 0, duration: 0 },
            hr11: { calls: 1, connected: 0, duration: 10 },
            hr12: { calls: 10, connected: 2, duration: 10 },
            hr13: { calls: 2, connected: 1, duration: 60 },
            hr14: { calls: 0, connected: 0, duration: 0 },
            hr15: { calls: 3, connected: 2, duration: 100 },
            hr16: { calls: 0, connected: 0, duration: 0 },
            hr17: { calls: 0, connected: 0, duration: 0 },
            hr18: { calls: 0, connected: 0, duration: 0 },
            after19: { calls: 0, connected: 0, duration: 0 },
        },
    ];


    const fetchEmployeeSummary = async () => {
        try {
            const { startDate, endDate, department, simNumber, userId, callType } = filters;

            if (!startDate || !endDate) {
                alert("Please select start and end date");
                return;
            }

            const res = await api.get("/daywisereport", {
                params: { startDate, endDate, department_id: department, simNumber, userId, callType, startTime, endTime }
            });

            console.log("Employee Summary Data:", res.data);
            setSummaryData(res.data);
        } catch (err) {
            console.error("Error fetching Employee Summary:", err);
        }
    };

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
        fetchSimNumbers();
        fetchUsers();
    }, []);

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
        fetchEmployeeSummary();
    }


    const chartData = summaryData.map(day => ({
    date: new Date(day.date).toLocaleDateString("en-GB"), // 2025-12-03T18:30:00.000Z => 03/12/2025
    totalCalls: day.totalCalls || 0,
    connectedCalls: day.connectedCalls || 0,
}));


    return (
        <div className='main-layout'>
            <Sidebar />

            <div className='page-content'>
                <div className="department_titel_container">
                    <h1 className='department_title'>DAY WISE ANALYSIS REPORT</h1>
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

                        <div className='callogs_daterange_contaier'>
                            <p>Time (HH:MM)</p>
                            <div className='analysis_report_time_container'>
                                {/* <div className='calllogs_time'> */}
                                <input
                                    className='select_times'
                                    type='time'
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                />
                                {/* </div> */}
                                {/* <div className='call_summary_top_container_filter_content'> */}
                                <input className='call_summary_top_container_filter_content'
                                    type='time'
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)} />
                                {/* </div> */}
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

                    </div>

                    <div className='call_summary_top_container_search_archive'>
                        <div className='call_summary_top_container_filter_content'>
                            <p>User</p>
                            <select
                                name="userId"
                                value={filters.userId}
                                onChange={handleChange}
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
                            >
                                <option value=""></option>
                                {numbers.map((num) => (
                                    <option key={num.SIM_Number} value={num.SIM_Number}>
                                        {num.SIM_Number} - {num.Name}
                                    </option>

                                ))}
                            </select>
                        </div>
                        <div className='anyalysis_report_search_in_archive'>
                            <input
                                type='checkbox' /> Search In Archive
                        </div>

                    </div>

                </div>

                <div className='call_summary_bottom_container'>
                    <div className='day_wise_table_card_title'>
                        <h3>Day Wise Analysis</h3>
                        <button>Download Excel</button>
                    </div>
                    <div className='day_wise_container_table'>
                        {/* <table>
                            <thead>
                                <tr>
                                    <th rowSpan='2' style={{ padding: '0px 100px' }}>Days</th>
                                    <th colSpan='3'>Total</th>
                                    <th colSpan='3'>Before 10:00</th>
                                    <th colSpan='3'>10:00-10:59</th>
                                    <th colSpan='3'>11:00-11:59</th>
                                    <th colSpan='3'>12:00-12:59</th>
                                    <th colSpan='3'>13:00-13:59</th>
                                    <th colSpan='3'>14:00-14:59</th>
                                    <th colSpan='3'>15:00-15:59</th>
                                    <th colSpan='3'>16:00-16:59</th>
                                    <th colSpan='3'>17:00-17:59</th>
                                    <th colSpan='3'>18:00-18:59</th>
                                    <th colSpan='3'>After 19:00</th>
                                </tr>
                                <tr>
                                    <th>Total Calls</th>
                                    <th>Total Connected Calls</th>
                                    <th>Total Duration</th>
                                  
                                    <th>Total Calls</th>
                                    <th>Total Connected Calls</th>
                                    <th>Total Duration</th>

                                    <th>Total Calls</th>
                                    <th>Total Connected Calls</th>
                                    <th>Total Duration</th>

                                    <th>Total Calls</th>
                                    <th>Total Connected Calls</th>
                                    <th>Total Duration</th>

                                    <th>Total Calls</th>
                                    <th>Total Connected Calls</th>
                                    <th>Total Duration</th>

                                    <th>Total Calls</th>
                                    <th>Total Connected Calls</th>
                                    <th>Total Duration</th>

                                    <th>Total Calls</th>
                                    <th>Total Connected Calls</th>
                                    <th>Total Duration</th>

                                    <th>Total Calls</th>
                                    <th>Total Connected Calls</th>
                                    <th>Total Duration</th>

                                    <th>Total Calls</th>
                                    <th>Total Connected Calls</th>
                                    <th>Total Duration</th>

                                    <th>Total Calls</th>
                                    <th>Total Connected Calls</th>
                                    <th>Total Duration</th>

                                    <th>Total Calls</th>
                                    <th>Total Connected Calls</th>
                                    <th>Total Duration</th>

                                    <th>Total Calls</th>
                                    <th>Total Connected Calls</th>
                                    <th>Total Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dayWiseData.map((day, idx) => (
                                    <tr key={idx}>
                                        <td>{day.date}</td>
                                        <td>{day.total.calls}</td>
                                        <td>{day.total.connected}</td>
                                        <td>{formatDuration(day.total.duration)}</td>

                                        <td>{day.before10.calls}</td>
                                        <td>{day.before10.connected}</td>
                                        <td>{formatDuration(day.before10.duration)}</td>

                                        <td>{day.hr10.calls}</td>
                                        <td>{day.hr10.connected}</td>
                                        <td>{formatDuration(day.hr10.duration)}</td>

                                        <td>{day.hr11.calls}</td>
                                        <td>{day.hr11.connected}</td>
                                        <td>{formatDuration(day.hr11.duration)}</td>

                                        <td>{day.hr12.calls}</td>
                                        <td>{day.hr12.connected}</td>
                                        <td>{formatDuration(day.hr12.duration)}</td>

                                        <td>{day.hr13.calls}</td>
                                        <td>{day.hr13.connected}</td>
                                        <td>{formatDuration(day.hr13.duration)}</td>

                                        <td>{day.hr14.calls}</td>
                                        <td>{day.hr14.connected}</td>
                                        <td>{formatDuration(day.hr14.duration)}</td>

                                        <td>{day.hr15.calls}</td>
                                        <td>{day.hr15.connected}</td>
                                        <td>{formatDuration(day.hr15.duration)}</td>

                                        <td>{day.hr16.calls}</td>
                                        <td>{day.hr16.connected}</td>
                                        <td>{formatDuration(day.hr16.duration)}</td>

                                        <td>{day.hr17.calls}</td>
                                        <td>{day.hr17.connected}</td>
                                        <td>{formatDuration(day.hr17.duration)}</td>

                                        <td>{day.hr18.calls}</td>
                                        <td>{day.hr18.connected}</td>
                                        <td>{formatDuration(day.hr18.duration)}</td>

                                        <td>{day.after19.calls}</td>
                                        <td>{day.after19.connected}</td>
                                        <td>{formatDuration(day.after19.duration)}</td>


                                    </tr>
                                ))}

                            
                                <tr>
                                    <td>Total</td>
                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.total.calls, 0)}
                                    </td>
                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.total.connected, 0)}
                                    </td>
                                    <td>
                                        {formatDuration(dayWiseData.reduce((acc, day) => acc + day.total.duration, 0))}
                                    </td>


                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.before10.calls, 0)}
                                    </td>
                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.before10.connected, 0)}
                                    </td>
                                    <td>
                                        {formatDuration(dayWiseData.reduce((acc, day) => acc + day.before10.duration, 0))}
                                    </td>


                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr10.calls, 0)}
                                    </td>
                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr10.connected, 0)}
                                    </td>
                                    <td>
                                        {formatDuration(dayWiseData.reduce((acc, day) => acc + day.hr10.duration, 0))}
                                    </td>



                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr11.calls, 0)}
                                    </td>
                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr11.connected, 0)}
                                    </td>
                                    <td>
                                        {formatDuration(dayWiseData.reduce((acc, day) => acc + day.hr11.duration, 0))}
                                    </td>


                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr12.calls, 0)}
                                    </td>
                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr12.connected, 0)}
                                    </td>
                                    <td>
                                        {formatDuration(dayWiseData.reduce((acc, day) => acc + day.hr12.duration, 0))}
                                    </td>


                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr13.calls, 0)}
                                    </td>
                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr13.connected, 0)}
                                    </td>
                                    <td>
                                        {formatDuration(dayWiseData.reduce((acc, day) => acc + day.hr13.duration, 0))}
                                    </td>


                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr14.calls, 0)}
                                    </td>
                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr14.connected, 0)}
                                    </td>
                                    <td>
                                        {formatDuration(dayWiseData.reduce((acc, day) => acc + day.hr14.duration, 0))}
                                    </td>


                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr15.calls, 0)}
                                    </td>
                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr15.connected, 0)}
                                    </td>
                                    <td>
                                        {formatDuration(dayWiseData.reduce((acc, day) => acc + day.hr15.duration, 0))}
                                    </td>


                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr16.calls, 0)}
                                    </td>
                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr16.connected, 0)}
                                    </td>
                                    <td>
                                        {formatDuration(dayWiseData.reduce((acc, day) => acc + day.hr16.duration, 0))}
                                    </td>


                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr17.calls, 0)}
                                    </td>
                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr17.connected, 0)}
                                    </td>
                                    <td>
                                        {formatDuration(dayWiseData.reduce((acc, day) => acc + day.hr17.duration, 0))}
                                    </td>


                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr18.calls, 0)}
                                    </td>
                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr18.connected, 0)}
                                    </td>
                                    <td>
                                        {formatDuration(dayWiseData.reduce((acc, day) => acc + day.hr18.duration, 0))}
                                    </td>


                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.after19.calls, 0)}
                                    </td>
                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.after19.connected, 0)}
                                    </td>
                                    <td>
                                        {formatDuration(dayWiseData.reduce((acc, day) => acc + day.after19.duration, 0))}
                                    </td>
                                </tr>

                      
                                <tr>
                                    <td>Daily Average</td>
                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.total.calls, 0) / dayWiseData.length}
                                    </td>
                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.total.connected, 0) / dayWiseData.length}
                                    </td>
                                    <td>
                                        {formatDuration(dayWiseData.reduce((acc, day) => acc + day.total.duration, 0) / dayWiseData.length)}
                                    </td>



                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.before10.calls, 0) / dayWiseData.length}
                                    </td>
                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.before10.connected, 0) / dayWiseData.length}
                                    </td>
                                    <td>
                                        {formatDuration(dayWiseData.reduce((acc, day) => acc + day.before10.duration, 0) / dayWiseData.length)}
                                    </td>



                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr10.calls, 0) / dayWiseData.length}
                                    </td>
                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr10.connected, 0) / dayWiseData.length}
                                    </td>
                                    <td>
                                        {formatDuration(dayWiseData.reduce((acc, day) => acc + day.hr10.duration, 0) / dayWiseData.length)}
                                    </td>



                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr11.calls, 0) / dayWiseData.length}
                                    </td>
                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr11.connected, 0) / dayWiseData.length}
                                    </td>
                                    <td>
                                        {formatDuration(dayWiseData.reduce((acc, day) => acc + day.hr11.duration, 0) / dayWiseData.length)}
                                    </td>



                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr12.calls, 0) / dayWiseData.length}
                                    </td>
                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr12.connected, 0) / dayWiseData.length}
                                    </td>
                                    <td>
                                        {formatDuration(dayWiseData.reduce((acc, day) => acc + day.hr12.duration, 0) / dayWiseData.length)}
                                    </td>



                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr13.calls, 0) / dayWiseData.length}
                                    </td>
                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr13.connected, 0) / dayWiseData.length}
                                    </td>
                                    <td>
                                        {formatDuration(dayWiseData.reduce((acc, day) => acc + day.hr13.duration, 0) / dayWiseData.length)}
                                    </td>



                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr14.calls, 0) / dayWiseData.length}
                                    </td>
                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr14.connected, 0) / dayWiseData.length}
                                    </td>
                                    <td>
                                        {formatDuration(dayWiseData.reduce((acc, day) => acc + day.hr14.duration, 0) / dayWiseData.length)}
                                    </td>



                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr15.calls, 0) / dayWiseData.length}
                                    </td>
                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr15.connected, 0) / dayWiseData.length}
                                    </td>
                                    <td>
                                        {formatDuration(dayWiseData.reduce((acc, day) => acc + day.hr15.duration, 0) / dayWiseData.length)}
                                    </td>



                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr16.calls, 0) / dayWiseData.length}
                                    </td>
                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr16.connected, 0) / dayWiseData.length}
                                    </td>
                                    <td>
                                        {formatDuration(dayWiseData.reduce((acc, day) => acc + day.hr16.duration, 0) / dayWiseData.length)}
                                    </td>



                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr17.calls, 0) / dayWiseData.length}
                                    </td>
                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr17.connected, 0) / dayWiseData.length}
                                    </td>
                                    <td>
                                        {formatDuration(dayWiseData.reduce((acc, day) => acc + day.hr17.duration, 0) / dayWiseData.length)}
                                    </td>



                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr18.calls, 0) / dayWiseData.length}
                                    </td>
                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.hr18.connected, 0) / dayWiseData.length}
                                    </td>
                                    <td>
                                        {formatDuration(dayWiseData.reduce((acc, day) => acc + day.hr18.duration, 0) / dayWiseData.length)}
                                    </td>



                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.after19.calls, 0) / dayWiseData.length}
                                    </td>
                                    <td>
                                        {dayWiseData.reduce((acc, day) => acc + day.after19.connected, 0) / dayWiseData.length}
                                    </td>
                                    <td>
                                        {formatDuration(dayWiseData.reduce((acc, day) => acc + day.after19.duration, 0) / dayWiseData.length)}
                                    </td>
                                </tr>

                   
                                <tr>
                                    <td>No of Days with no calls in Time Slot</td>
                                    <td>
                                        {dayWiseData.filter(day => day.totalCalls === 0).length}
                                    </td>
                                    <td></td>
                                    <td></td>


                                    <td>
                                        {dayWiseData.filter(day => day.before10.calls === 0).length}
                                    </td>
                                    <td></td>
                                    <td></td>


                                    <td>
                                        {dayWiseData.filter(day => day.hr10.calls === 0).length}
                                    </td>
                                    <td></td>
                                    <td></td>


                                    <td>
                                        {dayWiseData.filter(day => day.hr11.calls === 0).length}
                                    </td>
                                    <td></td>
                                    <td></td>


                                    <td>
                                        {dayWiseData.filter(day => day.hr12.calls === 0).length}
                                    </td>
                                    <td></td>
                                    <td></td>


                                    <td>
                                        {dayWiseData.filter(day => day.hr13.calls === 0).length}
                                    </td>
                                    <td></td>
                                    <td></td>


                                    <td>
                                        {dayWiseData.filter(day => day.hr14.calls === 0).length}
                                    </td>
                                    <td></td>
                                    <td></td>


                                    <td>
                                        {dayWiseData.filter(day => day.hr15.calls === 0).length}
                                    </td>
                                    <td></td>
                                    <td></td>


                                    <td>
                                        {dayWiseData.filter(day => day.hr16.calls === 0).length}
                                    </td>
                                    <td></td>
                                    <td></td>


                                    <td>
                                        {dayWiseData.filter(day => day.hr17.calls === 0).length}
                                    </td>
                                    <td></td>
                                    <td></td>


                                    <td>
                                        {dayWiseData.filter(day => day.hr18.calls === 0).length}
                                    </td>
                                    <td></td>
                                    <td></td>


                                    <td>
                                        {dayWiseData.filter(day => day.after19.calls === 0).length}
                                    </td>
                                    <td></td>
                                    <td></td>

                                </tr>
                            </tbody>

                        </table> */}

                        <table>
                            <thead>
                                <tr style={{
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    color: "#696868",
                                    backgroundColor: "#f4f8fc"
                                }}>
                                    <th rowSpan="2" style={{ padding: "8px", border: "1px solid #ccc" }}>Days</th>
                                    <th colSpan="3">Total</th>

                                    <th colSpan="3">Before 10:00</th>
                                    <th colSpan="3">10:00 - 10:59</th>
                                    <th colSpan="3">11:00 - 11:59</th>
                                    <th colSpan="3">12:00 - 12:59</th>
                                    <th colSpan="3">13:00 - 13:59</th>
                                    <th colSpan="3">14:00 - 14:59</th>
                                    <th colSpan="3">15:00 - 15:59</th>
                                    <th colSpan="3">16:00 - 16:59</th>
                                    <th colSpan="3">17:00 - 17:59</th>
                                    <th colSpan="3">18:00 - 18:59</th>
                                    <th colSpan="3">After 19:00</th>
                                </tr>
                                <tr style={{
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    color: "#696868",
                                    backgroundColor: "#f4f8fc"
                                }}>
                                    <th>Total Calls</th>
                                    <th>Total Connected Calls</th>
                                    <th>Total Duration</th>

                                    {Array.from({ length: 11 }).map((_, i) => (
                                        <React.Fragment key={i}>
                                            <th>Total Calls</th>
                                            <th>Total Connected Calls</th>
                                            <th>Total Duration</th>

                                        </React.Fragment>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {summaryData?.length > 0 ? (
                                    summaryData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{formatDate(item?.date || "--")}</td>
                                            <td>{item?.totalCalls || 0}</td>
                                            <td>{item?.connectedCalls || 0}</td>
                                            <td>{item?.totalDuration || "0h 0m 0s"}</td>

                                            {/* Before 10:00 */}
                                            <td>{item?.before10?.totalCalls || 0}</td>
                                            <td>{item?.before10?.connected || 0}</td>
                                            <td>{item?.before10?.duration || "0h 0m 0s"}</td>

                                            {/* Hourly slots */}
                                            {timeSlotsSummery.map((slot, i) => {
                                                const clean = (s) =>
                                                    s?.toString().replace(/\s+/g, "").replace(/–/g, "-").trim().toLowerCase();

                                                const hourData = item?.hourlySlots?.find(
                                                    (h) => clean(h?.hourSlot) === clean(slot)
                                                ) || {};


                                                return (
                                                    <React.Fragment key={i}>
                                                        <td>{hourData?.totalCalls || 0}</td>
                                                        <td>{hourData?.connected || 0}</td>
                                                        <td>{hourData?.duration || "0h 0m 0s"}</td>
                                                    </React.Fragment>
                                                );
                                            })}

                                            {/* After 19:00 */}
                                            <td>{item?.after19?.totalCalls || 0}</td>
                                            <td>{item?.after19?.connected || 0}</td>
                                            <td>{item?.after19?.duration || "0h 0m 0s"}</td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="85" style={{ textAlign: "left", padding: "10px" }}>
                                            No records found !!
                                        </td>
                                    </tr>
                                )}

                                <tr>
                                    <td>Total</td>
                                    <td>
                                        {summaryData.reduce((acc, day) => acc + day.totalCalls, 0)}
                                    </td>
                                    <td>
                                        {summaryData.reduce((acc, day) => acc + day.connectedCalls, 0)}
                                    </td>
                                    <td>
                                        {formatDuration(
                                            summaryData.reduce((acc, day) => {
                                                return acc + convertToSeconds(day.totalDuration);
                                            }, 0)
                                        )}
                                    </td>

                                    <td>
                                        {summaryData.reduce((acc, day) => acc + day.before10.totalCalls, 0)}
                                    </td>
                                    <td>
                                        {summaryData.reduce((acc, day) => acc + day.before10.connected, 0)}
                                    </td>
                                    <td>
                                        {formatDuration(
                                            summaryData.reduce((acc, day) => {
                                                return acc + convertToSeconds(day.before10.duration);
                                            }, 0)
                                        )}
                                    </td>

                                    {timeSlotsSummery.map((slot, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <td>
                                                    {summaryData.reduce((acc, day) => {
                                                        const slotData = day.hourlySlots?.[slot];
                                                        return acc + (slotData?.totalCalls || 0);
                                                    }, 0)}
                                                </td>

                                                <td>
                                                    {summaryData.reduce((acc, day) => {
                                                        const slotData = day.hourlySlots?.[slot];
                                                        return acc + (slotData?.connected || 0);
                                                    }, 0)}
                                                </td>

                                                <td>
                                                    {formatDuration(
                                                        summaryData.reduce((acc, day) => {
                                                            const slotData = day.hourlySlots?.[slot];
                                                            return acc + (slotData?.duration || 0);
                                                        }, 0)
                                                    )}
                                                </td>
                                            </React.Fragment>
                                        );
                                    })}

                                    <td>
                                        {summaryData.reduce((acc, day) => acc + day.after19.totalCalls, 0)}
                                    </td>
                                    <td>
                                        {summaryData.reduce((acc, day) => acc + day.after19.connected, 0)}
                                    </td>
                                    <td>
                                        {formatDuration(
                                            summaryData.reduce((acc, day) => {
                                                return acc + convertToSeconds(day.after19.duration);
                                            }, 0)
                                        )}
                                    </td>
                                </tr>

                                <tr>
                                    <td>Daily Average</td>
                                    <td>
                                        {(
                                            summaryData.reduce((acc, day) => acc + day.totalCalls, 0) / summaryData.length
                                        ).toFixed(2)}
                                    </td>

                                    <td>
                                        {(
                                            summaryData.reduce((acc, day) => acc + day.connectedCalls, 0) / summaryData.length
                                        ).toFixed(2)}
                                    </td>

                                    <td>
                                        {formatDuration(
                                            summaryData.reduce((acc, day) => {
                                                return acc + convertToSeconds(day.totalDuration);
                                            }, 0) / summaryData.length
                                        )}
                                    </td>

                                    <td>
                                        {(
                                            summaryData.reduce((acc, day) => acc + day.before10.totalCalls, 0) / summaryData.length
                                        ).toFixed(2)}
                                    </td>

                                    <td>
                                        {(
                                            summaryData.reduce((acc, day) => acc + day.before10.connected, 0) / summaryData.length
                                        ).toFixed(2)}
                                    </td>

                                    <td>
                                        {formatDuration(
                                            summaryData.reduce((acc, day) => {
                                                return acc + convertToSeconds(day.before10.duration);
                                            }, 0) / summaryData.length
                                        )}
                                    </td>

                                    {timeSlotsSummery.map((slot, index) => {
                                        const key = slotToKey[slot];

                                        return (
                                            <React.Fragment key={index}>
                                                <td>
                                                    {summaryData.reduce((acc, day) => acc + day[key]?.totalCalls, 0) / summaryData.length}
                                                </td>
                                                <td>
                                                    {summaryData.reduce((acc, day) => acc + day[key]?.connected, 0) / summaryData.length}
                                                </td>
                                                <td>
                                                    {formatDuration(summaryData.reduce((acc, day) => acc + day[key]?.duration, 0) / summaryData.length)}
                                                </td>
                                            </React.Fragment>
                                        );
                                    })}

                                    <td>
                                        {(
                                            summaryData.reduce((acc, day) => acc + day.after19.totalCalls, 0) / summaryData.length
                                        ).toFixed(2)}
                                    </td>

                                    <td>
                                        {(
                                            summaryData.reduce((acc, day) => acc + day.after19.connected, 0) / summaryData.length
                                        ).toFixed(2)}
                                    </td>
                                    <td>
                                        {formatDuration(
                                            summaryData.reduce((acc, day) => {
                                                return acc + convertToSeconds(day.after19.duration);
                                            }, 0) / summaryData.length
                                        )}
                                    </td>
                                </tr>

                                <tr>
                                    <td>No of Days with no calls in Time Slot</td>
                                    <td>
                                        {summaryData.filter(day => day.totalCalls === 0).length}
                                    </td>
                                    <td></td>
                                    <td></td>

                                    <td>
                                        {summaryData.filter(day => day.before10.totalCalls === 0).length}
                                    </td>
                                    <td></td>
                                    <td></td>


                                    <td>
                                        {dayWiseData.filter(day => day.hr10.calls === 0).length}
                                    </td>
                                    <td></td>
                                    <td></td>


                                    <td>
                                        {dayWiseData.filter(day => day.hr11.calls === 0).length}
                                    </td>
                                    <td></td>
                                    <td></td>


                                    <td>
                                        {dayWiseData.filter(day => day.hr12.calls === 0).length}
                                    </td>
                                    <td></td>
                                    <td></td>


                                    <td>
                                        {dayWiseData.filter(day => day.hr13.calls === 0).length}
                                    </td>
                                    <td></td>
                                    <td></td>


                                    <td>
                                        {dayWiseData.filter(day => day.hr14.calls === 0).length}
                                    </td>
                                    <td></td>
                                    <td></td>


                                    <td>
                                        {dayWiseData.filter(day => day.hr15.calls === 0).length}
                                    </td>
                                    <td></td>
                                    <td></td>


                                    <td>
                                        {dayWiseData.filter(day => day.hr16.calls === 0).length}
                                    </td>
                                    <td></td>
                                    <td></td>


                                    <td>
                                        {dayWiseData.filter(day => day.hr17.calls === 0).length}
                                    </td>
                                    <td></td>
                                    <td></td>


                                    <td>
                                        {dayWiseData.filter(day => day.hr18.calls === 0).length}
                                    </td>
                                    <td></td>
                                    <td></td>


                                    <td>
                                        {summaryData.filter(day => day.after19.totalCalls === 0).length}
                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>

                {/* ********************    Chart *********************** */}

                <div className='call_summary_bottom_container'>
                    <CallVsConnectedChartDaywiseReport data={chartData} />
                </div>
            </div>

        </div>
    );
};

export default DayWiseAnalysisReport;
