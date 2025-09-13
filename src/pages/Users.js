import React, { useState, useEffect } from 'react';
import '../styles/Users.css';
import Layout from '../Components/Layout';
import usersIcon from '../assets/usersusericon.png';
import simNumberIcon from '../assets/usersSim.png';
import activeUserIcon from '../assets/activeuser.png';
import inActiveUserIcon from '../assets/inactiveuser.png';
import departmentIcon from '../assets/usersdepartment.png';
import searchicon from '../assets/searchicon.png';
import addUserIcon from '../assets/useradd.png';
import eyeUserIcon from '../assets/eyeuser.png';
import editIcon from '../assets/editIcon.png';
import deleteIcon from '../assets/deleteIcon.png';
import copyUserIcon from '../assets/copyuser.png';
// import crossIcon from '../assets/crossIcon.png';
import Sidebar from '../Components/Sidebar';
import AddUserModal from '../Components/AddUserModel';
import EditUserModal from '../Components/EditUserModel';

import api from '../Components/Api';
import CopyUserModal from '../Components/CopyUserModel';



const Users = () => {
    const [addUser, setAddUser] = useState(false);
    const [editUser, setEditUser] = useState(false);
    const [copyUser, setCopyUser] = useState(false);
    const [totalSummery, setTotalSummery] = useState([])
    const [users, setUsers] = useState([]);

    const [error, setError] = useState("");
    // const [department, setDepartment] = useState([]);
    // const [selectAll, setSelectAll] = useState(false);
    const [search, setSearch] = useState('');

    // const [mode, setMode] = useState("add");

    const [selectedUser, setSelectedUser] = useState(null);

    const InitialState = {
        name: "",
        email: "",
        password: "",
        department_id: "",
        allowed_departments: [],
        phone_number: [],
        status: "Active",
        password_expire_days: 30,
        date_format: "YYYY-MM-DD",
        allowed_reports: []
    }
    const [createUser, setCreateUser] = useState(InitialState)

    // const [createUser, setCreateUser] = useState({
    //     name: "",
    //     email: "",
    //     password: "",
    //     department_id: "",
    //     allowed_departments: [],
    //     phone_number: "",
    //     status: "Active",
    //     password_expire_days: 30,
    //     date_format: "YYYY-MM-DD",
    //     allowed_reports: []
    // });
    // const [error, setError] = useState("");


    const filteredUsers = users.filter((dept) =>
        dept.name.toLowerCase().includes(search.toLowerCase())
    );


    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Calculate indexes
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Apply search + pagination together
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    // Total pages
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);


    // const handleAddUserClick = () => {
    //     setMode("add");
    //     setCreateUser(InitialState);
    //     setAddUser(true);
    // };

    // *******************************************      for Copy USer

    useEffect(() => {
        if (selectedUser) {
            setCreateUser({
                ...selectedUser,
                name: "",
                email: "",
                password: "",
                allowed_departments: safeParse(selectedUser.allowed_departments),
                phone_number: safeParse(selectedUser.phone_number),
                allowed_reports: safeParse(selectedUser.allowed_reports)
            });
        }
    }, [selectedUser]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setCreateUser({ ...createUser, [name]: value });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         if (mode === "add") {
    //             await api.post("/user", createUser);
    //         } else {
    //             await api.put(`/user/${createUser.id}`, createUser);
    //         }

    //         setAddUser(false);
    //         setCreateUser(InitialState);
    //         fetchUsers();
    //         fetchSummery();

    //     } catch (err) {
    //         console.error("Error creating/updating user:", err);

    //     }
    // };


    // ****************************************    create user

    // const handleCreateUser = async (e) => {
    //     e.preventDefault();

    //     if (!createUser) {
    //         setError("User name is required!");
    //         return;
    //     }

    //     try {
    //         await api.post("/user", {
    //             name: createUser.name,
    //             email: createUser.email,
    //             password: createUser.password,
    //             department_id: createUser.department_id,
    //             allowed_departments: createUser.allowed_departments,
    //             phone_number: createUser.phone_number,
    //             status: createUser.status,
    //             password_expire_days: createUser.password_expire_days,
    //             date_format: createUser.date_format,
    //             allowed_reports: createUser.allowed_reports
    //         });
    //         setAddUser(false);
    //         setCreateUser("");
    //         fetchUsers();
    //         fetchSummery();
    //         setError("");
    //     } catch (error) {
    //         setError("Failed to create user");

    //     }
    // };


    //        ********************************    create and copy user both in

    const handleCreateUser = async (e) => {
        e.preventDefault();

        // The condition should check for the specific fields you want
        if (!createUser.name || !createUser.email || !createUser.password) {
            setError("Name, email, and password are required!");
            return;
        }

        try {
            await api.post("/user", createUser);


            setAddUser(false);
            setEditUser(false);
            setCopyUser(false);


            setCreateUser(InitialState);
            setSelectedUser(null);

            fetchUsers();
            fetchSummery();
            setError("");
        } catch (error) {
            console.error("Error creating user:", error);
            setError("Failed to create user");
        }
    };


    //    ***********************     Edit   Handle   

    // const handleEditUser = (user) => {
    //     // setCreateUser(user);
    //     setCreateUser({
    //         ...user,
    //         phone_number: Array.isArray(user.phone_number) ? user.phone_number : [],
    //         allowed_departments: Array.isArray(user.allowed_departments) ? user.allowed_departments : []
    //     });

    //     setMode("edit");
    //     setAddUser(true);
    // }

    // ************************************   in mode 

    // const handleEditUser = (user) => {
    //     setCreateUser({
    //         ...user,

    //         phone_number: typeof user.phone_number === "string"
    //             ? user.phone_number.split(",").map(p => p.trim())
    //             : Array.isArray(user.phone_number)
    //                 ? user.phone_number
    //                 : [],

    //         allowed_departments: Array.isArray(user.allowed_departments)
    //             ? user.allowed_departments
    //             : []
    //     });

    //     setMode("edit");
    //     setAddUser(true);
    // }


    // ************************************     single 


    const safeParse = (data) => {
        try {
            if (typeof data === "string" && data.startsWith("[") && data.endsWith("]")) {
                return JSON.parse(data);

            }
            return Array.isArray(data) ? data : [];
        } catch {
            return Array.isArray(data) ? data : [];
        }
    };

    const handleUpdateUser = async () => {
        if (!selectedUser.name || selectedUser.name.trim() === "") {
            setError("User name is required");
            return;
        }

        try {
            await api.put(`/user/${selectedUser.id}`, {
                name: selectedUser.name,
                email: selectedUser.email,
                password: selectedUser.password,
                department_id: selectedUser.department_id,
                allowed_departments: safeParse(selectedUser.allowed_departments),
                phone_number: safeParse(selectedUser.phone_number),
                status: selectedUser.status,
                password_expire_days: selectedUser.password_expire_days,
                date_format: selectedUser.date_format,
                allowed_reports: safeParse(selectedUser.allowed_reports)
            });


            setEditUser(false);
            fetchUsers();
            fetchSummery();
            setError("");
        } catch (err) {
            console.error("Error updating user", err);
        }
    };




    // *************************   department fetch for showing list in model

    // const fetchDepartments = async () => {
    //     try {
    //         const res = await api.get("/department");
    //         setDepartment(res.data);
    //     } catch (err) {
    //         console.error("Error fetching department:", err);
    //     }
    // }

    // useEffect(() => {
    //     fetchDepartments();
    // }, []);

    // **************************** *********************  Summry  API

    const fetchSummery = async () => {
        try {
            const res = await api.get("/usersummery");
            setTotalSummery(res.data);
        } catch (err) {
            console.error("Error fetching total summery:", err);


        }
    }

    useEffect(() => {
        fetchSummery()
    }, []);


    // ****************************************************    Fetch   User   Function

    const fetchUsers = async () => {
        try {
            const res = await api.get("/user");
            setUsers(res.data);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);



    // ****************************************************    Delete   User   Function

    const handleDeleteUser = async (id) => {
        try {
            await api.delete(`/user/${id}`)
            fetchUsers();
            fetchSummery();
        }
        catch (err) {
            console.error("Error deleteing user", err);

        }
    };

    // New function to handle closing the modal and resetting state
    const handleCloseModal = () => {
        setAddUser(false);
        setCreateUser(InitialState);
        // setMode("add");
        setEditUser(false);
        setCopyUser(false);
    };

    // ******************************    Allowed Department Checkbox selectable   

    // const handleCheckboxChange = (name) => {
    //     let updatedDepartments = [...createUser.allowed_departments];
    //     if (updatedDepartments.includes(name)) {
    //         updatedDepartments = updatedDepartments.filter((d) => d !== name);
    //     } else {
    //         updatedDepartments.push(name);
    //     }
    //     setCreateUser({ ...createUser, allowed_departments: updatedDepartments });


    //     setSelectAll(updatedDepartments.length === department.length);
    // };

    // const handleSelectAll = () => {
    //     if (selectAll) {
    //         setCreateUser({ ...createUser, allowed_departments: [] });
    //         setSelectAll(false);
    //     } else {
    //         const allDeptNames = department.map((d) => d.name);
    //         setCreateUser({ ...createUser, allowed_departments: allDeptNames });
    //         setSelectAll(true);
    //     }
    // };




    return (
        <div className='main-layout'>
            <Sidebar />

            <div className='page-content'>
                <div className="department_titel_container">
                    <h1 className='department_title'>USERS</h1>
                    <Layout></Layout>
                </div>

                <div className='users_second_container'>
                    {[totalSummery].map((summrey, index) => (
                        <React.Fragment key={index}>
                            <div className='users_second_container_card'>
                                <div className='users_second_container_card_lefts'>
                                    <span>Users</span>
                                    <p>{summrey.users}</p>
                                </div>

                                <div className='users_second_container_card_right'>
                                    <img src={usersIcon} alt='user' className='users_second_container_card_right_icon' />
                                </div>
                            </div>
                            <div className='users_second_container_card'>
                                <div className='users_second_container_card_lefts'>
                                    <span>SIM Numbers</span>
                                    <p>{summrey.active_users}</p>
                                </div>

                                <div className='users_second_container_card_right'>
                                    <img src={simNumberIcon} alt='SIM Number' className='users_second_container_card_right_icon' />
                                </div>
                            </div>
                            <div className='users_second_container_card'>
                                <div className='users_second_container_card_lefts'>
                                    <span>Active Users</span>
                                    <p>{summrey.active_users}</p>
                                </div>

                                <div className='users_second_container_card_right'>
                                    <img src={activeUserIcon} alt='active user' className='users_second_container_card_right_icon' />
                                </div>
                            </div>
                            <div className='users_second_container_card'>
                                <div className='users_second_container_card_lefts'>
                                    <span>Inactive Users</span>
                                    <p>{summrey.inactive_users}</p>
                                </div>

                                <div className='users_second_container_card_right'>
                                    <img src={inActiveUserIcon} alt='Inactive User' className='users_second_container_card_right_icon' />
                                </div>
                            </div>
                            <div className='users_second_container_card'>
                                <div className='users_second_container_card_lefts'>
                                    <span>Department</span>
                                    <p>{summrey.departments}</p>
                                </div>

                                <div className='users_second_container_card_right'>
                                    <img src={departmentIcon} alt='Department' className='users_second_container_card_right_icon' />
                                </div>
                            </div>
                        </React.Fragment>
                    ))}

                </div>

                <div className='department_second_container'>
                    <div className='department_second_container_top'>
                        <h3>User Details</h3>
                        <div className='department_second_container_top_right'>
                            <div className='search_box_container'>
                                <img src={searchicon} alt='search' className='searchicon' />
                                <input type='text'
                                    placeholder='Search'
                                    className='search_box'
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)} />
                            </div>


                            {/* <button className='add_dept_btn' onClick={() => setAddUser(true)}> <img src={addUserIcon} alt='department' className='dept_icon' />Add User</button> */}

                            <button className='add_dept_btn' onClick={() => setAddUser(true)}> <img src={addUserIcon} alt='department' className='dept_icon' />Add User</button>
                        </div>
                    </div>
                    <div className='main_container_table'>
                        <table>
                            <thead className=' table_heading'>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Department</th>
                                    <th>Phone Numbers</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody className='table_body'>
                                {users.length > 0 ? (
                                    currentUsers.map((user, index) => (
                                        <tr key={indexOfFirstItem + index + 1}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.department_name}</td>
                                            <td>{user.phone_number_count}</td>
                                            <td>
                                                <div style={{
                                                    color: user.status === "Active" ? "#04d34dff" : "#f83232ff",
                                                    backgroundColor: user.status === "Active" ? "#eefcf3ff" : "#faf3f3ff",
                                                    width: "60px",
                                                    textAlign: "center",
                                                    padding: "8px",
                                                    borderRadius: "5px",
                                                    fontWeight: "400",
                                                }}>
                                                    {user.status}
                                                </div>

                                            </td>

                                            <td >
                                                <div className='user_action_icons'>
                                                    <img src={eyeUserIcon} alt='View Phone Numbers' className='user_deleteicon' />
                                                    <span className='user_divider'></span>
                                                    <img src={editIcon} alt='edit' className='user_editicon'
                                                        onClick={() => { setEditUser(true); setSelectedUser(user); }}
                                                    />
                                                    <span className='user_divider'></span>
                                                    <img src={deleteIcon} alt='delete' className='user_deleteicon' onClick={() => handleDeleteUser(user.id)} />
                                                    <span className='user_divider'></span>
                                                    <img src={copyUserIcon} alt='Copy User' className='user_copyicon'
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setCopyUser(true);
                                                        }}
                                                    />
                                                </div>

                                            </td>

                                        </tr>
                                    ))) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: "center" }}>
                                            No users found!!
                                        </td>
                                    </tr>
                                )}

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
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
                {/* {addUser && (
                    <div className='user_container_model'>
                        <div className='user_model_container'>
                            <div className='user_model_title'>
                                <h3>Add User</h3>
                                <img src={crossIcon} alt='back' className='model_cross_icon' onClick={() => setAddUser(false)} />
                            </div>
                            <div className='user_content_container_model'>
                                <div className=' user_name_email_model_container'>
                                    <div className='user_name_email_model'>
                                        <label>Name <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            type='text'
                                            name='name'
                                            value={createUser.name}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                    <div className='user_name_email_model'>
                                        <label>Email <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            type='email'
                                            name='email'
                                            value={createUser.email}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                </div>
                                <div className='user_name_email_model_container'>
                                    <div className='user_name_email_model'>
                                        <label>Password <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            type='password'
                                            name='password'
                                            value={createUser.password}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                    <div className='user_name_email_model'>
                                        <p>Department <span style={{ color: 'red' }}>*</span></p>
                                        <select
                                            name='department_id'
                                            value={createUser.department_id}
                                            onChange={handleChange}
                                            required
                                            className=''>
                                            <option value=""></option>
                                            {department.map((dept) => (
                                                <option key={dept.id} value={dept.id}>
                                                    {dept.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='user_name_email_model_container'>
                                   


                                    <div className='user_name_email_model'>
                                        <p>Allowed Department <span style={{ color: 'red' }}>*</span></p>
                                        <div className='custom-multi-select'>
                                            <div>
                                                <label>
                                                    <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                                                    Select All
                                                </label>
                                            </div>
                                            {department.map((dept) => (
                                                <div key={dept.id}>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            value={dept.name}
                                                            checked={createUser.allowed_departments.includes(dept.name)}
                                                            onChange={() => handleCheckboxChange(dept.name)}
                                                        />
                                                        {dept.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                
                                    <div className='user_name_email_model'>
                                        <p>Phone Numbers<span style={{ color: 'red' }}>*</span></p>
                                        <select
                                            name='phone_number'
                                            value={createUser.phone_number}
                                            onChange={(e) => setCreateUser({ ...createUser, phone_number: e.target.value })}
                                            className=''
                                        >
                                            <option value=" "></option>
                                            <option value="SIM 1">SIM 1</option>
                                            <option value="SIM 2">SIM 2</option>

                                        </select>
                                    </div>
                                </div>
                                <div className='user_name_email_model_container'>
                                    <div className=''>
                                        <label>Status <span style={{ color: 'red' }}>*</span></label>
                                        <div className='user_model_active_inactive'>

                                            <div className='user_model_active_inactive_radio'>
                                                <input
                                                    type="radio"
                                                    name="status"
                                                    value="Inactive"
                                                    checked={createUser.status === 'Inactive'}
                                                    onChange={(e) => setCreateUser({ ...createUser, status: e.target.value })}
                                                /> Inactive
                                            </div>
                                            <div className='user_model_active_inactive_radio'>
                                                <input
                                                    type="radio"
                                                    name="status"
                                                    value="Active"
                                                    checked={createUser.status === 'Active'}
                                                    onChange={(e) => setCreateUser({ ...createUser, status: e.target.value })}

                                                /> Active
                                            </div>
                                        </div>
                                    </div>
                                    <div className='user_name_email_model'>
                                        <label>Password Expire In (Days)<span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            type='number'
                                            name='password_expire_days'
                                            value={createUser.password_expire_days}
                                            onChange={(e) => setCreateUser({ ...createUser, password_expire_days: e.target.value })}
                                            required
                                            className='' />
                                    </div>
                                </div>
                                <div className='user_name_email_model_container'>
                                    <div className='user_name_email_model'>
                                        <label>Preferred Date Format<span style={{ color: 'red' }}>*</span></label>
                                        <select
                                            name="date_format"
                                            value={createUser.date_format}
                                            onChange={(e) => setCreateUser({ ...createUser, date_format: e.target.value })}
                                        >
                                            <option value=""></option>
                                            <option value="YYYY/MM/DD">YYYY/MM/DD - 2025/08/25</option>
                                            <option value="DD/MM/YYYY">DD/MM/YYYY - 25/08/2025</option>
                                            <option value="MM/DD/YYYY">MM/DD/YYYY - 08/25/2025</option>
                                        </select>

                                    </div>
                                    <div className='user_name_email_model'>
                                        <label>Allowed Reports<span style={{ color: 'red' }}>*</span></label>
                                        <div className="reports-list">
                                            {["Report A", "Report B", "Report C"].map((report) => (
                                                <div key={report}>
                                                    <input
                                                        type="checkbox"
                                                        checked={createUser.allowed_reports.includes(report)}
                                                        onChange={() => {
                                                            setCreateUser((prev) => ({
                                                                ...prev,
                                                                allowed_reports: prev.allowed_reports.includes(report)
                                                                    ? prev.allowed_reports.filter(r => r !== report)
                                                                    : [...prev.allowed_reports, report]
                                                            }));
                                                        }}
                                                    />
                                                    {report}
                                                </div>
                                            ))}


                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='model_btn_container'>

                                <button className='model_btn_can' onClick={() => setAddUser(false)}>Cancel</button>
                                <button className='model_btn_sub' onClick={handleSubmit}>Add User</button>
                            </div>
                        </div>

                    </div>
                )} */}


                {addUser && (
                    <AddUserModal

                        createUser={createUser}
                        setCreateUser={setCreateUser}
                        setAddUser={handleCloseModal}
                        handleChange={handleChange}
                        handleCreateUser={handleCreateUser}

                    />
                )}

                {editUser && (
                    <EditUserModal
                        error={error}
                        selectedUser={selectedUser}
                        setSelectedUser={setSelectedUser}
                        setEditUser={handleCloseModal}
                        handleChange={handleChange}
                        handleUpdateUser={handleUpdateUser}
                    />
                )}

                {copyUser && (
                    <CopyUserModal
                        selectedUser={selectedUser}
                        setSelectedUser={setSelectedUser}
                        createUser={createUser}
                        handleChange={handleChange}
                        setCopyUser={handleCloseModal}
                        handleCreateUser={handleCreateUser}
                    />
                )}

            </div>
        </div>
    );
};

export default Users;





// import React, { useState, useEffect } from 'react';
// import '../styles/Users.css';
// import Layout from '../Components/Layout';
// import usersIcon from '../assets/usersusericon.png';
// import simNumberIcon from '../assets/usersSim.png';
// import activeUserIcon from '../assets/activeuser.png';
// import inActiveUserIcon from '../assets/inactiveuser.png';
// import departmentIcon from '../assets/usersdepartment.png';
// import searchicon from '../assets/searchicon.png';
// import addUserIcon from '../assets/useradd.png';
// import eyeUserIcon from '../assets/eyeuser.png';
// import editIcon from '../assets/editIcon.png';
// import deleteIcon from '../assets/deleteIcon.png';
// import copyUserIcon from '../assets/copyuser.png';
// import Sidebar from '../Components/Sidebar';
// import AddUserModal from '../Components/AddUserModel';
// import EditUserModal from '../Components/EditUserModel';
// import api from '../Components/Api';
// import CopyUserModal from '../Components/CopyUserModel';

// const Users = () => {
//     const [addUser, setAddUser] = useState(false);
//     const [editUser, setEditUser] = useState(false);
//     const [copyUser, setCopyUser] = useState(false);
//     const [totalSummery, setTotalSummery] = useState([])
//     const [users, setUsers] = useState([]);
//     const [error, setError] = useState("");
//     const [search, setSearch] = useState('');
//     const [selectedUser, setSelectedUser] = useState(null);

//     const InitialState = {
//         name: "",
//         email: "",
//         password: "",
//         department_id: "",
//         allowed_departments: [],
//         phone_number: [],
//         status: "Active",
//         password_expire_days: 30,
//         date_format: "YYYY-MM-DD",
//         allowed_reports: []
//     }
//     const [createUser, setCreateUser] = useState(InitialState)

//     // Helper function to safely parse JSON strings
//     const safeParse = (data) => {
//         try {
//             if (typeof data === "string" && data.startsWith("[") && data.endsWith("]")) {
//                 return JSON.parse(data);
//             }
//             return Array.isArray(data) ? data : [];
//         } catch {
//             return Array.isArray(data) ? data : [];
//         }
//     };

//     const filteredUsers = users.filter((dept) =>
//         dept.name.toLowerCase().includes(search.toLowerCase())
//     );

//     // Pagination states
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 2;

//     // Calculate indexes
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;

//     // Apply search + pagination together
//     const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

//     // Total pages
//     const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

//     // This useEffect is where the fix is implemented
//     useEffect(() => {
//         if (selectedUser) {
//             // Parse the JSON strings from the fetched user object before setting state
//             setCreateUser({
//                 ...selectedUser,
//                 name: "",
//                 email: "",
//                 password: "",
//                 allowed_departments: safeParse(selectedUser.allowed_departments),
//                 phone_number: safeParse(selectedUser.phone_number),
//                 allowed_reports: safeParse(selectedUser.allowed_reports)
//             });
//         }
//     }, [selectedUser]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setCreateUser({ ...createUser, [name]: value });
//     };

//     const handleCreateUser = async (e) => {
//         e.preventDefault();

//         if (!createUser.name || !createUser.email || !createUser.password) {
//             setError("Name, email, and password are required!");
//             return;
//         }

//         try {
//             await api.post("/user", createUser);

//             setAddUser(false);
//             setEditUser(false);
//             setCopyUser(false);

//             setCreateUser(InitialState);
//             setSelectedUser(null);

//             fetchUsers();
//             fetchSummery();
//             setError("");
//         } catch (error) {
//             console.error("Error creating user:", error);
//             setError("Failed to create user");
//         }
//     };

//     const handleUpdateUser = async () => {
//         if (!selectedUser.name || selectedUser.name.trim() === "") {
//             setError("User name is required");
//             return;
//         }

//         try {
//             await api.put(`/user/${selectedUser.id}`, {
//                 name: selectedUser.name,
//                 email: selectedUser.email,
//                 password: selectedUser.password,
//                 department_id: selectedUser.department_id,
//                 allowed_departments: safeParse(selectedUser.allowed_departments),
//                 phone_number: safeParse(selectedUser.phone_number),
//                 status: selectedUser.status,
//                 password_expire_days: selectedUser.password_expire_days,
//                 date_format: selectedUser.date_format,
//                 allowed_reports: safeParse(selectedUser.allowed_reports)
//             });

//             setEditUser(false);
//             fetchUsers();
//             fetchSummery();
//             setError("");
//         } catch (err) {
//             console.error("Error updating user", err);
//         }
//     };

//     const fetchSummery = async () => {
//         try {
//             const res = await api.get("/usersummery");
//             setTotalSummery(res.data);
//         } catch (err) {
//             console.error("Error fetching total summery:", err);
//         }
//     }

//     useEffect(() => {
//         fetchSummery()
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             const res = await api.get("/user");
//             setUsers(res.data);
//         } catch (err) {
//             console.error("Error fetching users:", err);
//         }
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const handleDeleteUser = async (id) => {
//         try {
//             await api.delete(`/user/${id}`)
//             fetchUsers();
//             fetchSummery();
//         } catch (err) {
//             console.error("Error deleteing user", err);
//         }
//     };

//     const handleCloseModal = () => {
//         setAddUser(false);
//         setCreateUser(InitialState);
//         setEditUser(false);
//         setCopyUser(false);
//     };

//     return (
//         <div className='main-layout'>
//             <Sidebar />
//             <div className='page-content'>
//                 <div className="department_titel_container">
//                     <h1 className='department_title'>USERS</h1>
//                     <Layout></Layout>
//                 </div>
//                 <div className='users_second_container'>
//                     {[totalSummery].map((summrey, index) => (
//                         <React.Fragment key={index}>
//                             <div className='users_second_container_card'>
//                                 <div className='users_second_container_card_lefts'>
//                                     <span>Users</span>
//                                     <p>{summrey.users}</p>
//                                 </div>
//                                 <div className='users_second_container_card_right'>
//                                     <img src={usersIcon} alt='user' className='users_second_container_card_right_icon' />
//                                 </div>
//                             </div>
//                             <div className='users_second_container_card'>
//                                 <div className='users_second_container_card_lefts'>
//                                     <span>SIM Numbers</span>
//                                     <p>{summrey.active_users}</p>
//                                 </div>
//                                 <div className='users_second_container_card_right'>
//                                     <img src={simNumberIcon} alt='SIM Number' className='users_second_container_card_right_icon' />
//                                 </div>
//                             </div>
//                             <div className='users_second_container_card'>
//                                 <div className='users_second_container_card_lefts'>
//                                     <span>Active Users</span>
//                                     <p>{summrey.active_users}</p>
//                                 </div>
//                                 <div className='users_second_container_card_right'>
//                                     <img src={activeUserIcon} alt='active user' className='users_second_container_card_right_icon' />
//                                 </div>
//                             </div>
//                             <div className='users_second_container_card'>
//                                 <div className='users_second_container_card_lefts'>
//                                     <span>Inactive Users</span>
//                                     <p>{summrey.inactive_users}</p>
//                                 </div>
//                                 <div className='users_second_container_card_right'>
//                                     <img src={inActiveUserIcon} alt='Inactive User' className='users_second_container_card_right_icon' />
//                                 </div>
//                             </div>
//                             <div className='users_second_container_card'>
//                                 <div className='users_second_container_card_lefts'>
//                                     <span>Department</span>
//                                     <p>{summrey.departments}</p>
//                                 </div>
//                                 <div className='users_second_container_card_right'>
//                                     <img src={departmentIcon} alt='Department' className='users_second_container_card_right_icon' />
//                                 </div>
//                             </div>
//                         </React.Fragment>
//                     ))}
//                 </div>
//                 <div className='department_second_container'>
//                     <div className='department_second_container_top'>
//                         <h3>User Details</h3>
//                         <div className='department_second_container_top_right'>
//                             <div className='search_box_container'>
//                                 <img src={searchicon} alt='search' className='searchicon' />
//                                 <input type='text'
//                                     placeholder='Search'
//                                     className='search_box'
//                                     value={search}
//                                     onChange={(e) => setSearch(e.target.value)} />
//                             </div>
//                             <button className='add_dept_btn' onClick={() => setAddUser(true)}> <img src={addUserIcon} alt='department' className='dept_icon' />Add User</button>
//                         </div>
//                     </div>
//                     <div className='main_container_table'>
//                         <table>
//                             <thead className=' table_heading'>
//                                 <tr>
//                                     <th>Name</th>
//                                     <th>Email</th>
//                                     <th>Department</th>
//                                     <th>Phone Numbers</th>
//                                     <th>Status</th>
//                                     <th>Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody className='table_body'>
//                                 {users.length > 0 ? (
//                                     currentUsers.map((user, index) => (
//                                         <tr key={indexOfFirstItem + index + 1}>
//                                             <td>{user.name}</td>
//                                             <td>{user.email}</td>
//                                             <td>{user.department_name}</td>
//                                             <td>{user.phone_number_count}</td>
//                                             <td>
//                                                 <div style={{
//                                                     color: user.status === "Active" ? "#04d34dff" : "#f83232ff",
//                                                     backgroundColor: user.status === "Active" ? "#eefcf3ff" : "#faf3f3ff",
//                                                     width: "60px",
//                                                     textAlign: "center",
//                                                     padding: "8px",
//                                                     borderRadius: "5px",
//                                                     fontWeight: "400",
//                                                 }}>
//                                                     {user.status}
//                                                 </div>
//                                             </td>
//                                             <td >
//                                                 <div className='user_action_icons'>
//                                                     <img src={eyeUserIcon} alt='View Phone Numbers' className='user_deleteicon' />
//                                                     <span className='user_divider'></span>
//                                                     <img src={editIcon} alt='edit' className='user_editicon'
//                                                         onClick={() => { setEditUser(true); setSelectedUser(user); }}
//                                                     />
//                                                     <span className='user_divider'></span>
//                                                     <img src={deleteIcon} alt='delete' className='user_deleteicon' onClick={() => handleDeleteUser(user.id)} />
//                                                     <span className='user_divider'></span>
//                                                     <img src={copyUserIcon} alt='Copy User' className='user_copyicon'
//                                                         onClick={() => {
//                                                             setSelectedUser(user);
//                                                             setCopyUser(true);
//                                                         }}
//                                                     />
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     ))) : (
//                                     <tr>
//                                         <td colSpan="6" style={{ textAlign: "center" }}>
//                                             No users found!!
//                                         </td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//                 <div className="pagination_container">
//                     <button
//                         disabled={currentPage === 1}
//                         onClick={() => setCurrentPage(currentPage - 1)}
//                     >
//                         Previous
//                     </button>
//                     {[...Array(totalPages)].map((_, index) => (
//                         <button
//                             key={index}
//                             className={currentPage === index + 1 ? "active_page" : ""}
//                             onClick={() => setCurrentPage(index + 1)}
//                         >
//                             {index + 1}
//                         </button>
//                     ))}
//                     <button
//                         disabled={currentPage === totalPages}
//                         onClick={() => setCurrentPage(currentPage + 1)}
//                     >
//                         Next
//                     </button>
//                 </div>
//                 {addUser && (
//                     <AddUserModal
//                         createUser={createUser}
//                         setCreateUser={setCreateUser}
//                         setAddUser={handleCloseModal}
//                         handleChange={handleChange}
//                         handleCreateUser={handleCreateUser}
//                     />
//                 )}
//                 {editUser && (
//                     <EditUserModal
//                         error={error}
//                         selectedUser={selectedUser}
//                         setSelectedUser={setSelectedUser}
//                         setEditUser={handleCloseModal}
//                         handleChange={handleChange}
//                         handleUpdateUser={handleUpdateUser}
//                     />
//                 )}
//                 {copyUser && (
//                     <CopyUserModal
//                         selectedUser={selectedUser}
//                         setSelectedUser={setSelectedUser}
//                         createUser={createUser}
//                         handleChange={handleChange}
//                         setCopyUser={handleCloseModal}
//                         handleCreateUser={handleCreateUser}
//                     />
//                 )}
//             </div>
//         </div>
//     );
// };
// export default Users;

