import React from 'react';
import '../styles/LineCharts.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer
} from 'recharts';
import { callData } from '../data/callData';
import tooltiptotal from '../assets/linecharttooltipcall.png';
import downloadicon from '../assets/downloadbtn.png'
import { useRef, useState } from 'react';
// import { toPng } from 'html-to-image';
// import download from 'downloadjs';
import html2canvas from 'html2canvas';

const DashboardLineChart = () => {

  const chartRef = useRef();
  const [isDownloading, setIsDownloading] = useState(false);

  // const handleDownload = () => {
  //   if (!chartRef.current) return;

  //   toPng(chartRef.current, { cacheBust: true, backgroundColor: '#fff' })
  //     .then((dataUrl) => {
  //       download(dataUrl, 'Line-Chart.png');
  //     })
  //     .catch((err) => {
  //       console.error('Download failed:', err);
  //     });
  // };

  const handleDownload = () => {
    setIsDownloading(true);

    setTimeout(() => {
      html2canvas(document.querySelector(".Dashboard_linecharts_container")).then(canvas => {
        const link = document.createElement("a");
        link.download = "line-chart.png";
        link.href = canvas.toDataURL();
        link.click();
        setIsDownloading(false);
      });
    }, 100);
  };

  const CustomXAxisLabel = ({ viewBox }) => {
    const { x, y, width } = viewBox;
    return (
      <text
        x={x + width / 2}
        y={y + 35}
        fill="#333"
        textAnchor="middle"
        fontSize="14"
        fontWeight="600"
      >
        Dates
      </text>
    );
  };


  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum, item) => sum + item.value, 0);

      return (
        <div style={{
          background: '#fff',
          border: '1px solid #ccc',
          padding: '2px',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#333',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          minWidth: '170px',
          lineHeight: '1.6'
        }}>
          <div className='linecharts_tooltip_date'>
            <span>DATE</span>
            <span>{label}</span>
          </div>

          {payload.map((item, index) => (
            <div className='linecharts_tooltip_content' key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div >
                <span style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: item.color,
                  display: 'inline-block',
                  marginRight: 6
                }}></span>
                <span>{item.name}</span>

              </div>
              <span>{item.value}</span>
            </div>
          ))}

          <div className='linecharts_tooltip_total'>
            <span><img src={tooltiptotal} alt='total' className='tooltiptotal_icon' />Total</span>
            <span>{total}</span>
          </div>
        </div>
      );
    }

    return null;
  };


  return (
    <div>
      <div className='linechart_dwonload_container'>
        <div></div>
        <button onClick={handleDownload} className='linechart_download_btn'>
          <img src={downloadicon} alt='download' className='download_icon' />
        </button>
      </div>
      <div ref={chartRef} className='Dashboard_linecharts_container'>


        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={callData} >
            <CartesianGrid strokeDasharray="3 6" vertical={false} />
            <XAxis dataKey="date" label={<CustomXAxisLabel />} tick={{ fontSize: 12, fill: '#555', dy: 3 }} />
            <YAxis tickCount={6}
              tick={{ fontSize: 12, fill: '#555', dx: -5 }} label={{ value: 'Number of Calls', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#333', fontWeight: '600', fontSize: 14 } }} />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            {/* <Legend /> */}
            {isDownloading && <Legend verticalAlign="top" align="center" />}

            <Line type="monotone" dataKey="Answered" stroke="#00d69c" strokeWidth={2.5} label={isDownloading ? { fill: '#333', fontSize: 12, position: 'top' } : false} />
            <Line type="monotone" dataKey="NoAnswered" stroke="#f96f73" strokeWidth={2.5} label={isDownloading ? { fill: '#333', fontSize: 12, position: 'top' } : false} />
            <Line type="monotone" dataKey="NotReachable" stroke="#8e8781" strokeWidth={2.5} label={isDownloading ? { fill: '#333', fontSize: 12, position: 'top' } : false} />
            <Line type="monotone" dataKey="Busy" stroke="#a05af2" strokeWidth={2.5} label={isDownloading ? { fill: '#333', fontSize: 12, position: 'top' } : false} />
            <Line type="monotone" dataKey="Missed" stroke="#f6b739" strokeWidth={2.5} label={isDownloading ? { fill: '#333', fontSize: 12, position: 'top' } : false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardLineChart;
