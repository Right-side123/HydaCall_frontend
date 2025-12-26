import React from 'react';
import './styles/Layout.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CallLogs from './pages/CallLogs';
import Department from './pages/Department';
import ManagePhone from './pages/ManagePhone';
import Users from './pages/Users';
import Reports from './pages/Reports';
import Login from './pages/Login';
import CallSummaryReport from './pages/CallSummaryReport';
import AnalysisReport from './pages/AnalysisReport';
import HourlyAnalysisReport from './pages/HourlyAnalysisReport';
import DayWiseAnalysisReport from './pages/DayWiseAnalysisReport';
import NeverAttendReport from './pages/NaverAttendReport';
import NotPickupClientReport from './pages/NotPickupClientReport';
import UniqueClientReport from './pages/UniqueClientReport';
import UpdatedManagePhone from './Components/UpdatedPhoneManage';
import UpdatedPhoneHistoryByNumber from './Components/UpdateHistoryPhoneByNumber';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/call-logs" element={<CallLogs />} />
        <Route path='/department' element={<Department />} />


        <Route path='/manage-phone' element={<ManagePhone />} />
        <Route path='/manage-phone-history' element={<UpdatedManagePhone />} />
        <Route path="/updated-phone-history/:sim_number" element={<UpdatedPhoneHistoryByNumber />} />



        <Route path='/user' element={<Users />} />
        <Route path='/reports' element={<Reports />} />

        <Route path='/report/call-summary' element={<CallSummaryReport />} />
        <Route path='/report/analysis' element={<AnalysisReport />} />
        <Route path='/report/hourly-analysis' element={<HourlyAnalysisReport />} />
        <Route path='/report/day-wise-analysis' element={<DayWiseAnalysisReport />} />
        <Route path='/report/never-attended' element={<NeverAttendReport />} />
        <Route path='/report/not-pickup-by-client' element={<NotPickupClientReport />} />
        <Route path='/report/unique-clients' element={<UniqueClientReport />} />
      </Routes>
    </Router>
  );
}

export default App;