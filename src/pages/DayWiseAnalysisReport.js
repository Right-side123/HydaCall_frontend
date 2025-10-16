import React, { useState, useEffect } from 'react';
import '../styles/Reports.css';
import Layout from '../Components/Layout';
import Sidebar from '../Components/Sidebar';
import DateRange from '../Components/DateRange';
import api from '../Components/Api';

import CallVsConnectedChartHourlyReport from '../Components/CallvsConnectedCallHourly'

const DayWiseAnalysisReport = () => {
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



    //  Format seconds → h m s
    const formatDuration = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        return `${h}h ${m}m ${s}s`;
    };




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
        // aur days
    ];





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

                <div className='call_summary_bottom_container'>
                    <div className='day_wise_table_card_title'>
                        <h3>Day Wise Analysis</h3>
                        <button>Download Excel</button>
                    </div>
                    <div className='day_wise_container_table'>
                        <table>
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
                                    {/* before 10 */}
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

                                {/* Total row */}
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

                                {/* Daily Average row */}
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

                                {/* No of Days with no calls */}
                                <tr>
                                    <td>No of Days with no calls in Time Slot</td>
                                    <td>
                                        {dayWiseData.filter(day => day.total.calls === 0).length}
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

                        </table>
                    </div>
                </div>

                {/* ********************    Chart *********************** */}

                <div className='call_summary_bottom_container'>
                    <CallVsConnectedChartHourlyReport />
                </div>
            </div>

        </div>
    );
};

export default DayWiseAnalysisReport;
