// import React from 'react';
// import './styles/Layout.css';

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import Sidebar from './Components/Sidebar';
// import Dashboard from './pages/Dashboard';
// import CallLogs from './pages/CallLogs';
// import Department from './pages/Department';
// import ManagePhone from './pages/ManagePhone';
// import Users from './pages/Users';
// import Reports from './pages/Reports';
// // import Login from './pages/Login';


// function App() {
//   return (
//     <Router>
//       <div className="main-layout">
//         {/* <Sidebar /> */}
//         <div className="page-content">
//           <Routes>
//             {/* <Route path='/' element={<Login />} /> */}
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/call-logs" element={<CallLogs />} />
//             <Route path='/department' element={<Department />} />
//             <Route path='/manage-phone' element={<ManagePhone />} />
//             <Route path='/user' element={<Users />} />
//             <Route path='/reports' element={<Reports />} />

//           </Routes>
//         </div>
//       </div>
//     </Router>

//     //  <Login/>
//   );
// }

// export default App;


// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Sidebar from './Components/Sidebar';
// import Dashboard from './pages/Dashboard';
// import CallLogs from './pages/CallLogs';
// import Department from './pages/Department';
// import ManagePhone from './pages/ManagePhone';
// import Users from './pages/Users';
// import Reports from './pages/Reports';
// import Login from './pages/Login';
// import './styles/Layout.css';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const auth = localStorage.getItem("auth");
//     if (auth === "true") {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         {/* Agar login nahi hai */}
//         {!isAuthenticated ? (
//           <>
//             <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
//             <Route path="*" element={<Navigate to="/" />} />
//           </>
//         ) : (
//           <>
//             <Route
//               path="/"
//               element={<Navigate to="/dashboard" />}
//             />
//             <Route
//               path="*"
//               element={
//                 <div className="main-layout">
//                   <Sidebar setIsAuthenticated={setIsAuthenticated} />
//                   <div className="page-content">
//                     <Routes>
//                       <Route path="/dashboard" element={<Dashboard />} />
//                       <Route path="/call-logs" element={<CallLogs />} />
//                       <Route path="/department" element={<Department />} />
//                       <Route path="/manage-phone" element={<ManagePhone />} />
//                       <Route path="/user" element={<Users />} />
//                       <Route path="/reports" element={<Reports />} />
//                       {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
//                     </Routes>
//                   </div>
//                 </div>
//               }
//             />
//           </>
//         )}
//       </Routes>
//     </Router>
//   );
// }

// export default App;



// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Sidebar from './Components/Sidebar';
// import Dashboard from './pages/Dashboard';
// import CallLogs from './pages/CallLogs';
// import Department from './pages/Department';
// import ManagePhone from './pages/ManagePhone';
// import Users from './pages/Users';
// import Reports from './pages/Reports';
// import Login from './pages/Login';
// import './styles/Layout.css';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // check localStorage on first load
//   useEffect(() => {
//     const auth = localStorage.getItem("auth");
//     if (auth === "true") {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   return (
//     <Router>
//       <Routes>

//         {!isAuthenticated ? (
//           <Route path="*" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
//         ) : (
//           <Route
//             path="*"
//             element={
//               <div className="main-layout">

//                 <div className="page-content">
//                    <Sidebar />
//                   <Routes>

//                     <Route path="/dashboard" element={<Dashboard />} />
//                     <Route path="/call-logs" element={<CallLogs />} />
//                     <Route path="/department" element={<Department />} />
//                     <Route path="/manage-phone" element={<ManagePhone />} />
//                     <Route path="/user" element={<Users />} />
//                     <Route path="/reports" element={<Reports />} />

//                     {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
//                   </Routes>
//                 </div>
//               </div>
//             }
//           />
//         )}
//       </Routes>
//     </Router>
//   );
// }

// export default App;


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

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/call-logs" element={<CallLogs />} />
        <Route path='/department' element={<Department />} />
        <Route path='/manage-phone' element={<ManagePhone />} />
        <Route path='/user' element={<Users />} />
        <Route path='/reports' element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;