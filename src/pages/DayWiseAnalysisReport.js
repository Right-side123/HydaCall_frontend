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

    const clean = (s) =>
        s?.toString().replace(/\s+/g, "").replace(/–/g, "-").trim().toLowerCase();




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

    // const slotToKey = {
    //     "10:00 - 10:59": "hr10",
    //     "11:00 - 11:59": "hr11",
    //     "12:00 - 12:59": "hr12",
    //     "13:00 - 13:59": "hr13",
    //     "14:00 - 14:59": "hr14",
    //     "15:00 - 15:59": "hr15",
    //     "16:00 - 16:59": "hr16",
    //     "17:00 - 17:59": "hr17",
    //     "18:00 - 18:59": "hr18"
    // };


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
        date: new Date(day.date).toLocaleDateString("en-GB"), 
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

                                    <td>
                                        {summaryData.reduce((acc, day) => {
                                            const hourData = day.hourlySlots?.find(
                                                (h) => clean(h.hourSlot) === clean("10:00 - 10:59")
                                            );
                                            return acc + (hourData?.totalCalls || 0);
                                        }, 0)}
                                    </td>

                                    <td>
                                        {summaryData.reduce((acc, day) => {
                                            const hourData = day.hourlySlots?.find(
                                                (h) => clean(h.hourSlot) === clean("10:00 - 10:59")
                                            );
                                            return acc + (hourData?.connected || 0);
                                        }, 0)}
                                    </td>

                                    <td>
                                        {formatDuration(
                                            summaryData.reduce((acc, day) => {
                                                const hourData = day.hourlySlots?.find(
                                                    (h) => clean(h.hourSlot) === clean("10:00 - 10:59")
                                                );

                                                return acc + convertToSeconds(hourData?.duration || "0h 0m 0s");
                                            }, 0)
                                        )}
                                    </td>

                                    <td>
                                        {summaryData.reduce((acc, day) => {
                                            const hourData = day.hourlySlots?.find(
                                                (h) => clean(h.hourSlot) === clean("11:00 - 11:59")
                                            );
                                            return acc + (hourData?.totalCalls || 0);
                                        }, 0)}
                                    </td>

                                    <td>
                                        {summaryData.reduce((acc, day) => {
                                            const hourData = day.hourlySlots?.find(
                                                (h) => clean(h.hourSlot) === clean("11:00 - 11:59")
                                            );
                                            return acc + (hourData?.connected || 0);
                                        }, 0)}
                                    </td>

                                    <td>
                                        {formatDuration(
                                            summaryData.reduce((acc, day) => {
                                                const hourData = day.hourlySlots?.find(
                                                    (h) => clean(h.hourSlot) === clean("11:00 - 11:59")
                                                );

                                                return acc + convertToSeconds(hourData?.duration || "0h 0m 0s");
                                            }, 0)
                                        )}
                                    </td>


                                    <td>
                                        {summaryData.reduce((acc, day) => {
                                            const hourData = day.hourlySlots?.find(
                                                (h) => clean(h.hourSlot) === clean("12:00 - 12:59")
                                            );
                                            return acc + (hourData?.totalCalls || 0);
                                        }, 0)}
                                    </td>

                                    <td>
                                        {summaryData.reduce((acc, day) => {
                                            const hourData = day.hourlySlots?.find(
                                                (h) => clean(h.hourSlot) === clean("12:00 - 12:59")
                                            );
                                            return acc + (hourData?.connected || 0);
                                        }, 0)}
                                    </td>

                                    <td>
                                        {formatDuration(
                                            summaryData.reduce((acc, day) => {
                                                const hourData = day.hourlySlots?.find(
                                                    (h) => clean(h.hourSlot) === clean("12:00 - 12:59")
                                                );

                                                return acc + convertToSeconds(hourData?.duration || "0h 0m 0s");
                                            }, 0)
                                        )}
                                    </td>

                                    <td>
                                        {summaryData.reduce((acc, day) => {
                                            const hourData = day.hourlySlots?.find(
                                                (h) => clean(h.hourSlot) === clean("13:00 - 13:59")
                                            );
                                            return acc + (hourData?.totalCalls || 0);
                                        }, 0)}
                                    </td>

                                    <td>
                                        {summaryData.reduce((acc, day) => {
                                            const hourData = day.hourlySlots?.find(
                                                (h) => clean(h.hourSlot) === clean("13:00 - 13:59")
                                            );
                                            return acc + (hourData?.connected || 0);
                                        }, 0)}
                                    </td>

                                    <td>
                                        {formatDuration(
                                            summaryData.reduce((acc, day) => {
                                                const hourData = day.hourlySlots?.find(
                                                    (h) => clean(h.hourSlot) === clean("13:00 - 13:59")
                                                );

                                                return acc + convertToSeconds(hourData?.duration || "0h 0m 0s");
                                            }, 0)
                                        )}
                                    </td>

                                    <td>
                                        {summaryData.reduce((acc, day) => {
                                            const hourData = day.hourlySlots?.find(
                                                (h) => clean(h.hourSlot) === clean("14:00 - 14:59")
                                            );
                                            return acc + (hourData?.totalCalls || 0);
                                        }, 0)}
                                    </td>

                                    <td>
                                        {summaryData.reduce((acc, day) => {
                                            const hourData = day.hourlySlots?.find(
                                                (h) => clean(h.hourSlot) === clean("14:00 - 14:59")
                                            );
                                            return acc + (hourData?.connected || 0);
                                        }, 0)}
                                    </td>

                                    <td>
                                        {formatDuration(
                                            summaryData.reduce((acc, day) => {
                                                const hourData = day.hourlySlots?.find(
                                                    (h) => clean(h.hourSlot) === clean("14:00 - 14:59")
                                                );

                                                return acc + convertToSeconds(hourData?.duration || "0h 0m 0s");
                                            }, 0)
                                        )}
                                    </td>

                                    <td>
                                        {summaryData.reduce((acc, day) => {
                                            const hourData = day.hourlySlots?.find(
                                                (h) => clean(h.hourSlot) === clean("15:00 - 15:59")
                                            );
                                            return acc + (hourData?.totalCalls || 0);
                                        }, 0)}
                                    </td>

                                    <td>
                                        {summaryData.reduce((acc, day) => {
                                            const hourData = day.hourlySlots?.find(
                                                (h) => clean(h.hourSlot) === clean("15:00 - 15:59")
                                            );
                                            return acc + (hourData?.connected || 0);
                                        }, 0)}
                                    </td>

                                    <td>
                                        {formatDuration(
                                            summaryData.reduce((acc, day) => {
                                                const hourData = day.hourlySlots?.find(
                                                    (h) => clean(h.hourSlot) === clean("15:00 - 15:59")
                                                );

                                                return acc + convertToSeconds(hourData?.duration || "0h 0m 0s");
                                            }, 0)
                                        )}
                                    </td>



                                    <td>
                                        {summaryData.reduce((acc, day) => {
                                            const hourData = day.hourlySlots?.find(
                                                (h) => clean(h.hourSlot) === clean("16:00 - 16:59")
                                            );
                                            return acc + (hourData?.totalCalls || 0);
                                        }, 0)}
                                    </td>

                                    <td>
                                        {summaryData.reduce((acc, day) => {
                                            const hourData = day.hourlySlots?.find(
                                                (h) => clean(h.hourSlot) === clean("16:00 - 16:59")
                                            );
                                            return acc + (hourData?.connected || 0);
                                        }, 0)}
                                    </td>

                                    <td>
                                        {formatDuration(
                                            summaryData.reduce((acc, day) => {
                                                const hourData = day.hourlySlots?.find(
                                                    (h) => clean(h.hourSlot) === clean("16:00 - 16:59")
                                                );

                                                return acc + convertToSeconds(hourData?.duration || "0h 0m 0s");
                                            }, 0)
                                        )}
                                    </td>


                                    <td>
                                        {summaryData.reduce((acc, day) => {
                                            const hourData = day.hourlySlots?.find(
                                                (h) => clean(h.hourSlot) === clean("17:00 - 17:59")
                                            );
                                            return acc + (hourData?.totalCalls || 0);
                                        }, 0)}
                                    </td>

                                    <td>
                                        {summaryData.reduce((acc, day) => {
                                            const hourData = day.hourlySlots?.find(
                                                (h) => clean(h.hourSlot) === clean("17:00 - 17:59")
                                            );
                                            return acc + (hourData?.connected || 0);
                                        }, 0)}
                                    </td>

                                    <td>
                                        {formatDuration(
                                            summaryData.reduce((acc, day) => {
                                                const hourData = day.hourlySlots?.find(
                                                    (h) => clean(h.hourSlot) === clean("17:00 - 17:59")
                                                );

                                                return acc + convertToSeconds(hourData?.duration || "0h 0m 0s");
                                            }, 0)
                                        )}
                                    </td>


                                    <td>
                                        {summaryData.reduce((acc, day) => {
                                            const hourData = day.hourlySlots?.find(
                                                (h) => clean(h.hourSlot) === clean("18:00 - 18:59")
                                            );
                                            return acc + (hourData?.totalCalls || 0);
                                        }, 0)}
                                    </td>

                                    <td>
                                        {summaryData.reduce((acc, day) => {
                                            const hourData = day.hourlySlots?.find(
                                                (h) => clean(h.hourSlot) === clean("18:00 - 18:59")
                                            );
                                            return acc + (hourData?.connected || 0);
                                        }, 0)}
                                    </td>

                                    <td>
                                        {formatDuration(
                                            summaryData.reduce((acc, day) => {
                                                const hourData = day.hourlySlots?.find(
                                                    (h) => clean(h.hourSlot) === clean("18:00 - 18:59")
                                                );

                                                return acc + convertToSeconds(hourData?.duration || "0h 0m 0s");
                                            }, 0)
                                        )}
                                    </td>





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

                                    <td>
                                        {(
                                            summaryData.reduce((acc, day) => {
                                                const h = day.hourlySlots?.find(
                                                    (x) => clean(x.hourSlot) === clean("10:00 - 10:59")
                                                );
                                                return acc + (h?.totalCalls || 0);
                                            }, 0) / summaryData.length
                                        ).toFixed(2)}
                                    </td>

                                    <td>
                                        {(
                                            summaryData.reduce((acc, day) => {
                                                const h = day.hourlySlots?.find(
                                                    (x) => clean(x.hourSlot) === clean("10:00 - 10:59")
                                                );
                                                return acc + (h?.connected || 0);
                                            }, 0) / summaryData.length
                                        ).toFixed(2)}
                                    </td>

                                    <td>
                                        {formatDuration(
                                            (
                                                summaryData.reduce((acc, day) => {
                                                    const h = day.hourlySlots?.find(
                                                        (x) => clean(x.hourSlot) === clean("10:00 - 10:59")
                                                    );
                                                    return acc + convertToSeconds(h?.duration || "0h 0m 0s");
                                                }, 0) / summaryData.length
                                            )
                                        )}
                                    </td>


                                    <td>
                                        {(
                                            summaryData.reduce((acc, day) => {
                                                const h = day.hourlySlots?.find(
                                                    (x) => clean(x.hourSlot) === clean("11:00 - 11:59")
                                                );
                                                return acc + (h?.totalCalls || 0);
                                            }, 0) / summaryData.length
                                        ).toFixed(2)}
                                    </td>

                                    <td>
                                        {(
                                            summaryData.reduce((acc, day) => {
                                                const h = day.hourlySlots?.find(
                                                    (x) => clean(x.hourSlot) === clean("11:00 - 11:59")
                                                );
                                                return acc + (h?.connected || 0);
                                            }, 0) / summaryData.length
                                        ).toFixed(2)}
                                    </td>

                                    <td>
                                        {formatDuration(
                                            (
                                                summaryData.reduce((acc, day) => {
                                                    const h = day.hourlySlots?.find(
                                                        (x) => clean(x.hourSlot) === clean("11:00 - 11:59")
                                                    );
                                                    return acc + convertToSeconds(h?.duration || "0h 0m 0s");
                                                }, 0) / summaryData.length
                                            )
                                        )}
                                    </td>

                                    <td>
                                        {(
                                            summaryData.reduce((acc, day) => {
                                                const h = day.hourlySlots?.find(
                                                    (x) => clean(x.hourSlot) === clean("12:00 - 12:59")
                                                );
                                                return acc + (h?.totalCalls || 0);
                                            }, 0) / summaryData.length
                                        ).toFixed(2)}
                                    </td>

                                    <td>
                                        {(
                                            summaryData.reduce((acc, day) => {
                                                const h = day.hourlySlots?.find(
                                                    (x) => clean(x.hourSlot) === clean("12:00 - 12:59")
                                                );
                                                return acc + (h?.connected || 0);
                                            }, 0) / summaryData.length
                                        ).toFixed(2)}
                                    </td>

                                    <td>
                                        {formatDuration(
                                            (
                                                summaryData.reduce((acc, day) => {
                                                    const h = day.hourlySlots?.find(
                                                        (x) => clean(x.hourSlot) === clean("12:00 - 12:59")
                                                    );
                                                    return acc + convertToSeconds(h?.duration || "0h 0m 0s");
                                                }, 0) / summaryData.length
                                            )
                                        )}
                                    </td>


                                    <td>
                                        {(
                                            summaryData.reduce((acc, day) => {
                                                const h = day.hourlySlots?.find(
                                                    (x) => clean(x.hourSlot) === clean("13:00 - 13:59")
                                                );
                                                return acc + (h?.totalCalls || 0);
                                            }, 0) / summaryData.length
                                        ).toFixed(2)}
                                    </td>

                                    <td>
                                        {(
                                            summaryData.reduce((acc, day) => {
                                                const h = day.hourlySlots?.find(
                                                    (x) => clean(x.hourSlot) === clean("13:00 - 13:59")
                                                );
                                                return acc + (h?.connected || 0);
                                            }, 0) / summaryData.length
                                        ).toFixed(2)}
                                    </td>

                                    <td>
                                        {formatDuration(
                                            (
                                                summaryData.reduce((acc, day) => {
                                                    const h = day.hourlySlots?.find(
                                                        (x) => clean(x.hourSlot) === clean("13:00 - 13:59")
                                                    );
                                                    return acc + convertToSeconds(h?.duration || "0h 0m 0s");
                                                }, 0) / summaryData.length
                                            )
                                        )}
                                    </td>


                                    <td>
                                        {(
                                            summaryData.reduce((acc, day) => {
                                                const h = day.hourlySlots?.find(
                                                    (x) => clean(x.hourSlot) === clean("14:00 - 14:59")
                                                );
                                                return acc + (h?.totalCalls || 0);
                                            }, 0) / summaryData.length
                                        ).toFixed(2)}
                                    </td>

                                    <td>
                                        {(
                                            summaryData.reduce((acc, day) => {
                                                const h = day.hourlySlots?.find(
                                                    (x) => clean(x.hourSlot) === clean("14:00 - 14:59")
                                                );
                                                return acc + (h?.connected || 0);
                                            }, 0) / summaryData.length
                                        ).toFixed(2)}
                                    </td>

                                    <td>
                                        {formatDuration(
                                            (
                                                summaryData.reduce((acc, day) => {
                                                    const h = day.hourlySlots?.find(
                                                        (x) => clean(x.hourSlot) === clean("14:00 - 14:59")
                                                    );
                                                    return acc + convertToSeconds(h?.duration || "0h 0m 0s");
                                                }, 0) / summaryData.length
                                            )
                                        )}
                                    </td>

                                    <td>
                                        {(
                                            summaryData.reduce((acc, day) => {
                                                const h = day.hourlySlots?.find(
                                                    (x) => clean(x.hourSlot) === clean("15:00 - 15:59")
                                                );
                                                return acc + (h?.totalCalls || 0);
                                            }, 0) / summaryData.length
                                        ).toFixed(2)}
                                    </td>

                                    <td>
                                        {(
                                            summaryData.reduce((acc, day) => {
                                                const h = day.hourlySlots?.find(
                                                    (x) => clean(x.hourSlot) === clean("15:00 - 15:59")
                                                );
                                                return acc + (h?.connected || 0);
                                            }, 0) / summaryData.length
                                        ).toFixed(2)}
                                    </td>

                                    <td>
                                        {formatDuration(
                                            (
                                                summaryData.reduce((acc, day) => {
                                                    const h = day.hourlySlots?.find(
                                                        (x) => clean(x.hourSlot) === clean("15:00 - 15:59")
                                                    );
                                                    return acc + convertToSeconds(h?.duration || "0h 0m 0s");
                                                }, 0) / summaryData.length
                                            )
                                        )}
                                    </td>

                                    <td>
                                        {(
                                            summaryData.reduce((acc, day) => {
                                                const h = day.hourlySlots?.find(
                                                    (x) => clean(x.hourSlot) === clean("16:00 - 16:59")
                                                );
                                                return acc + (h?.totalCalls || 0);
                                            }, 0) / summaryData.length
                                        ).toFixed(2)}
                                    </td>

                                    <td>
                                        {(
                                            summaryData.reduce((acc, day) => {
                                                const h = day.hourlySlots?.find(
                                                    (x) => clean(x.hourSlot) === clean("16:00 - 16:59")
                                                );
                                                return acc + (h?.connected || 0);
                                            }, 0) / summaryData.length
                                        ).toFixed(2)}
                                    </td>

                                    <td>
                                        {formatDuration(
                                            (
                                                summaryData.reduce((acc, day) => {
                                                    const h = day.hourlySlots?.find(
                                                        (x) => clean(x.hourSlot) === clean("16:00 - 16:59")
                                                    );
                                                    return acc + convertToSeconds(h?.duration || "0h 0m 0s");
                                                }, 0) / summaryData.length
                                            )
                                        )}
                                    </td>


                                    <td>
                                        {(
                                            summaryData.reduce((acc, day) => {
                                                const h = day.hourlySlots?.find(
                                                    (x) => clean(x.hourSlot) === clean("17:00 - 17:59")
                                                );
                                                return acc + (h?.totalCalls || 0);
                                            }, 0) / summaryData.length
                                        ).toFixed(2)}
                                    </td>

                                    <td>
                                        {(
                                            summaryData.reduce((acc, day) => {
                                                const h = day.hourlySlots?.find(
                                                    (x) => clean(x.hourSlot) === clean("17:00 - 17:59")
                                                );
                                                return acc + (h?.connected || 0);
                                            }, 0) / summaryData.length
                                        ).toFixed(2)}
                                    </td>

                                    <td>
                                        {formatDuration(
                                            (
                                                summaryData.reduce((acc, day) => {
                                                    const h = day.hourlySlots?.find(
                                                        (x) => clean(x.hourSlot) === clean("17:00 - 17:59")
                                                    );
                                                    return acc + convertToSeconds(h?.duration || "0h 0m 0s");
                                                }, 0) / summaryData.length
                                            )
                                        )}
                                    </td>

                                    <td>
                                        {(
                                            summaryData.reduce((acc, day) => {
                                                const h = day.hourlySlots?.find(
                                                    (x) => clean(x.hourSlot) === clean("18:00 - 18:59")
                                                );
                                                return acc + (h?.totalCalls || 0);
                                            }, 0) / summaryData.length
                                        ).toFixed(2)}
                                    </td>

                                    <td>
                                        {(
                                            summaryData.reduce((acc, day) => {
                                                const h = day.hourlySlots?.find(
                                                    (x) => clean(x.hourSlot) === clean("18:00 - 18:59")
                                                );
                                                return acc + (h?.connected || 0);
                                            }, 0) / summaryData.length
                                        ).toFixed(2)}
                                    </td>

                                    <td>
                                        {formatDuration(
                                            (
                                                summaryData.reduce((acc, day) => {
                                                    const h = day.hourlySlots?.find(
                                                        (x) => clean(x.hourSlot) === clean("18:00 - 18:59")
                                                    );
                                                    return acc + convertToSeconds(h?.duration || "0h 0m 0s");
                                                }, 0) / summaryData.length
                                            )
                                        )}
                                    </td>

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
                                        {
                                            summaryData.filter(day => {
                                                const h = day.hourlySlots?.find(
                                                    (x) => clean(x.hourSlot) === clean("10:00 - 10:59")
                                                );
                                                return (h?.totalCalls || 0) === 0;
                                            }).length
                                        }
                                    </td>
                                    <td></td>
                                    <td></td>

                                    <td>
                                        {
                                            summaryData.filter(day => {
                                                const h = day.hourlySlots?.find(
                                                    (x) => clean(x.hourSlot) === clean("11:00 - 11:59")
                                                );
                                                return (h?.totalCalls || 0) === 0;
                                            }).length
                                        }
                                    </td>
                                    <td></td>
                                    <td></td>

                                    <td>
                                        {
                                            summaryData.filter(day => {
                                                const h = day.hourlySlots?.find(
                                                    (x) => clean(x.hourSlot) === clean("12:00 - 12:59")
                                                );
                                                return (h?.totalCalls || 0) === 0;
                                            }).length
                                        }
                                    </td>
                                    <td></td>
                                    <td></td>

                                    <td>
                                        {
                                            summaryData.filter(day => {
                                                const h = day.hourlySlots?.find(
                                                    (x) => clean(x.hourSlot) === clean("13:00 - 13:59")
                                                );
                                                return (h?.totalCalls || 0) === 0;
                                            }).length
                                        }
                                    </td>
                                    <td></td>
                                    <td></td>

                                    <td>
                                        {
                                            summaryData.filter(day => {
                                                const h = day.hourlySlots?.find(
                                                    (x) => clean(x.hourSlot) === clean("14:00 - 14:59")
                                                );
                                                return (h?.totalCalls || 0) === 0;
                                            }).length
                                        }
                                    </td>
                                    <td></td>
                                    <td></td>

                                    <td>
                                        {
                                            summaryData.filter(day => {
                                                const h = day.hourlySlots?.find(
                                                    (x) => clean(x.hourSlot) === clean("15:00 - 15:59")
                                                );
                                                return (h?.totalCalls || 0) === 0;
                                            }).length
                                        }
                                    </td>
                                    <td></td>
                                    <td></td>

                                    <td>
                                        {
                                            summaryData.filter(day => {
                                                const h = day.hourlySlots?.find(
                                                    (x) => clean(x.hourSlot) === clean("16:00 - 16:59")
                                                );
                                                return (h?.totalCalls || 0) === 0;
                                            }).length
                                        }
                                    </td>
                                    <td></td>
                                    <td></td>


                                    <td>
                                        {
                                            summaryData.filter(day => {
                                                const h = day.hourlySlots?.find(
                                                    (x) => clean(x.hourSlot) === clean("17:00 - 17:59")
                                                );
                                                return (h?.totalCalls || 0) === 0;
                                            }).length
                                        }
                                    </td>
                                    <td></td>
                                    <td></td>


                                    <td>
                                        {
                                            summaryData.filter(day => {
                                                const h = day.hourlySlots?.find(
                                                    (x) => clean(x.hourSlot) === clean("18:00 - 18:59")
                                                );
                                                return (h?.totalCalls || 0) === 0;
                                            }).length
                                        }
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

                {/* <CallVsConnectedChartDaywiseReport
                    data={chartData}
                    startDate={startTime}
                    endDate={endTime}
                    isBarChart={true}
                /> */}

            </div>

        </div>
    );
};

export default DayWiseAnalysisReport;
