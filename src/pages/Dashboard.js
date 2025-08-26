import React from 'react';
import '../styles/Dashboard.css';
import Layout from '../Components/Layout';
import DashboardLineChart from '../Components/LineCharts';
import totalcallsicon from '../assets/calllogstotalcall.png';
import answeredcallicon from '../assets/calllogsansweredicon.png';
import calllogmissedans from '../assets/calllogmissedans.png';
import shortdown from '../assets/shortdown.png';
import shortup from '../assets/shortup.png';
import eyeicon from '../assets/eyeicon.png'
import callbusyicon from '../assets/calllogsbusyicon.png';
import notreachableicon from '../assets/callslognotreachable.png';
import notanswericon from '../assets/calllogsnotans.png';
import CallbackChart from '../Components/CallbackChart';
import departmenticon from '../assets/diagramblue.png';
import simcardicon from '../assets/simcardicon.png';
import downarrow from '../assets/downarrow.png';
import downarrowfill from '../assets/downarrowfill.png'
import refreshicon from '../assets/refreshbtn.png';
import { useState } from 'react';
import { callInsightsData } from '../data/CallInsightdata';
import { callbackInsightsData } from '../data/CallInsightdata';

import DateRange from '../Components/DateRange';







const Dashboard = () => {

  // const [type, setType] = useState('Inbound');
  const [activeTab, setActiveTab] = useState('mostCalls');
  const [callType, setCallType] = useState('inbound');

  const [callbackTab, setCallbackTab] = useState('missed');

  // const handleDropdownChange = (e) => setType(e.target.value);


  const mostCallsData = callInsightsData[callType.toLowerCase()]?.mostCalls || [];
  const talkTimeData = callInsightsData[callType.toLowerCase()]?.talkTime || [];

  const missedData = callbackInsightsData.missedAndCallback?.missed || [];
  const callbackData = callbackInsightsData.missedAndCallback?.callback || [];


  return (
    <div>
      <div className="titel_container">
        <h1 className='dashboard_title'>DASHBOARD</h1>
        <Layout></Layout>
      </div>

      <div className='dashboard_top_container'>
        <div className='dashboard_top_container_first'>
          <div className='dashboard_top_container_card_left'>
            <img src={departmenticon} alt='department' className='departmenticon' />
            <span>Department</span>
            <img src={downarrowfill} alt='department' className='downarrowicon' />
          </div>
          <div className='dashboard_top_container_card_left'>
            <img src={simcardicon} alt='simnumber' className='simcardicon' />
            <span>SIM Number</span>
            <img src={downarrow} alt='simnumber' className='downarrowicon' />
          </div>
        </div>
        <div className='dashboard_top_container_card'>
          <DateRange></DateRange>
        </div>
      </div>

      <div className='dashboard_second_container'>
        <div className='dashboard_second_container_top'>
          <h3 className='dashboard_second_container_top_title'>Voice Activity</h3>
          <div className='dashboard_second_container_top_card_container'>
            <div className='dashboard_second_container_top_cards'>
              <select className='dashboard_second_container_top_card'>
                <option>Both</option>
                <option>Inbound</option>
                <option>Outbound</option>
              </select>
              {/* <img src={downarrowfill} alt='department' className='downarrowicon' /> */}
            </div>
            <div className='dashboard_second_container_top_card'>
              <span>Bar Chart View</span>
            </div>
            <div className='dashboard_second_container_top_card'>
              <button className='dashboard_top_container_refres'><img src={refreshicon} alt='refresh' className='refreshicon_icon' /> Refresh</button>
            </div>
          </div>
        </div>
        <div className='dashboard_second_container_middle'>
          <div className='dashboard_second_container_middle_card_total'>
            <span>Total Calls</span>
            <span>0</span>
          </div>
          <div className='dashboard_second_container_middle_card'>
            <span>Unique Calls</span>
            <span>0</span>
          </div>
        </div>
        <div className='dashboard_second_container_middle_second'>
          <div className='dashboard_second_container_middle_second_first_container'>
            <span className='dashboard_second_container_middle_second_first_container_inbound'>Inbound Calls</span>
            <div className='dashboard_second_container_middle_second_first_container_nvrattnd'>
              <span>Never Attended</span>
              <span>2</span>
            </div>
          </div>
          <div className='dashboard_second_container_middle_second_second'>
            <div className='dashboard_second_container_middle_second_second_card'>
              <div className='dashboard_second_container_middle_second_second_card_image_container'>
                <div className='dashboard_second_container_middle_second_second_card_image' style={{ backgroundColor: '#7c64fa' }}>
                  <img src={totalcallsicon} alt='totalcalls' className='dashboard_second_container_middle_second_second_card_image_icon' />

                </div>
                <div className='dashboard_calls_container'>
                  <p>Total Calls</p>
                  <h6>0</h6>
                </div>
              </div>
              <div className='shortdown_container'>
                <img src={shortdown} alt='shortdown' className='dashboard_second_container_middle_second_second_card_shortdown_icon' />
                <span className='shortdowntitle'>100.0%</span>
              </div>

            </div>
            <div className='dashboard_second_container_middle_second_second_card'>
              <div className='dashboard_second_container_middle_second_second_card_image_container'>
                <div className='dashboard_second_container_middle_second_second_card_image' style={{ backgroundColor: '#00c68d' }}>
                  <img src={answeredcallicon} alt='answeredcall' className='dashboard_second_container_middle_second_second_card_image_icon' />

                </div>
                <div className='dashboard_calls_container'>
                  <p>Answered</p>
                  <h6>0</h6>
                </div>
              </div>
              <div className='shortdown_container'>
                <img src={shortdown} alt='shortdown' className='dashboard_second_container_middle_second_second_card_shortdown_icon' />
                <span className='shortdowntitle'>100.0%</span>
              </div>

            </div>
            <div className='dashboard_second_container_middle_second_second_card'>
              <div className='dashboard_second_container_middle_second_second_card_image_container'>
                <div className='dashboard_second_container_middle_second_second_card_image'>
                  <img src={calllogmissedans} alt='missed' className='dashboard_second_container_middle_second_second_card_image' />

                </div>
                <div className='dashboard_calls_container'>
                  <p>Missed</p>
                  <h6>0</h6>
                </div>
              </div>
              <div className='shortdown_container'>
                <img src={shortdown} alt='shortdown' className='dashboard_second_container_middle_second_second_card_shortdown_icon' />
                <span className='shortdowntitle'>100.0%</span>
              </div>

            </div>
          </div>
        </div>

        <div className='dashboard_second_container_middle_third'>
          <span className='dashboard_second_container_middle_third_title'>Outbound Calls</span>
          <div className='dashboard_second_container_middle_third_card_container'>
            <div className='dashboard_second_container_middle_third_card'>
              <div className='dashboard_second_container_middle_second_second_card_image_container'>
                <div className='dashboard_second_container_middle_second_second_card_image' style={{ backgroundColor: '#7c64fa' }}>
                  <img src={totalcallsicon} alt='totalcalls' className='dashboard_second_container_middle_second_second_card_image_icon' />

                </div>
                <div className='dashboard_calls_container'>
                  <p>Total Calls</p>
                  <h6>0</h6>
                </div>
              </div>
              <div className='shortdown_container'>
                <img src={shortdown} alt='shortdown' className='dashboard_second_container_middle_second_second_card_shortdown_icon' />
                <span className='shortdowntitle'>100.0%</span>
              </div>
            </div>
            <div className='dashboard_second_container_middle_third_card'>
              <div className='dashboard_second_container_middle_second_second_card_image_container'>
                <div className='dashboard_second_container_middle_second_second_card_image' style={{ backgroundColor: '#00c68d' }}>
                  <img src={answeredcallicon} alt='answeredcalls' className='dashboard_second_container_middle_second_second_card_image_icon' />

                </div>
                <div className='dashboard_calls_container'>
                  <p>Answered</p>
                  <h6>0</h6>
                </div>
              </div>
              <div className='shortdown_container'>
                <img src={shortdown} alt='shortdown' className='dashboard_second_container_middle_second_second_card_shortdown_icon' />
                <span className='shortdowntitle'>100.0%</span>
              </div>
            </div>
            <div className='dashboard_second_container_middle_third_card'>
              <div className='dashboard_second_container_middle_second_second_card_image_container'>
                <div className='dashboard_second_container_middle_second_second_card_image'>
                  <img src={notanswericon} alt='noranswercalls' className='dashboard_second_container_middle_second_second_card_image_noans' />

                </div>
                <div className='dashboard_calls_container'>
                  <p>No Answered</p>
                  <h6>0</h6>
                </div>
              </div>
              <div className='shortdown_container_green'>
                <img src={shortup} alt='shortdown' className='dashboard_second_container_middle_second_second_card_shortdown_icon' />
                <span className='shortdowntitle_green'>0.0%</span>
              </div>
            </div>
            <div className='dashboard_second_container_middle_third_card'>
              <div className='dashboard_second_container_middle_second_second_card_image_container'>
                <div className='dashboard_second_container_middle_second_second_card_image'>
                  <img src={callbusyicon} alt='busycalls' className='dashboard_second_container_middle_second_second_card_image' />

                </div>
                <div className='dashboard_calls_container'>
                  <p>Busy</p>
                  <h6>0</h6>
                </div>
              </div>
              <div className='shortdown_container_green'>
                <img src={shortup} alt='shortdown' className='dashboard_second_container_middle_second_second_card_shortdown_icon' />
                <span className='shortdowntitle_green'>0.0%</span>
              </div>
            </div>
            <div className='dashboard_second_container_middle_third_card'>
              <div className='dashboard_second_container_middle_second_second_card_image_container'>
                <div className='dashboard_second_container_middle_second_second_card_image' style={{ backgroundColor: '#7f7873' }}>
                  <img src={notreachableicon} alt='notreachablecalls' className='dashboard_second_container_middle_second_second_card_image_icon' />

                </div>
                <div className='dashboard_calls_container'>
                  <p>Not Reachable</p>
                  <h6>0</h6>
                </div>
              </div>
              <div className='shortdown_container_green'>
                <img src={shortup} alt='shortdown' className='dashboard_second_container_middle_second_second_card_shortdown_icon' />
                <span className='shortdowntitle_green'>0.0%</span>
              </div>
            </div>
          </div>
        </div>

        <div className='dashboard_second_container_middle_last'>
          <DashboardLineChart></DashboardLineChart>
        </div>
      </div>

      <div className='dashboard_container_third'>


        <div className='dashboard_container_third_left'>
          <div className='dashboard_container_third_left_top'>
            <h3>Call Insights</h3>
            <div className='dashboard_container_third_left_top_select_div'>
              <select className='dashboard_container_third_left_top_select' value={callType}
                onChange={(e) => setCallType(e.target.value)}>
                <option className='dashboard_container_third_left_top_option' value='Inbound'>Inbound</option>
                <option className='dashboard_container_third_left_top_option' value='Outbound'>Outbound</option>
              </select>
            </div>
          </div>
          <div className='dashboard_container_third_left_tab'>
            <button
              className={activeTab === 'mostCalls' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('mostCalls')}
            >
              📞 Most No. of Calls
            </button>
            <button
              className={activeTab === 'talkTime' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('talkTime')}
            >
              📞 Maximum Talk Time
            </button>
          </div>

          <div className='dashboard_container_third_left_table'>
            {/* <table>
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Caller Number</th>
                  <th>SIM Number</th>
                  <th>Count</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>15565465</td>
                  <td>54+94+45+945rohit</td>
                  <td>2</td>
                  <td >
                    <button className='eye_icon_td'>
                      <img src={eyeicon} alt='view' className='eye_icon' />
                    </button>
                  </td>
                </tr>
                <td colSpan="5" className='no-records'>No Records Found!!</td>
              </tbody>
            </table> */}


            {activeTab === 'mostCalls' ? (
              <table>
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Caller Number</th>
                    <th>SIM Number</th>
                    <th>Count</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {mostCallsData.length === 0 ? (
                    <tr><td colSpan="5" style={{ textAlign: 'center' }}>No Records Found!!</td></tr>
                  ) : (
                    mostCallsData.map((row, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{row.caller}</td>
                        <td>{row.sim}</td>
                        <td>{row.count}</td>
                        <td>
                          <button className='eye_icon_td'>
                            <img src={eyeicon} alt='view' className='eye_icon' />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Caller Number</th>
                    <th>SIM Number</th>
                    <th>Call Duration</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {talkTimeData.length === 0 ? (
                    <tr><td colSpan="5" style={{ textAlign: 'center' }}>No Records Found!!</td></tr>
                  ) : (
                    talkTimeData.map((row, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{row.caller}</td>
                        <td>{row.sim}</td>
                        <td>{row.duration}</td>
                        <td>
                          <button className='eye_icon_td'>
                            <img src={eyeicon} alt='view' className='eye_icon' />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

          </div>

        </div>
        <div className='dashboard_container_third_right'>
          <CallbackChart></CallbackChart>
        </div>
      </div>
      <div className='dashboard_container_fourth'>
        <div className='dashboard_container_fourth_left'>

          <h3>Callback & Missed Call Overview</h3>

          {/* <div className='dashboard_container_third_left_tab'>
            <button
              className={activeTab === 'mostCalls' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('mostCalls')}
            >
              📞 Top Missed Calls
            </button>
            <button
              className={activeTab === 'talkTime' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('talkTime')}
            >
              📞 Top Pending Callbacks
            </button>
          </div> */}

          <div className='dashboard_container_third_left_tab'>
            <button
              className={callbackTab === 'missed' ? 'tab active' : 'tab'}
              onClick={() => setCallbackTab('missed')}
            >
              📞 Top Missed Calls
            </button>
            <button
              className={callbackTab === 'callback' ? 'tab active' : 'tab'}
              onClick={() => setCallbackTab('callback')}
            >
              📞 Top Pending Callbacks
            </button>
          </div>


          <div className='dashboard_container_third_left_table'>
            {/* <table>
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>SIM Number</th>
                  <th>Count</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>

                  <td>54+94+45+945rohit</td>
                  <td>2</td>
                  <td >
                    <button className='eye_icon_td'>
                      <img src={eyeicon} alt='view' className='eye_icon' />
                    </button>
                  </td>
                </tr>
                <td colSpan="5" className='no-records'>No Records Found!!</td>
              </tbody>
            </table> */}



            <table>
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>SIM Number</th>
                  <th>Count</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {(callbackTab === 'missed' ? missedData : callbackData).length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center' }}>No Records Found!!</td>
                  </tr>
                ) : (
                  (callbackTab === 'missed' ? missedData : callbackData).map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{row.sim}</td>
                      <td>{row.count}</td>
                      <td>
                        <button className='eye_icon_td'>
                          <img src={eyeicon} alt='view' className='eye_icon' />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
        <div className='dashboard_container_fourth_right'>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
