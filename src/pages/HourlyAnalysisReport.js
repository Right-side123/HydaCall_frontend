import React, { useState, useEffect } from 'react';
import '../styles/Reports.css';
import Layout from '../Components/Layout';
import Sidebar from '../Components/Sidebar';
import DateRange from '../Components/DateRange';
import api from '../Components/Api';

import CallVsConnectedChartHourlyReport from '../Components/CallvsConnectedCallHourly'

const HourlyAnalysisReport = () => {
    const [departments, setDepartments] = useState([]);
    const [numbers, setNumbers] = useState([]);
    const [users, setUsers] = useState([]);
    const [startTime, setStartTime] = useState("00:00");
    const [endTime, setEndTime] = useState("23:59");
    const [tableData, setTableData] = useState([]);
    const [summaryData, setSummaryData] = useState([]);

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
        fetchSimNumbers();
        fetchUsers();
    }, []);

    // const fetchHourlyTablereport = async () => {
    //     try {
    //         const { startDate, endDate, department, simNumber, userId } = filters;

    //         if (!startDate || !endDate) {
    //             alert("Please select start and end date");
    //             return;
    //         }

    //         const res = await api.get(`/hourlyreport?startDate=${startDate}&endDate=${endDate}&department=${department}&simNumber=${simNumber}&userId=${userId}`);

    //         setTableData(res.data);
    //         console.log("Report Data:", res.data);
    //     } catch (err) {
    //         console.error("Error fetching report:", err);
    //         alert("Error fetching report");
    //     }
    // };


    // ***********************    manual data for employee summary table  ********************
    // const employeesummarydata = [
    // {
    //     phone: '9876543210',
    //     totalCalls: 50,
    //     connectedCalls: 45,
    //     totalDuration: '2h 15m',
    //     avgCalls: 10,
    //     avgConnected: 9,
    //     avgDuration: '27m',
    // },
    // ]

    const fetchHourlyTablereport = async () => {
        try {
            const { startDate, endDate, department, simNumber, userId } = filters;

            if (!startDate || !endDate) {
                alert("Please select start and end date");
                return;
            }

            const res = await api.get(`/hourlyreport`, {
                params: {
                    startDate,
                    endDate,
                    startTime,
                    endTime,
                    department_id: department,
                    callType: filters.callType,
                    simNumber,
                    userId
                }
            });

            const formattedData = res.data.reduce((acc, item) => {
                const hour = parseInt(item.hourSlot);

                let slot = "";
                if (hour < 10) slot = "Before 10:00";
                else if (hour >= 19) slot = "After 19:00";
                else slot = `${hour.toString().padStart(2, '0')}:00 - ${hour.toString().padStart(2, '0')}:59`;

                if (!acc[slot]) {
                    acc[slot] = { totalCalls: 0, connectedCalls: 0, duration: 0 };
                }

                acc[slot].totalCalls += item.totalCalls;
                acc[slot].connectedCalls += item.connectedCalls;
                acc[slot].duration += item.durationSec;

                return acc;
            }, {});


            setTableData(formattedData);

            // setTableData(res.data);
            // console.log("Hourly Report Data:", formattedData);

        } catch (err) {
            console.error("Error fetching report:", err);
            alert("Error fetching report");
        }
    };


    const fetchEmployeeSummary = async () => {
        try {
            const { startDate, endDate, department, simNumber, userId, callType } = filters;

            if (!startDate || !endDate) {
                alert("Please select start and end date");
                return;
            }

            const res = await api.get("/hourlyreportsimnumber", {
                params: { startDate, endDate, department_id: department, simNumber, userId, callType, startTime, endTime }
            });

            console.log("Employee Summary Data:", res.data);
            setSummaryData(res.data);
        } catch (err) {
            console.error("Error fetching Employee Summary:", err);
        }
    };

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

    const totalCallsSum = Object.values(tableData).reduce((sum, d) => sum + d.totalCalls, 0);
    const totalConnectedSum = Object.values(tableData).reduce((sum, d) => sum + d.connectedCalls, 0);
    const totalDurationSum = Object.values(tableData).reduce((sum, d) => sum + d.duration, 0);

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
        const slotData = tableData[slot] || {
            totalCalls: 0,
            connectedCalls: 0,
            duration: 0,
        };

        const { totalCalls, connectedCalls, duration } = slotData;

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
                ? ((duration / totalDurationSum) * 100).toFixed(1)
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
        setTableData({
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

    const handlesubmit = () => {
        fetchHourlyTablereport();
        fetchEmployeeSummary();
    }

    function durationToSeconds(duration) {
        if (!duration) return 0;
        const h = (duration.match(/(\d+)h/)?.[1] || 0) * 3600;
        const m = (duration.match(/(\d+)m/)?.[1] || 0) * 60;
        const s = (duration.match(/(\d+)s/)?.[1] || 0) * 1;
        return h + m + s;
    }

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

                {/* ********************    Chart *********************** */}

                <div className='call_summary_bottom_container'>
                    <CallVsConnectedChartHourlyReport data={tableTimeSlotData} />
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
                    {/* <div className='hourly_analysis_report_timeslot_container_table'>
                        <table>
                            <thead className='hourly_analysis_report_timeslot_container_table_th'>
                                <tr>
                                    <th rowSpan="2">Phone Number</th>
                                    <th colSpan="3">Total</th>
                                    <th colSpan="3">Daily Average</th>
                                    <th>Before 10:00</th>
                                    <th>10:00 - 10:59</th>
                                    <th>11:00 - 11:59</th>
                                    <th>12:00 - 12:59</th>
                                    <th>13:00 - 13:59</th>
                                    <th>14:00 - 14:59</th>
                                    <th>15:00 - 15:59</th>
                                    <th>16:00 - 16:59</th>
                                    <th>17:00 - 17:59</th>
                                    <th>18:00 - 18:59</th>
                                    <th>After 19:00</th>
                                </tr>
                                <tr>
                                    <th>Total Calls</th>
                                    <th>Total Connected Calls</th>
                                    <th>Total Duration</th>
                                    <th>Avg Calls</th>
                                    <th>Avg Connected Calls</th>
                                    <th>Avg Duration</th>
                                    <th>Total Calls</th>
                                    <th>Total Connected Calls</th>
                                    <th>Total Duration</th>
                                    <th>Avg Calls</th>
                                    <th>Avg Connected Calls</th>
                                    <th>Avg Duration</th>
                                    <th>No Of Days With No Calls In Time Slot</th>
                                    <th>Total Calls</th>
                                    <th>Total Connected Calls</th>
                                    <th>Total Duration</th>
                                    <th>Avg Calls</th>
                                    <th>Avg Connected Calls</th>
                                    <th>Avg Duration</th>
                                    <th>No Of Days With No Calls In Time Slot</th>
                                    <th>Total Calls</th>
                                    <th>Total Connected Calls</th>
                                    <th>Total Duration</th>
                                    <th>Avg Calls</th>
                                    <th>Avg Connected Calls</th>
                                    <th>Avg Duration</th>
                                    <th>No Of Days With No Calls In Time Slot</th>  
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
                    </div> */}
                    <div
                        className='hourly_analysis_report_timeslot_container_table'
                        style={{
                            overflowX: "auto",
                            whiteSpace: "nowrap",
                            maxWidth: "100%",
                            border: "1px solid #ddd",
                        }}
                    >
                        <table>
                            <thead>
                                <tr style={{
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    color: "#696868",
                                    backgroundColor: "#f4f8fc"
                                }}>
                                    <th rowSpan="2" style={{ padding: "8px", border: "1px solid #ccc" }}>Phone Number</th>
                                    <th colSpan="3">Total</th>
                                    <th colSpan="3">Daily Average</th>
                                    <th colSpan="7">Before 10:00</th>
                                    <th colSpan="7">10:00 - 10:59</th>
                                    <th colSpan="7">11:00 - 11:59</th>
                                    <th colSpan="7">12:00 - 12:59</th>
                                    <th colSpan="7">13:00 - 13:59</th>
                                    <th colSpan="7">14:00 - 14:59</th>
                                    <th colSpan="7">15:00 - 15:59</th>
                                    <th colSpan="7">16:00 - 16:59</th>
                                    <th colSpan="7">17:00 - 17:59</th>
                                    <th colSpan="7">18:00 - 18:59</th>
                                    <th colSpan="7">After 19:00</th>
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
                                    <th>Avg Calls</th>
                                    <th>Avg Connected Calls</th>
                                    <th>Avg Duration</th>
                                    {Array.from({ length: 11 }).map((_, i) => (
                                        <React.Fragment key={i}>
                                            <th>Total Calls</th>
                                            <th>Total Connected Calls</th>
                                            <th>Total Duration</th>
                                            <th>Avg Calls</th>
                                            <th>Avg Connected Calls</th>
                                            <th>Avg Duration</th>
                                            <th>No Of Days With No Calls In Time Slot</th>
                                        </React.Fragment>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {summaryData?.length > 0 ? (
                                    summaryData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item?.phone || "--"}</td>
                                            <td>{item?.totalCalls || 0}</td>
                                            <td>{item?.connectedCalls || 0}</td>
                                            <td>{item?.totalDuration || "0h 0m 0s"}</td>
                                            <td>{((item?.totalCalls || 0) / timeSlotsSummery.length).toFixed(0)}</td>
                                            <td>{((item?.connectedCalls || 0) / timeSlotsSummery.length).toFixed(0)}</td>
                                            <td>{formatDuration(Math.floor(durationToSeconds(item?.totalDuration) / timeSlotsSummery.length))}</td>

                                            {/* Before 10:00 */}
                                            <td>{item?.before10?.totalCalls || 0}</td>
                                            <td>{item?.before10?.connected || 0}</td>
                                            <td>{item?.before10?.duration || "0h 0m 0s"}</td>
                                            <td>{((item?.before10?.totalCalls || 0) / timeSlotsSummery.length).toFixed(0)}</td>
                                            <td>{((item?.before10?.connectedCalls || 0) / timeSlotsSummery.length).toFixed(0)}</td>
                                            <td>{formatDuration(Math.floor(durationToSeconds(item?.before10?.duration) / timeSlotsSummery.length))}</td>
                                            <td>{item?.before10?.noCallDays || 0}</td>

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
                                                        <td>{((hourData?.totalCalls || 0) / timeSlotsSummery.length).toFixed(0)}</td>
                                                        <td>{((hourData?.connected || 0) / timeSlotsSummery.length).toFixed(0)}</td>
                                                        <td>{formatDuration(Math.floor(durationToSeconds(hourData?.duration) / timeSlotsSummery.length))}</td>
                                                        <td>{hourData?.noCallDays || 0}</td>
                                                    </React.Fragment>
                                                );
                                            })}

                                            {/* After 19:00 */}
                                            <td>{item?.after19?.totalCalls || 0}</td>
                                            <td>{item?.after19?.connected || 0}</td>
                                            <td>{item?.after19?.duration || "0h 0m 0s"}</td>
                                            <td>{((item?.after19?.totalCalls || 0) / timeSlotsSummery.length).toFixed(0)}</td>
                                            <td>{((item?.after19?.connectedCalls || 0) / timeSlotsSummery.length).toFixed(0)}</td>
                                            <td>{formatDuration(Math.floor(durationToSeconds(item?.after19?.duration) / timeSlotsSummery.length))}</td>
                                            <td>{item?.after19?.noCallDays || 0}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="85" style={{ textAlign: "left", padding: "10px" }}>
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
