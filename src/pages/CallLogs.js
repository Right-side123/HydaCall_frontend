import '../styles/CallLogs.css';
import totalcallsicon from '../assets/calllogstotalcall.png';
import inboundcallsicon from '../assets/calllogsinbound.png';
import outboundcallsicon from '../assets/calllogsoutboundicon.png';
import answeredcallicon from '../assets/calllogsansweredicon.png';
import notanswericon from '../assets/calllogsnotans.png';
import calllogmissedans from '../assets/calllogmissedans.png';
import callbusyicon from '../assets/calllogsbusyicon.png';
import notreachableicon from '../assets/callslognotreachable.png';
import Layout from '../Components/Layout';
import DateRange from '../Components/DateRange';
import Sidebar from '../Components/Sidebar';
import { useState } from 'react';

const CallLogs = () => {

  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("23:59");

  return (
    <div className='main-layout'>
      <Sidebar />

      <div className='page-content'>
        <div className="titel_container">
          <h1 className='calllogs_title'>CALL LOGS</h1>
          <Layout></Layout>
        </div>
        <div className='callllogs_top_container'>
          <div className='callllogs_top_container_left'>
            <div className='callllogs_top_container_card'>
              <div className='top_container_card_image' style={{ backgroundColor: '#7c64fa' }}>
                <img src={totalcallsicon} alt='totalcalls' className='calllogs_icon_icon' />
              </div>
              <p>Total Calls</p>
              <h6>19</h6>
            </div>
            <div className='callllogs_top_container_card'>
              <div className='top_container_card_image' style={{ backgroundColor: '#6db0c5' }}>
                <img src={inboundcallsicon} alt='inboundcalls' className='calllogs_icon_icon' />
              </div>
              <p>Inbound</p>
              <h6>19</h6>
            </div>
            <div className='callllogs_top_container_card'>
              <div className='top_container_card_image' style={{ backgroundColor: '#db52e2' }}>
                <img src={outboundcallsicon} alt='outboundcalls' className='calllogs_icon_icon' />
              </div>
              <p>Outbound</p>
              <h6>19</h6>
            </div>
          </div>
          <div className='callllogs_top_container_right'>
            <div className='callllogs_top_container_card'>
              <div className='top_container_card_image' style={{ backgroundColor: '#00c68d' }}>
                <img src={answeredcallicon} alt='answercalls' className='calllogs_icon_icon' />
              </div>
              <p>Answered</p>
              <h6>19</h6>
            </div>
            <div className='callllogs_top_container_card'>
              <img src={notanswericon} alt='notanswercalls' className='calllogs_icon_notanswer' />
              <p>Not Answered</p>
              <h6>19</h6>
            </div>
            <div className='callllogs_top_container_card'>
              <img src={calllogmissedans} alt='missedcalls' className='calllogs_icon' />
              <p>Missed</p>
              <h6>19</h6>
            </div>
            <div className='callllogs_top_container_card'>
              <img src={callbusyicon} alt='busycall' className='calllogs_icon' />
              <p>Busy</p>
              <h6>19</h6>
            </div>
            <div className='callllogs_top_container_card'>
              <div className='top_container_card_image' style={{ backgroundColor: '#7f7873' }}>
                <img src={notreachableicon} alt='notreachable' className='calllogs_icon_icon' />
              </div>
              <p>Not Reachable</p>
              <h6>19</h6>
            </div>
          </div>
        </div>
        <div className='calllogs_second_main_container'>
          <div className='calllogs_second_main_container_top'>
            <h3 className='calllogs_second_main_container_top_title'>Filter</h3>
            <div className='calllogs_second_main_container_top_right'>
              <button className='calllogs_second_main_container_top_right_clrbtn'>Clear All</button>
              <button className='calllogs_second_main_container_top_right_applybtn'>Apply Filter</button>
            </div>
          </div>
          <div className='calllogs_second_main_container_top_bottom'>
            <div className='calllogs_second_main_container_top_bottom_first'>
              <div className='callogs_daterange_contaier'>
                <p>Date Range</p>
                <div className='calllogs_daterange'>
                  <DateRange align='left'></DateRange>
                </div>
              </div>
              <div className='callogs_daterange_contaier'>
                <p>Time (HH:MM)</p>
                <div className='calllogs_time_container'>
                  <div className='calllogs_time'>
                    <input
                      className='select_time'
                      type='time'
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                  <div className='calllogs_time'>
                    <input className='select_time'
                      type='time'
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className='callogs_type_contaier'>
                <p>Call Type</p>
                <div className='calllogs_type'>
                  <select className='calllogs_type_select'>
                    <option className='calllogs_type_option'></option>
                    <option className='calllogs_type_option'>INBOUND</option>
                    <option className='calllogs_type_option'>OUTBOUND</option>
                  </select>
                </div>
              </div>
              <div className='callogs_type_contaier'>
                <p>Call Status</p>
                <div className='calllogs_type'>
                  <select className='calllogs_type_select'>
                    <option className='calllogs_type_option'></option>
                    <option className='calllogs_type_option'>Answered</option>
                    <option className='calllogs_type_option'>Busy</option>
                    <option className='calllogs_type_option'>Missed</option>
                    <option className='calllogs_type_option'>No Answered</option>
                    <option className='calllogs_type_option'>NotReachable</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className='calllogs_filter_second_container'>
            <div className='callogs_type_contaier'>
              <p>CallBack</p>
              <div className='calllogs_type'>
                <select className='calllogs_type_select'>
                  <option className='calllogs_type_option'></option>
                  <option className='calllogs_type_option'>Done</option>
                  <option className='calllogs_type_option'>Pending</option>
                </select>
              </div>
            </div>
            <div className='callogs_type_contaier'>
              <p>Department</p>
              <div className='calllogs_type'>
                <select className='calllogs_type_select'>
                  <option className='calllogs_type_option'></option>
                  <option className='calllogs_type_option'>Admin</option>
                  <option className='calllogs_type_option'>DWS HR</option>
                  <option className='calllogs_type_option'>Noida HR</option>
                  <option className='calllogs_type_option'>Outreach (Noida)</option>

                </select>
              </div>
            </div>
            <div className='callogs_type_contaier'>
              <p>User</p>
              <div className='calllogs_type'>
                <select className='calllogs_type_select'>
                  <option className='calllogs_type_option'></option>
                </select>
              </div>
            </div>
            <div className='callogs_type_contaier'>
              <p>SIM Number</p>
              <div className='calllogs_type'>
                <select className='calllogs_type_select'>
                  <option className='calllogs_type_option'></option>
                  <option className='calllogs_type_option'>
                    serch option and check box option
                  </option>

                </select>
              </div>
            </div>
          </div>

          <div>
            <div className='callogs_type_contaier'>
              <p>Call Number</p>
              <input className='calllogs_filter_input_callNumber' />
            </div>
          </div>

        </div>
        <div className='calllogs_last_container'>
          <div className='calllogs_last_container_top'>
            <h3>Call Log Details</h3>
            <p>Total Records: <span>0</span></p>
          </div>
          <div className='calllogs_last_container_table'>
            <table className='calllogs_last_container_table_table'>
              <thead>
                <th>Date</th>
                <th>Time</th>
                <th>Caller Number</th>
                <th>Call Duration</th>
                <th>Call Status</th>
                <th>Call Type</th>
                <th>SIM Number</th>
                <th>Recording</th>
                <th>Caller Circle Name</th>
                <th>Ring Duration</th>
              </thead>
              <tbody>
                <td>25-08-2025</td>
                <td>12:39:45</td>
                <td>8989898989</td>
                <td>00:00:55</td>
                <td>Answered</td>
                <td>Inbound</td>
                <td>SIM465464646554</td>
                <td>shdfiauhfwenlva.web</td>
                <td>Mumbai</td>
                <td>00:00:25</td>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallLogs;
