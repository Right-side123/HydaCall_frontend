import React, { useState, useEffect } from 'react';
import '../styles/Reports.css';
import Layout from '../Components/Layout';
import Sidebar from '../Components/Sidebar';
import DateRange from '../Components/DateRange';
import api from '../Components/Api';


import AnalysisReportChart from '../Components/AnalysisReportBaarChart';
// import downloadicon from '../assets/downloadicon.png';

const AnalysisReport = () => {
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

    // ***********************    manual data for chart

    // const data = [
    //     { time_group: "10:00", answered: 10, missed: 0, abandoned: 0, abandoneds: 0 },
    //     { time_group: "11:00", answered: 0, missed: 0, abandoned: 0, abandoneds: 0 },
    //     { time_group: "12:00", answered: 0, missed: 35, abandoned: 0, abandoneds: 0 },
    //     { time_group: "10:00", answered: 0, missed: 0, abandoned: 0, abandoneds: 0 },
    //     { time_group: "11:00", answered: 0, missed: 0, abandoned: 0, abandoneds: 0 },
    //     { time_group: "12:00", answered: 0, missed: 0, abandoned: 0, abandoneds: 0 },
    //     { time_group: "10:00", answered: 0, missed: 0, abandoned: 0, abandoneds: 0 },
    //     { time_group: "11:00", answered: 0, missed: 0, abandoned: 0, abandoneds: 0 },
    //     { time_group: "12:00", answered: 0, missed: 0, abandoned: 0, abandoneds: 0 },

    // ];


    return (
        <div className='main-layout'>
            <Sidebar />

            <div className='page-content'>
                <div className="department_titel_container">
                    <h1 className='department_title'>ANALYSIS REPORT</h1>
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

                <div className='call_summary_middel_container'>
                    <div className='analysis_report_middel_container_card'>
                        <div className='call_summary_middel_container_card_title'>
                            <h3>Mobile Call</h3>
                        </div>
                        <div className='call_summary_middel_container_card_container'>
                            <div className='analysis_report__middel_container_card_contnt'>
                                <div className='analysis_report__middel_container_card_contnt_title'>
                                    <div style={{ width: '10px', height: '10px', backgroundColor: '#f6b739', borderRadius: '2px' }}></div>
                                    <h6>Top Dialer</h6>

                                </div>
                                <div className='analysis_report__middel_container_card_contnt_main'>
                                    <p>3541545645646354653456456465341351</p>
                                    <h6 style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>Total Calls: <p>1</p> | Answered: <p>1</p></h6>
                                </div>
                            </div>
                            <div className='analysis_report__middel_container_card_contnt'>
                                <div className='analysis_report__middel_container_card_contnt_title'>
                                    <div style={{ width: '10px', height: '10px', backgroundColor: '#00d69c', borderRadius: '2px' }}></div>
                                    <h6>Top Answered</h6>

                                </div>
                                <div className='analysis_report__middel_container_card_contnt_main'>
                                    <p>3541545645646354653456456465341351</p>
                                    <h6 style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>Total Calls: <p>1</p> | Answered: <p>1</p></h6>
                                </div>
                            </div>
                            <div className='analysis_report__middel_container_card_contnt'>
                                <div className='analysis_report__middel_container_card_contnt_title'>
                                    <div style={{ width: '10px', height: '10px', backgroundColor: '#2b02c0', borderRadius: '2px' }}></div>
                                    <h6>Top Caller</h6>

                                </div>
                                <div className='analysis_report__middel_container_card_contnt_main'>
                                    <p>3541545645646354653456456465341351</p>
                                    <h6 style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>Total Calls: <p>1 ( Inbound + Outbound )</p> </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='analysis_report_middel_container_card'>
                        <div className='call_summary_middel_container_card_title'>
                            <h3>Total Call Duration</h3>
                        </div>
                        <div className='call_summary_middel_container_card_container'>
                            <div className='analysis_report__middel_container_card_contnt'>
                                <div className='analysis_report__middel_container_card_contnt_title'>
                                    <div style={{ width: '10px', height: '10px', backgroundColor: '#2b02c0', borderRadius: '2px' }}></div>
                                    <h6>Most Engaged Employee Duration (Total Talk Time)</h6>

                                </div>
                                <div className='analysis_report__middel_container_card_contnt_main'>
                                    <p>3541545645646354653456456465341351</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                                        <h6>Duration: </h6><p>0h 0m 21s</p>

                                    </div>
                                </div>
                            </div>
                            <div className='analysis_report__middel_container_card_contnt'>
                                <div className='analysis_report__middel_container_card_contnt_title'>
                                    <div style={{ width: '10px', height: '10px', backgroundColor: '#f52c33ff', borderRadius: '2px' }}></div>
                                    <h6>Employee's Longest Single Call Duration</h6>

                                </div>
                                <div className='analysis_report__middel_container_card_contnt_main'>
                                    <p>3541545645646354653456456465341351</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                                        <h6>Duration: </h6><p>0h 0m 21s (INBOUND)</p>

                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>

                                        <h6>Call To: </h6><p>06666666666</p>

                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>

                                        <h6>Call Time: </h6><p>06/10/2025 11:01:43</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='analysis_report_middel_container_card'>
                        <div className='call_summary_middel_container_card_title'>
                            <h3>Avg. Call Duration of Connected Calls</h3>
                        </div>
                        <div className='call_summary_middel_container_card_container'>
                            <div className='analysis_report__middel_container_card_contnt'>
                                <div className='analysis_report__middel_container_card_contnt_title'>
                                    <div style={{ width: '10px', height: '10px', backgroundColor: '#2b02c0', borderRadius: '2px' }}></div>
                                    <h6>Avg. Duration per Incoming Call</h6>

                                </div>
                                <p style={{ padding: '10px 15px', fontSize: '14px' }}>0h 0m 21s ( Total Calls: 1 )</p>
                            </div>
                            <div className='analysis_report__middel_container_card_contnt'>
                                <div className='analysis_report__middel_container_card_contnt_title'>
                                    <div style={{ width: '10px', height: '10px', backgroundColor: '#f6b739', borderRadius: '2px' }}></div>
                                    <h6>Avg. Duration per Outgoing Call</h6>

                                </div>
                                <p style={{ padding: '10px 15px', fontSize: '14px' }}>0h 0m 21s ( Total Calls: 1 )</p>
                            </div>
                            <div className='analysis_report__middel_container_card_contnt'>
                                <div className='analysis_report__middel_container_card_contnt_title'>
                                    <div style={{ width: '10px', height: '10px', backgroundColor: '#00d69c', borderRadius: '2px' }}></div>
                                    <h6>Avg. Duration per Call (Inbound + Outbound)</h6>

                                </div>
                                <p style={{ padding: '10px 15px', fontSize: '14px' }}>0h 0m 21s ( Total Calls: 1 )</p>
                            </div>
                            <div className='analysis_report__middel_container_card_contnt'>
                                <div className='analysis_report__middel_container_card_contnt_title'>
                                    <div style={{ width: '10px', height: '10px', backgroundColor: '#714afdff', borderRadius: '2px' }}></div>
                                    <h6>Avg. Duration per Day (Inbound + Outbound)</h6>

                                </div>
                                <p style={{ padding: '10px 15px', fontSize: '14px' }}>0h 0m 21s ( Total Days: 1 )</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='call_summary_bottom_container'>

                    {/* <div className='call_summary_bottom_container_card_title'>
                        <h3>Call & Call Duration</h3>
                    </div> */}

                    {/* <div
                        className="call_summary_bottom_container_card_title_container"
                        style={{
                            height: "500px",
                            background: "#fff",
                            borderRadius: "16px",
                            // boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            padding: "0px",
                            marginTop: "50px",
                            boxSizing: "border-box"
                        }}
                    >


                        <ResponsiveContainer width="100%" height="90%" >
                            <BarChart
                                data={data}
                                margin={{ top: 10, right: 20, left: 0, bottom: 40 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="time_group" dy={10} />
                                <YAxis>
                                    <Label
                                        value="Number of Calls"
                                        angle={-90}
                                        position="insideLeft"
                                        style={{ textAnchor: "middle" }}

                                    />
                                </YAxis>
                                <Tooltip
                                    cursor={false}
                                    content={({ active, payload, label }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div
                                                    style={{
                                                        backgroundColor: "rgba(0,0,0,0.8)",
                                                        padding: "10px",
                                                        borderRadius: "8px",
                                                        color: "white",
                                                        width: "150px",
                                                    }}
                                                >
                                                    <p
                                                        style={{
                                                            fontWeight: "bold",
                                                            marginBottom: "8px",
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        {label}
                                                    </p>
                                                    {payload.map((entry, index) => (
                                                        <p key={`item-${index}`}>
                                                            {entry.name}: {entry.value}
                                                        </p>
                                                    ))}
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />

                                <Bar dataKey="answered" fill="#4caaea" name="Answered" radius={[10, 10, 0, 0]} />
                                <Bar dataKey="missed" fill="#eab756" name="Missed" radius={[10, 10, 0, 0]} />
                                <Bar dataKey="abandoned" fill="#00d69c" name="Abandoned" radius={[10, 10, 0, 0]} />
                                <Bar dataKey="abandoneds" fill="#f96f73" name="Abandoneds" radius={[10, 10, 0, 0]} />
                            </BarChart>

                        </ResponsiveContainer>
                        <p style={{ textAlign: "center" }}>As Per Total Call</p>
                    </div> */}
    <AnalysisReportChart/>
                </div>

            

            </div>

        </div>
    );
};

export default AnalysisReport;
