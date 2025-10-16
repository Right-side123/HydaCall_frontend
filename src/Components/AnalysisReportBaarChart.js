import React, { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    // Legend,
    Label,
    ResponsiveContainer,
} from "recharts";
// import { Button } from "@/components/ui/button";
import { BarChart3, LineChart as Download } from "lucide-react";
import '../styles/Reports.css';

const AnalysisReportChart = () => {

    const data = [
        { time_group: "10:00-10:59", answered: 10, missed: 0, abandoned: 0, abandoneds: 0 },
        { time_group: "11:00-11:59", answered: 0, missed: 0, abandoned: 0, abandoneds: 0 },
        { time_group: "12:00-12:59", answered: 0, missed: 35, abandoned: 10, abandoneds: 0 },
        { time_group: "13:00-13:59", answered: 0, missed: 0, abandoned: 0, abandoneds: 0 },
        { time_group: "14:00-14:59", answered: 0, missed: 0, abandoned: 0, abandoneds: 10 },
        { time_group: "15:00-15:59", answered: 0, missed: 0, abandoned: 0, abandoneds: 0 },
        { time_group: "16:00-16:59", answered: 0, missed: 0, abandoned: 0, abandoneds: 0 },
        { time_group: "17:00-17:59", answered: 0, missed: 0, abandoned: 0, abandoneds: 0 },
        { time_group: "18:00-18:59", answered: 0, missed: 0, abandoned: 0, abandoneds: 0 },
        { time_group: "19:00-19:59", answered: 0, missed: 0, abandoned: 0, abandoneds: 0 },

    ];

    const [isCallWiserChart, setIsCallWiseChart] = useState(true);

    return (
        <div className="">
            <div className="hourly_report_callvsconnected_chart_container">
                <h2 className="analysis_report_chart_title">Call & Call Duration</h2>
                <div className="hourly_analysis_report_callvsConnected_chart">
                    <button
                        variant="outline"
                        onClick={() => setIsCallWiseChart(!isCallWiserChart)}
                        className="chart_toggle_btn"
                    >
                        {isCallWiserChart ? <BarChart3 size={16} /> : <BarChart3 size={16} />}
                        {isCallWiserChart ? "Duration Wise Chart View" : "Call Wise Chart View"}
                    </button>
                    <button variant="outline" className="chart_doenload_btn">
                        <Download size={18} />
                    </button>
                </div>
            </div>

            {/* <div style={{ width: "100%", height: 350, marginTop: 30 }}>
                <ResponsiveContainer>
                    {isBarChart ? (
                        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="time" />
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
                            <Bar dataKey="totalCalls" fill="#4caaea" name="Total Calls" radius={[10, 10, 0, 0]} />
                            <Bar dataKey="connectedCalls" fill="#eab756" name="Connected Calls" radius={[10, 10, 0, 0]} />
                        </BarChart>
                    ) : (
                        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="time" />
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
                            <Line type="monotone" dataKey="totalCalls" stroke="#4caaea" name="Total Calls" strokeWidth={3} />
                            <Line type="monotone" dataKey="connectedCalls" stroke="#eab756" name="Connected Calls" strokeWidth={3} />
                        </LineChart>
                    )}
                </ResponsiveContainer>
            </div> */}

            {isCallWiserChart ? (
                <div
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
                            {/* <Legend verticalAlign="top" height={36} /> */}
                            <Bar dataKey="answered" fill="#4caaea" name="Answered" radius={[10, 10, 0, 0]} />
                            <Bar dataKey="missed" fill="#eab756" name="Missed" radius={[10, 10, 0, 0]} />
                            <Bar dataKey="abandoned" fill="#00d69c" name="Abandoned" radius={[10, 10, 0, 0]} />
                            <Bar dataKey="abandoneds" fill="#f96f73" name="Abandoneds" radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                    <p style={{ textAlign: "center" }}>As Per Total Call</p>
                </div>
            ) : (
                <div
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
                                    value="Calls Duration"
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

                        </BarChart>
                    </ResponsiveContainer>
                    <p style={{ textAlign: "center" }}>As Per Call Duration</p>
                </div>
            )}
        </div>
    );
};

export default AnalysisReportChart;


