import React from 'react';
import '../styles/Reports.css';
import Layout from '../Components/Layout';
import reportCallIcon from '../assets/reportcall.png';
import analysisIcon from '../assets/reportsicon.png';
import hourlyIcon from '../assets/hourrport.png';
import dayAnalysisIcon from '../assets/dayreport.png';
import nevericon from '../assets/neverattend.png';
import notPickupIcon from '../assets/reportclient.png';

const Reports = () => {


    return (
        <div>
            <div className="department_titel_container">
                <h1 className='department_title'>REPORTS</h1>
                <Layout></Layout>
            </div>
            <div className='report_main_container'>
                <div className='report_card'>
                    <div className='report_card_img'>
                        <img src={reportCallIcon} alt='Call summary' className='report_card_img_icon' style={{ width: '30px', height: '30px' }}/>
                    </div>
                    <div className='report_card_title'>Call Summary</div>
                </div>
                <div className='report_card'>
                    <div className='report_card_img'>
                        <img src={analysisIcon} alt='Analysis' className='report_card_img_icon' style={{ width: '25px', height: '25px' }} />
                    </div>
                    <div className='report_card_title'>Analysis</div>
                </div>
                <div className='report_card'>
                    <div className='report_card_img'>
                        <img src={hourlyIcon} alt='Hourly Analysis' className='report_card_img_icon' style={{ width: '30px', height: '30px' }} />
                    </div>
                    <div className='report_card_title'>Hourly Analysis</div>
                </div>
                <div className='report_card'>
                    <div className='report_card_img'>
                        <img src={dayAnalysisIcon} alt='Day wise analysis' className='report_card_img_icon' style={{ width: '25px', height: '25px' }} />
                    </div>
                    <div className='report_card_title'>Day Wise Analysis</div>
                </div>
                <div className='report_card'>
                    <div className='report_card_img'>
                        <img src={nevericon} alt='Never attended' className='report_card_img_icon' style={{ width: '25px', height: '25px' }} />
                    </div>
                    <div className='report_card_title'>Never Attended</div>
                </div>
                <div className='report_card'>
                    <div className='report_card_img'>
                        <img src={notPickupIcon} alt='not pickup' className='report_card_img_icon' style={{ width: '20px', height: '20px' }} />
                    </div>
                    <div className='report_card_title'>Not Pickup by Client</div>
                </div>
                <div className='report_card'>
                    <div className='report_card_img'>
                        <img src={notPickupIcon} alt='Unique Clients' className='report_card_img_icon' style={{ width: '20px', height: '20px' }} />
                    </div>
                    <div className='report_card_title'>Unique Clients</div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
