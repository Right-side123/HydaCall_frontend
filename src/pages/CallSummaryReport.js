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
import downloadicon from '../assets/downloadicon.png';
// import { tr } from 'date-fns/locale';

const CallSummaryReport = () => {
    const [departments, setDepartments] = useState([]);
    const [users, setUsers] = useState([]);

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

    useEffect(() => {
        fetchDepartments();
        fetchUsers();
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
                                name="user_id"
                                // value={department_id}
                                // onChange={handleChange}
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
                    <div className='call_summary_bottom_container_card_title_container' style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className='call_summary_bottom_container_card_title'>
                            <h3>Employee Summary</h3>
                        </div>
                        <div className='call_summary_bottom_container_card_downloadbtn_container'>
                            <p>Total Records : 4</p>
                            <button> <img src={downloadicon} alt='department' className='dept_icon' />Download Excel</button>
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
                            </tbody>
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
