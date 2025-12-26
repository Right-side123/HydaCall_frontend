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
import { useState, useEffect } from 'react';
import api from '../Components/Api';

const CallLogs = () => {

  // const [startTime, setStartTime] = useState("00:00");
  // const [endTime, setEndTime] = useState("23:59");
  const [departments, setDepartments] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [users, setUsers] = useState([]);
  const [callLogsTotalData, setCallLogsTotalData] = useState({});
  const [calllogsData, setCalllogsData] = useState([]);


  const [clearDate, setClearDate] = useState(false);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    startTime: "00:00",
    endTime: "23:59",
    callType: "",
    department: "",
    simNumber: "",
    userId: "",
  });


  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDateChange = (start, end) => {
    setFilters({ ...filters, startDate: start, endDate: end });
  };


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate indexes
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Apply search + pagination together
  const currentCallsLogdData = calllogsData.slice(indexOfFirstItem, indexOfLastItem);

  // Total pages
  const totalPages = Math.ceil(calllogsData.length / itemsPerPage);

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

  const fetchSimNumbers = async () => {
    try {
      const res = await api.get("/simnumber");
      setNumbers(res.data);
    } catch (err) {
      console.error("Error fetching SIM Number:", err);
    }
  }

  useEffect(() => {
    fetchDepartments();
    fetchSimNumbers();
    fetchUsers();
  }, []);

  const fetchCallLogsData = async () => {
    try {
      const { startDate, endDate, startTime, endTime, callType, callStatus, callBack, department, userId, simNumber, callNumber } = filters;

      if (!startDate || !endDate) {
        alert("Please select start and end date");
        return;
      }

      const res = await api.get("/calllogs", {
        params: { startDate, endDate, startTime, endTime, callType, callStatus, callBack, department_id: department, simNumber, userId, callNumber }
      });

      console.log("Employee Summary Data:", res.data);
      setCalllogsData(res.data);
    } catch (err) {
      console.error("Error fetching Employee Summary:", err);
    }
  };



  const fetchCallLogsTotalData = async () => {
    try {
      const {
        startDate,
        endDate,
        startTime = "00:00",
        endTime = "23:59",
        callType,
        callStatus,
        callBack,
        department,
        userId,
        simNumber,
        callNumber
      } = filters;


      if (!startDate || !endDate) {
        alert("Please select start and end date");
        return;
      }

      const res = await api.get("/calllogstotal", {
        params: { startDate, endDate, startTime, endTime, callType, callStatus, callBack, department_id: department, simNumber, userId, callNumber }
      });

      console.log("Employee Summary Data:", res.data);
      setCallLogsTotalData(res.data[0]);

    } catch (err) {
      console.error("Error fetching Employee Summary:", err);
    }
  };



  const clearFilters = () => {
    setFilters({
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      callType: "",
      department: "",
      userId: "",
      simNumber: ""
    });
    setClearDate(true);
  };

  const handlesubmit = () => {
    fetchCallLogsData();
    fetchCallLogsTotalData();
  }

  return (
    <div className='main-layout'>
      <Sidebar />

      <div className='page-content'>
        <div className="titel_container">
          <h1 className='calllogs_title'>CALL LOGS</h1>
          <Layout></Layout>
        </div>
        {callLogsTotalData && (
          <div className='callllogs_top_container'>

            <div className='callllogs_top_container_left'>

              <div className='callllogs_top_container_card'>
                <div className='top_container_card_image' style={{ backgroundColor: '#7c64fa' }}>
                  <img src={totalcallsicon} alt='totalcalls' className='calllogs_icon_icon' />
                </div>
                <p>Total Calls</p>
                <h6>{callLogsTotalData?.TotalCalls || 0}</h6>
              </div>
              <div className='callllogs_top_container_card'>
                <div className='top_container_card_image' style={{ backgroundColor: '#6db0c5' }}>
                  <img src={inboundcallsicon} alt='inboundcalls' className='calllogs_icon_icon' />
                </div>
                <p>Inbound</p>
                <h6>{callLogsTotalData?.Inbound || 0}</h6>
              </div>
              <div className='callllogs_top_container_card'>
                <div className='top_container_card_image' style={{ backgroundColor: '#db52e2' }}>
                  <img src={outboundcallsicon} alt='outboundcalls' className='calllogs_icon_icon' />
                </div>
                <p>Outbound</p>
                <h6>{callLogsTotalData?.Outbound || 0}</h6>
              </div>
            </div>
            <div className='callllogs_top_container_right'>
              <div className='callllogs_top_container_card'>
                <div className='top_container_card_image' style={{ backgroundColor: '#00c68d' }}>
                  <img src={answeredcallicon} alt='answercalls' className='calllogs_icon_icon' />
                </div>
                <p>Answered</p>
                <h6>{callLogsTotalData?.Answered || 0}</h6>
              </div>
              <div className='callllogs_top_container_card'>
                <img src={notanswericon} alt='notanswercalls' className='calllogs_icon_notanswer' />
                <p>Not Answered</p>
                <h6>{callLogsTotalData?.NotAnswered || 0}</h6>
              </div>
              <div className='callllogs_top_container_card'>
                <img src={calllogmissedans} alt='missedcalls' className='calllogs_icon' />
                <p>Missed</p>
                <h6>{callLogsTotalData?.Missed || 0}</h6>
              </div>
              <div className='callllogs_top_container_card'>
                <img src={callbusyicon} alt='busycall' className='calllogs_icon' />
                <p>Busy</p>
                <h6>{callLogsTotalData?.Busy || 0}</h6>
              </div>
              <div className='callllogs_top_container_card'>
                <div className='top_container_card_image' style={{ backgroundColor: '#7f7873' }}>
                  <img src={notreachableicon} alt='notreachable' className='calllogs_icon_icon' />
                </div>
                <p>Not Reachable</p>
                <h6>{callLogsTotalData?.NotReachable || 0}</h6>
              </div>
            </div>
          </div>
        )}

        <div className='calllogs_second_main_container'>
          <div className='calllogs_second_main_container_top'>
            <h3 className='calllogs_second_main_container_top_title'>Filter</h3>
            <div className='calllogs_second_main_container_top_right'>
              <button className='calllogs_second_main_container_top_right_clrbtn' onClick={clearFilters}>Clear All</button>
              <button className='calllogs_second_main_container_top_right_applybtn' onClick={handlesubmit}>Apply Filter</button>
            </div>
          </div>
          <div className='calllogs_second_main_container_top_bottom'>
            <div className='calllogs_second_main_container_top_bottom_first'>
              <div className='callogs_daterange_contaier'>
                <p>Date Range</p>
                <div className='calllogs_daterange'>
                  <DateRange align='left' onDateChange={handleDateChange} clearSignal={clearDate}></DateRange>
                </div>
              </div>
              <div className='callogs_daterange_contaier'>
                <p>Time (HH:MM)</p>
                <div className='calllogs_time_container'>
                  <div className='calllogs_time'>
                    <input
                      className='select_time'
                      type='time'
                      value={filters.startTime}
                      onChange={(e) => setFilters({ ...filters, startTime: e.target.value })}
                    />
                  </div>
                  <div className='calllogs_time'>
                    <input className='select_time'
                      type='time'
                      value={filters.endTime}
                      onChange={(e) => setFilters({ ...filters, endTime: e.target.value })} />
                  </div>
                </div>
              </div>
              <div className='callogs_type_contaier'>
                <p>Call Type</p>
                <div className='calllogs_type'>
                  <select className='analysis_report_type_select'
                    name="callType"
                    value={filters.callType}
                    onChange={handleChange}>
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
                <select
                  name="department"
                  value={filters.department}
                  onChange={handleChange}
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
            <div className='callogs_type_contaier'>
              <p>User</p>
              <div className='calllogs_type'>
                <select
                  name="userId"
                  value={filters.userId}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  {users.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='callogs_type_contaier'>
              <p>SIM Number</p>
              <div className='calllogs_type'>
                <select
                  name="simNumber"
                  value={filters.simNumber}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  {numbers.map((num) => (
                    <option key={num.SIM_Number} value={num.SIM_Number}>
                      {num.SIM_Number} - {num.Name}
                    </option>

                  ))}
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
            <h3>Call Log Details
              {/* <select
              value={currentPage}
              onChange={(e) => {
                setCurrentPage(1);
                setCurrentPage(Number(e.target.value));
              }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select> */}
            </h3>
            <p>Total Records: <span>{calllogsData.length}</span></p>
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
                {currentCallsLogdData.map((row, index) => (
                  <tr>
                    <td>{row.Date}</td>
                    <td>{row.Time}</td>
                    <td>{row.CallerNumber}</td>
                    <td>callduration</td>
                    <td>{row.Status}</td>
                    <td>{row.CallType}</td>
                    <td>SIM_Number</td>
                    <td>
                      {row.Recording ? (
                        <div className="audio-actions">

                          <button onClick={() => new Audio(row.Recording).play()}>
                            ▶
                          </button>


                          <a href={row.Recording} download>
                            ⬇
                          </a>


                          <button onClick={() => navigator.clipboard.writeText(row.Recording)}>
                            📋
                          </button>
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>



                    <td>{row.Caller_Circle_Name}</td>
                    <td>ring Duration</td>
                  </tr>
                ))
                }

              </tbody>
            </table>
          </div>
        </div>

        <div className="pagination_container">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active_page" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallLogs;
