import React, { useState, useEffect } from 'react';
import '../styles/ManagePhone.css';
import Layout from '../Components/Layout';
import historyicon from '../assets/historyicon.png';
import downloadicon from '../assets/downloadicon.png';
import searchicon from '../assets/searchicon.png';
import editicon from '../assets/editIcon.png';
import historyiconblue from '../assets/historyiconblue.png';
import crossIcon from '../assets/crossIcon.png';
import Sidebar from '../Components/Sidebar';

import api from '../Components/Api';
import { NavLink, useNavigate, } from 'react-router-dom';
const ManagePhone = () => {
    const [editPhone, setEditPhone] = useState(false);
    const [simNumbers, setSimNumbers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [selectedSim, setSelectedSim] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    const fetchSimNumbers = async () => {
        try {
            
            const res = await api.get('/simnumber');
            setSimNumbers(res.data);
        } catch (err) {
            console.error('Error fetching SIM numbers', err);
        }
    };

    const fetchDepartments = async () => {
        try {
            const res = await api.get("/department");
            setDepartments(res.data);
        } catch (err) {
            console.log("Error fetching department:", err);
        }
    };

    
    useEffect(() => {
        fetchSimNumbers();
        fetchDepartments();
    }, []);



     const handleUpdate = async () => {
        try {
            await api.put(`/simnumber/${selectedSim.id}`, {
                Name: selectedSim.Name,
                Department: selectedSim.Department
            });
            setEditPhone(false);
            fetchSimNumbers(); 
        } catch (err) {
            console.error('Error updating SIM', err);
        }
    };




     const filteredSimNumbers = simNumbers.filter(sim =>
        sim.SIM_Number.toString().includes(searchTerm) ||
        sim.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEditClick = (sim) => {
        setSelectedSim(sim);
        setEditPhone(true);
    };

    return (
        <div className='main-layout'>
            <Sidebar />

            <div className='page-content'>
                <div className="department_titel_container">
                    <h1 className='department_title'>MANAGE PHONE</h1>
                    <Layout></Layout>
                </div>
                <div className='department_second_container'>
                    <div className='mangephone_second_container_top'>
                        <h3 className='mangephone_second_container_top_title'>Manage Phone</h3>
                        <div className='managephone_second_container_top_right'>
                            <div className='search_box_container'> <img src={searchicon} alt='search' className='searchicon' />
                                <input
                                    type='search'
                                    placeholder='Search'
                                    className='search_box'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            {/* <div className='add_dept_btn_container'> */}

                            <button className='download_btn_container'><img src={downloadicon} alt='department' className='dept_icon' /></button>
                            {/* </div> */}
                            <NavLink to="/manage-phone-history">
                                    <button className='history_btn_container'><img src={historyicon} alt='history' className='dept_icon' /></button>
                            </NavLink>
                            

                        </div>
                    </div>
                    {/* <div className='main_container_table'>
                        <table>
                            <thead className=' table_heading'>
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>SIM Number</th>
                                    <th>Name</th>
                                    <th>Department</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className='table_body'>
                                <tr>
                                    <td>1</td>
                                    <td>1546546</td>
                                    <td>rohit</td>
                                    <td>CSE</td>
                                    <td >
                                        <div className='action_icons'>
                                            <img src={editicon} alt='edit' className='editicon' onClick={() => setEditPhone(true)} />
                                            <span className='divider'></span>
                                            <img src={historyiconblue} alt='history' className='deleteicon' />
                                        </div>

                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>1546546</td>
                                    <td>rohit</td>
                                    <td>CSE</td>
                                    <td>
                                        <div className='action_icons'>
                                            <img src={editicon} alt='edit' className='editicon' />
                                            <span className='divider'></span>
                                            <img src={historyiconblue} alt='history' className='deleteicon' />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>1546546</td>
                                    <td>rohit</td>
                                    <td>CSE</td>
                                    <td>
                                        <div className='action_icons'>
                                            <img src={editicon} alt='edit' className='editicon' />
                                            <span className='divider'></span>
                                            <img src={historyiconblue} alt='history' className='deleteicon' />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div> */}


                    <div className='main_container_table'>
                        <table>
                            <thead className='table_heading'>
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>SIM Number</th>
                                    <th>Name</th>
                                    <th>Department</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className='table_body'>
                                {filteredSimNumbers.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center' }}>No Records Found!!</td>
                                    </tr>
                                ) : (
                                    filteredSimNumbers.map((sim, index) => (
                                        <tr key={sim.id}>
                                            <td>{index + 1}</td>
                                            <td>{sim.SIM_Number}</td>
                                            <td>{sim.Name}</td>
                                            <td>{sim.Department}</td>
                                            <td>
                                                <div className='action_icons'>
                                            <img src={editicon} alt='edit' className='editicon' onClick={() => handleEditClick(sim)} />
                                            <span className='divider'></span>
                                            <img 
  src={historyiconblue} 
  alt='history' 
  className='deleteicon' 
  onClick={() => navigate(`/updated-phone-history/${sim.SIM_Number}`)}
/>
                                        </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="pagination_container">
                    <button>Previous</button>
                    <button className="active_page">1</button>
                    <button>Next</button>
                </div>
                {editPhone && (
                    <div className='main_container_model'>
                        <div className='manage_phone_model_container'>
                            <div className='manage_phone_model_title'>
                                <h3>Edit Phone</h3>
                                <img src={crossIcon} alt='back' className='model_cross_icon' onClick={() => setEditPhone(false)} />
                            </div>
                            <div className='mainphonemodel'>
                                <div className='phone_model_content'>
                                    <div className='phone_model_input_container'>
                                        <label>SIM Number</label>
                                        <input type='text' value={selectedSim.SIM_Number} readOnly />
                                    </div>
                                    <div className='phone_model_input_container'>
                                        <label>Name <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            type='text'
                                            value={selectedSim.Name}
                                            onChange={(e) =>
                                                setSelectedSim({ ...selectedSim, Name: e.target.value })
                                            }
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='phone_model_content'>
                                    <div className='phone_model_input_container'>
                                        <label>Department <span style={{ color: 'red' }}>*</span></label>
                                        <select
                                            value={selectedSim.Department}
                                            onChange={(e) =>
                                                setSelectedSim({ ...selectedSim, Department: e.target.value })
                                            }
                                            required
                                        >
                                            {departments.map(dep => (
                                                <option key={dep.id} value={dep.name}>{dep.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='model_btn_container'>

                                <button className='model_btn_can' onClick={() => setEditPhone(false)}>Cancel</button>
                                <button className='model_btn_sub' onClick={handleUpdate}>Update</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManagePhone;





// import React, { useState, useEffect } from 'react';
// import '../styles/ManagePhone.css';
// import Layout from '../Components/Layout';
// import historyicon from '../assets/historyicon.png';
// import downloadicon from '../assets/downloadicon.png';
// import searchicon from '../assets/searchicon.png';
// import editicon from '../assets/editIcon.png';
// import historyiconblue from '../assets/historyiconblue.png';
// import crossIcon from '../assets/crossIcon.png';
// import Sidebar from '../Components/Sidebar';
// import axios from 'axios';
// import api from '../Components/Api';

// const ManagePhone = () => {
//     const [simNumbers, setSimNumbers] = useState([]);
//     const [departments, setDepartments] = useState([]);
//     const [editPhone, setEditPhone] = useState(false);
//     const [selectedSim, setSelectedSim] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');

//     // Fetch SIM numbers
//     useEffect(() => {
//         fetchSimNumbers();
//         fetchDepartments();
//     }, []);

//     const fetchSimNumbers = async () => {
//         try {
            
//             const res = await api.get('/simnumber');
//             setSimNumbers(res.data);
//         } catch (err) {
//             console.error('Error fetching SIM numbers', err);
//         }
//     };

//     const fetchDepartments = async () => {
//         try {
//             const res = await axios.get('http://localhost:8500/api/departments');
//             setDepartments(res.data);
//         } catch (err) {
//             console.error('Error fetching departments', err);
//         }
//     };

//     const handleEditClick = (sim) => {
//         setSelectedSim(sim);
//         setEditPhone(true);
//     };

//     const handleUpdate = async () => {
//         try {
//             await axios.put(`http://localhost:8500/api/simnumbers/${selectedSim.id}`, {
//                 name: selectedSim.name,
//                 department_id: selectedSim.department_id
//             });
//             setEditPhone(false);
//             fetchSimNumbers(); // refresh table
//         } catch (err) {
//             console.error('Error updating SIM', err);
//         }
//     };

//     // Filter based on search
//     const filteredSimNumbers = simNumbers.filter(sim =>
//         sim.sim_number.toString().includes(searchTerm) ||
//         sim.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className='main-layout'>
//             <Sidebar />

//             <div className='page-content'>
//                 <div className="department_titel_container">
//                     <h1 className='department_title'>MANAGE PHONE</h1>
//                     <Layout />
//                 </div>

//                 <div className='department_second_container'>
//                     <div className='mangephone_second_container_top'>
//                         <h3 className='mangephone_second_container_top_title'>Manage Phone</h3>
//                         <div className='managephone_second_container_top_right'>
//                             <div className='search_box_container'>
//                                 <img src={searchicon} alt='search' className='searchicon' />
//                                 <input
//                                     type='search'
//                                     placeholder='Search'
//                                     className='search_box'
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                 />
//                             </div>
//                             <button className='download_btn_container'>
//                                 <img src={downloadicon} alt='department' className='dept_icon' />
//                             </button>
//                             <button className='history_btn_container'>
//                                 <img src={historyicon} alt='history' className='dept_icon' />
//                             </button>
//                         </div>
//                     </div>

//                     <div className='main_container_table'>
//                         <table>
//                             <thead className='table_heading'>
//                                 <tr>
//                                     <th>Sr. No.</th>
//                                     <th>SIM Number</th>
//                                     <th>Name</th>
//                                     <th>Department</th>
//                                     <th>Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody className='table_body'>
//                                 {filteredSimNumbers.length === 0 ? (
//                                     <tr>
//                                         <td colSpan="5" style={{ textAlign: 'center' }}>No Records Found!!</td>
//                                     </tr>
//                                 ) : (
//                                     filteredSimNumbers.map((sim, index) => (
//                                         <tr key={sim.id}>
//                                             <td>{index + 1}</td>
//                                             <td>{sim.sim_number}</td>
//                                             <td>{sim.name}</td>
//                                             <td>{sim.department_name}</td>
//                                             <td>
//                                                 <div className='action_icons'>
//                                                     <img
//                                                         src={editicon}
//                                                         alt='edit'
//                                                         className='editicon'
//                                                         onClick={() => handleEditClick(sim)}
//                                                     />
//                                                     <span className='divider'></span>
//                                                     <img src={historyiconblue} alt='history' className='deleteicon' />
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>

//                 <div className="pagination_container">
//                     <button>Previous</button>
//                     <button className="active_page">1</button>
//                     <button>Next</button>
//                 </div>

//                 {/* Edit Modal */}
//                 {editPhone && (
//                     <div className='main_container_model'>
//                         <div className='manage_phone_model_container'>
//                             <div className='manage_phone_model_title'>
//                                 <h3>Edit Phone</h3>
//                                 <img
//                                     src={crossIcon}
//                                     alt='back'
//                                     className='model_cross_icon'
//                                     onClick={() => setEditPhone(false)}
//                                 />
//                             </div>
//                             <div className='mainphonemodel'>
//                                 <div className='phone_model_content'>
//                                     <div className='phone_model_input_container'>
//                                         <label>SIM Number</label>
//                                         <input type='text' value={selectedSim.sim_number} readOnly />
//                                     </div>
//                                     <div className='phone_model_input_container'>
//                                         <label>Name <span style={{ color: 'red' }}>*</span></label>
//                                         <input
//                                             type='text'
//                                             value={selectedSim.name}
//                                             onChange={(e) =>
//                                                 setSelectedSim({ ...selectedSim, name: e.target.value })
//                                             }
//                                             required
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className='phone_model_content'>
//                                     <div className='phone_model_input_container'>
//                                         <label>Department <span style={{ color: 'red' }}>*</span></label>
//                                         <select
//                                             value={selectedSim.department_id}
//                                             onChange={(e) =>
//                                                 setSelectedSim({ ...selectedSim, department_id: e.target.value })
//                                             }
//                                             required
//                                         >
//                                             {departments.map(dep => (
//                                                 <option key={dep.id} value={dep.id}>{dep.name}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className='model_btn_container'>
//                                 <button className='model_btn_can' onClick={() => setEditPhone(false)}>Cancel</button>
//                                 <button className='model_btn_sub' onClick={handleUpdate}>Update</button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ManagePhone;

