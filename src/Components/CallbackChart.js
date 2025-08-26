import React from 'react';
import Chart from 'react-apexcharts';
import '../styles/CallbackChart.css';
import refreshicon from '../assets/refreshbtn.png'
import downloadicon from '../assets/downloadbtn.png'
import nofoundicon from '../assets/nofound.png'
import { callbackchartdata } from '../data/callbackchartdata';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { useRef, useState } from 'react';



const CallbackChart = () => {

    // const series = callbackchartdata.series;
    // const labels = callbackchartdata.labels;
    const chartRef = useRef();
    const [valueData, setValueData] = useState(callbackchartdata.series);
    const [chartData, setChartData] = useState(
        callbackchartdata.series.map(val => (val > 0 ? 100 : 0.001))
    );

    const handleRefresh = () => {

        const refreshed = callbackchartdata.series;
        setValueData(refreshed)
        setChartData(refreshed.map(val => (val > 0 ? 100 : 0.001)));
    }


    const handleDownload = () => {
        if (!chartRef.current) return;

        toPng(chartRef.current, { cacheBust: true, backgroundColor: '#fff' })
            .then((dataUrl) => {
                download(dataUrl, 'callback-chart.png');
            })
            .catch((err) => {
                console.error('Download failed:', err);
            });
    };


    const rawSeries = callbackchartdata.series;
    const total = rawSeries.reduce((sum, val) => sum + val, 0);
    // const series = rawSeries.map(val => (val > 0 ? 100 : 0.001));


    // const options = {

    //     labels: ['Missed', 'Callback', 'Callback Pending'],
    //     colors: ['#f8c13e', '#ff9eab', '#3eb1ef'],

    //     chart: {
    //         type: 'radialBar',
    //     },
    //     states: {
    //         hover: {
    //             filter: {
    //                 type: 'none',
    //             }
    //         },
    //         active: {
    //             filter: {
    //                 type: 'none'
    //             }
    //         }
    //     },
    //     plotOptions: {
    //         radialBar: {
    //             hollow: {
    //                 margin: 10,
    //                 size: '40%',
    //             },
    //             dataLabels: {
    //                 show: true,
    //                 name: {
    //                     show: true,
    //                     fontSize: '14px',
    //                 },
    //                 value: {
    //                     show: true,
    //                     fontSize: '16px',
    //                     fontWeight: 600,
    //                     formatter: function (val, opts) {
    //                         const seriesIndex = opts?.seriesIndex ?? 0;
    //                         const value = opts?.w?.globals?.series[seriesIndex] ?? val;
    //                         const color = opts?.w?.config?.colors?.[seriesIndex] ?? 'val';

    //                         const el = opts?.w?.globals?.dom?.baseEl?.querySelector('.apexcharts-datalabel-value');
    //                         if (el) {
    //                             el.style.fill = color;
    //                             el.style.color = color;
    //                         }

    //                         return `${value}`;
    //                     }
    //                 }
    //             }
    //         }
    //     }

    // };

    // const series = [100, 5, 1];

    const options = {
        chart: {
            type: 'radialBar',
        },
        labels: ['Missed', 'Callback', 'Callback Pending'],
        colors: ['#f8c13e', '#ff9eab', '#3eb1ef'],
        states: {
            hover: { filter: { type: 'none' } },
            active: { filter: { type: 'none' } }
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 10,
                    size: '35%',
                },
                dataLabels: {
                    name: {
                        show: true,
                        fontSize: '14px',
                        fontWeight: 400,
                    },
                    value: {
                        show: true,
                        fontSize: '16px',
                        fontWeight: 600,
                        formatter: function (val, opts) {
                            const index = opts?.seriesIndex;
                            if (typeof index === 'number' && Array.isArray(valueData)) {
                                return valueData[index] ?? 0;
                            }
                            return 0;
                        }
                    }
                }
            }
        }
    };


    return (
        <div>
            <div className='callbackchart_top_container'>
                <h3>Inbound Callback Analysis</h3>
                <div className='callbackchart_top_container_btn'>
                    <button className='callbackchart_top_container_refres' onClick={handleRefresh}><img src={refreshicon} alt='refresh' className='refreshicon_icon' /> Refresh</button>
                    <button className='callback_download_btn' onClick={handleDownload}>
                        <img src={downloadicon} alt='download' className='callback_download_icon' />
                    </button>
                </div>
            </div>
            <div ref={chartRef}>
                <div className="donut_chart_container">
                    {total === 0 ? (
                        <div style={{ textAlign: 'center', color: '#888', marginTop: '40px' }}>
                            <img src={nofoundicon} alt='nofound' className='nofound_icon' />
                        </div>
                    ) : (
                        <Chart options={options} series={chartData} type="radialBar" height={300} />
                    )}

                </div>
                <div className="legend_values">
                    <div className='legend_values_container_main'>
                        <div className='legend_values_container'>
                            <div className='legend_values_container_circle' style={{ backgroundColor: '#f8c13e' }}></div>
                            <span>Missed</span>
                        </div>
                        <span className='legend_values_container_value'>{valueData[0]}</span>
                    </div>
                    <div className='legend_values_container_main'>
                        <div className='legend_values_container'>
                            <div className='legend_values_container_circle' style={{ backgroundColor: '#ff9eab' }}></div>
                            <span>Callback</span>
                        </div>
                        <span className='legend_values_container_value'> {valueData[1]}</span>
                    </div>
                    <div className='legend_values_container_main'>
                        <div className='legend_values_container'>
                            <div className='legend_values_container_circle' style={{ backgroundColor: '#3eb1ef' }}></div>
                            <span>Callback Pending</span>
                        </div>
                        <span className='legend_values_container_value'>{valueData[2]}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CallbackChart;
