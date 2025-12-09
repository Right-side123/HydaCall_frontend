import React, { useState } from "react";
import {
    LineChart,
    Line,
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
import { BarChart3, LineChart as LineChartIcon, Download } from "lucide-react";
import '../styles/Reports.css';

const CallVsConnectedChartDaywiseReport = ({ data }) => {


    const [isBarChart, setIsBarChart] = useState(true);

    return (
        <div className="">
            <div className="hourly_report_callvsconnected_chart_container">
                <h2 className="t">Call vs Connected Calls</h2>
                <div className="hourly_analysis_report_callvsConnected_chart">
                    <button
                        variant="outline"
                        onClick={() => setIsBarChart(!isBarChart)}
                        className="chart_toggle_btn"
                    >
                        {isBarChart ? <LineChartIcon size={16} /> : <BarChart3 size={16} />}
                        {isBarChart ? "Line Chart View" : "Bar Chart View"}
                    </button>
                    <button variant="outline" className="chart_doenload_btn">
                        <Download size={18} />
                    </button>
                </div>
            </div>

            <div style={{ width: "100%", height: 350, marginTop: 30 }}>
                <ResponsiveContainer>
                    {isBarChart ? (
                        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="date" />
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
                            <Bar dataKey="totalCalls" fill="#0ACB6C" name="Total Calls" radius={[10, 10, 0, 0]} />
                            <Bar dataKey="connectedCalls" fill="#eab756" name="Connected Calls" radius={[10, 10, 0, 0]} />
                        </BarChart>
                    ) : (
                        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="date" />
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
                            <Line type="monotone" dataKey="totalCalls" stroke="#0ACB6C" name="Total Calls" strokeWidth={3} />
                            <Line type="monotone" dataKey="connectedCalls" stroke="#eab756" name="Connected Calls" strokeWidth={3} />
                        </LineChart>
                    )}
                </ResponsiveContainer>
            </div>

            <div style={{ textAlign: 'center' }}>
                Dates
            </div>
        </div>
    );
};

export default CallVsConnectedChartDaywiseReport;


