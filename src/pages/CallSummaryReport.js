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

const CallSummaryReport = () => {
    const [departments, setDepartments] = useState([]);


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
                                        <td>0</td>
                                        <td>0h 0m 0s</td>
                                    </tr>
                                    <tr>
                                        <td>Missed</td>
                                        <td>1</td>
                                        <td>-</td>
                                    </tr>

                                    <tr className='call_summary_middel_container_card_table_total_row'>
                                        <td>Total</td>
                                        <td>1</td>
                                        <td>0h 0m 0s</td>
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
                                        <td>0</td>
                                        <td>0h 0m 0s</td>
                                    </tr>
                                    <tr>
                                        <td>Busy</td>
                                        <td>0</td>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <td>No Answered</td>
                                        <td>0</td>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <td>Not Reachable</td>
                                        <td>0</td>
                                        <td>-</td>
                                    </tr>

                                    <tr className='call_summary_middel_container_card_table_total_row'>
                                        <td>Total</td>
                                        <td>1</td>
                                        <td>0h 0m 0s</td>
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
                                <p className='call_summary_middel_container_card_callinsight_content_neverAttend_count'>1</p>
                            </div>
                            <div className='call_summary_middel_container_card_callinsight_content_connected_call'>
                                <div>
                                    <p>Connected Calls</p>
                                </div>
                                <p className='call_summary_middel_container_card_callinsight_content_neverAttend_count'>0</p>
                            </div>
                            <div className='call_summary_middel_container_card_callinsight_content_connected_call'>
                                <div>
                                    <p>Unique Clients</p>
                                </div>
                                <p className='call_summary_middel_container_card_callinsight_content_neverAttend_count'>1</p>
                            </div>

                        </div>
                    </div>

                </div>

                <div className='call_summary_bottom_container'>
                    <div className='call_summary_bottom_container_card_title_container'>
                        <div className='call_summary_bottom_container_card_title'>
                            <h3>Employee Summary</h3>
                        </div>
                        <div className='call_summary_bottom_container_card_downloadbtn_container'>
                            <p>Total Records : 4</p>
                            <button>Download Excel</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default CallSummaryReport;
