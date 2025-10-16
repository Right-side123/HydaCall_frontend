import React, { useState, useEffect } from 'react';
import '../styles/Reports.css';
import Layout from '../Components/Layout';
import Sidebar from '../Components/Sidebar';
import DateRange from '../Components/DateRange';
import api from '../Components/Api';

import CallVsConnectedChartHourlyReport from '../Components/CallvsConnectedCallHourly'

const HourlyAnalysisReport = () => {
    const [departments, setDepartments] = useState([]);
    const [startTime, setStartTime] = useState("00:00");
    const [endTime, setEndTime] = useState("23:59");


    const fetchDepartments = async () => {
        try {
            const res = await api.get("/department");
            setDepartments(res.data);
        } catch (err) {
            console.error("Error fetching department:", err);
        }
    }

    useEffect(() => {
        fetchDepartments();
    }, []);

    // ***********************    manual data for employee summary table  ********************
    const employeesummarydata = [
        // {
        //     phone: '9876543210',
        //     totalCalls: 50,
        //     connectedCalls: 45,
        //     totalDuration: '2h 15m',
        //     avgCalls: 10,
        //     avgConnected: 9,
        //     avgDuration: '27m',
        // },
    ]


    const timeSlots = [
        "Before 10:00",
        "10:00 - 10:59",
        "11:00 - 11:59",
        "12:00 - 12:59",
        "13:00 - 13:59",
        "14:00 - 14:59",
        "15:00 - 15:59",
        "16:00 - 16:59",
        "17:00 - 17:59",
        "18:00 - 18:59",
        "After 19:00",
    ];

    const TimeSlotData = {
        "10:00 - 10:59": { totalCalls: 0, connectedCalls: 0, duration: 0 },
        "15:00 - 15:59": { totalCalls: 2, connectedCalls: 1, duration: 0 },
        "16:00 - 16:59": { totalCalls: 0, connectedCalls: 0, duration: 0 },
        "17:00 - 17:59": { totalCalls: 1, connectedCalls: 1, duration: 0 },
    };


    const totalCallsSum = Object.values(TimeSlotData).reduce((sum, d) => sum + d.totalCalls, 0);
    const totalConnectedSum = Object.values(TimeSlotData).reduce((sum, d) => sum + d.connectedCalls, 0);
    const totalDurationSum = Object.values(TimeSlotData).reduce((sum, d) => sum + d.duration, 0);

    //  Format seconds → h m s
    const formatDuration = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        return `${h}h ${m}m ${s}s`;
    };

    // const tableTimeSlotData = timeSlots.map((slot) => ({
    //     timeSlot: slot,
    //     totalCalls: TimeSlotData[slot]?.totalCalls || 0,
    //     connectedCalls: TimeSlotData[slot]?.connectedCalls || 0,
    // }));

    const tableTimeSlotData = timeSlots.map((slot) => {
        const { totalCalls, connectedCalls, duration } = TimeSlotData[slot] || {
            totalCalls: 0,
            connectedCalls: 0,
            duration: 0,
        };

        return {
            timeSlot: slot,
            totalCalls,
            connectedCalls,
            totalDuration: formatDuration(duration),
            totalCallsPercent: totalCallsSum
                ? ((totalCalls / totalCallsSum) * 100).toFixed(1)
                : 0,
            connectedPercent: totalConnectedSum
                ? ((connectedCalls / totalConnectedSum) * 100).toFixed(1)
                : 0,
            durationPercent: totalDurationSum
                ? ((TimeSlotData[slot].duration / totalDurationSum) * 100).toFixed(1)
                : 0,
        };
    });


    const totalRow = {
        timeSlot: "Total",
        totalCalls: totalCallsSum,
        connectedCalls: totalConnectedSum,
        duration: formatDuration(totalDurationSum),
    };


    const avgRow = {
        timeSlot: "Daily Average",
        totalCalls: (totalCallsSum / timeSlots.length).toFixed(0),
        connectedCalls: (totalConnectedSum / timeSlots.length).toFixed(0),
        duration: formatDuration(totalDurationSum / timeSlots.length),
    };


    return (
        <div className='main-layout'>
            <Sidebar />

            <div className='page-content'>
                <div className="department_titel_container">
                    <h1 className='department_title'>HOURLY ANALYSIS REPORT</h1>
                    <Layout></Layout>
                </div>

                <div className='call_summary_top_container'>
                    <div className='call_summary_top_container_title'>
                        <h3>Filter</h3>
                        <div className='call_summary_top_container_btn'>
                            <button className='call_summary_top_container_btn_clearall'>Clear All</button>
                            <button className='call_summary_top_container_btn_apply'>Apply Filter</button>
                        </div>
                    </div>
                    <div className='call_summary_top_container_filter'>
                        <div className='call_summary_top_container_filter_content'>
                            <p>Date Range</p>
                            <div className='call_summary_top_container_filter_content_daterange'>
                                <DateRange align='left'></DateRange>
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

                            <select className='analysis_report_type_select'>
                                <option className='calllogs_type_option'></option>
                                <option className='calllogs_type_option'>INBOUND</option>
                                <option className='calllogs_type_option'>OUTBOUND</option>
                            </select>

                        </div>
                        <div className='call_summary_top_container_filter_content'>
                            <p>Department</p>
                            <select
                                name="department_id"
                                // value={department_id}
                                // onChange={handleChange}
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

                    </div>

                    <div className='call_summary_top_container_search_archive'>
                        <div className='call_summary_top_container_filter_content'>
                            <p>User</p>
                            <select
                                name="department_id"
                                // value={department_id}
                                // onChange={handleChange}
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
                            <p>SIM Number</p>
                            <select
                                name="department_id"
                                // value={department_id}
                                // onChange={handleChange}
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
                        <div className='anyalysis_report_search_in_archive'>
                            <input
                                type='checkbox' /> Search In Archive
                        </div>

                    </div>

                </div>

                {/* ********************    Chart *********************** */}

                <div className='call_summary_bottom_container'>
                    <CallVsConnectedChartHourlyReport />
                </div>

                <div className='call_summary_bottom_container'>
                    <div className='call_summary_bottom_container_card_title'>
                        <h3>Time Slot Wise</h3>
                    </div>
                    <div className='hourly_analysis_report_timeslot_container_table'>
                        <table>
                            <thead>
                                <tr className='hourly_analysis_report_timeslot_table_th'>
                                    <th>Hourly Time Slot</th>
                                    <th>Total Calls</th>
                                    <th>Total Connected Calls</th>
                                    <th>Total Duration</th>
                                    <th>Total Calls (%)</th>
                                    <th>Total Connected Calls (%)</th>
                                    <th>Total Duration (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableTimeSlotData.map((row, index) => (
                                    <tr key={`${row.timeSlot}-${index}`}>
                                        <td>{row.timeSlot}</td>
                                        <td>{row.totalCalls}</td>
                                        <td>{row.connectedCalls}</td>
                                        <td>{row.totalDuration}</td>
                                        <td style={{ backgroundColor: "#f3f3f3ff" }}>{row.totalCallsPercent}</td>
                                        <td style={{ backgroundColor: "#f3f3f3ff" }}>{row.connectedPercent}</td>
                                        <td style={{ backgroundColor: "#f3f3f3ff" }}>{row.durationPercent}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td>{totalRow.timeSlot}</td>
                                    <td>{totalRow.totalCalls}</td>
                                    <td>{totalRow.connectedCalls}</td>
                                    <td>{totalRow.duration}</td>
                                    <td style={{ backgroundColor: "#f3f3f3ff" }}></td>
                                    <td style={{ backgroundColor: "#f3f3f3ff" }}></td>
                                    <td style={{ backgroundColor: "#f3f3f3ff" }}></td>
                                </tr>


                                <tr>
                                    <td>{avgRow.timeSlot}</td>
                                    <td>{avgRow.totalCalls}</td>
                                    <td>{avgRow.connectedCalls}</td>
                                    <td>{avgRow.duration}</td>
                                    <td style={{ backgroundColor: "#f3f3f3ff" }}></td>
                                    <td style={{ backgroundColor: "#f3f3f3ff" }}></td>
                                    <td style={{ backgroundColor: "#f3f3f3ff" }}></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='call_summary_bottom_container'>
                    <div className='call_summary_bottom_container_card_title'>
                        <h3>Employee Summary</h3>
                    </div>
                    <div className='hourly_analysis_report_timeslot_container_table'>
                        <table>
                            <thead className='hourly_analysis_report_timeslot_container_table_th'>
                                <tr>
                                    <th rowSpan="2">Phone Number</th>
                                    <th colSpan="3">Total</th>
                                    <th colSpan="3">Daily Average</th>
                                </tr>
                                <tr>
                                    <th>Total Calls</th>
                                    <th>Total Connected Calls</th>
                                    <th>Total Duration</th>
                                    <th>Avg Calls</th>
                                    <th>Avg Connected Calls</th>
                                    <th>Avg Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employeesummarydata.length > 0 ? (
                                    employeesummarydata.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.phone}</td>
                                            <td>{item.totalCalls}</td>
                                            <td>{item.connectedCalls}</td>
                                            <td>{item.totalDuration}</td>
                                            <td>{item.avgCalls}</td>
                                            <td>{item.avgConnected}</td>
                                            <td>{item.avgDuration}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" style={{ textAlign: 'center' }}>
                                            No records found !!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default HourlyAnalysisReport;
