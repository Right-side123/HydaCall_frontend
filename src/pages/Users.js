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
import Sidebar from '../Components/Sidebar';
import AddUserModal from '../Components/AddUserModel';
import EditUserModal from '../Components/EditUserModel';
import api from '../Components/Api';
import CopyUserModal from '../Components/CopyUserModel';
import AssignedUserNumberModal from '../Components/AssignedUserNumber';


const Users = () => {
    const [addUser, setAddUser] = useState(false);
    const [editUser, setEditUser] = useState(false);
    const [copyUser, setCopyUser] = useState(false);
    const [assignedNumber, setAssignedNumber] = useState(false)
    const [totalSummery, setTotalSummery] = useState([])
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [search, setSearch] = useState('');
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

    const filteredUsers = users.filter((dept) =>
        dept.name.toLowerCase().includes(search.toLowerCase())
    );

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

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

    //        ********************************    create and copy user both in

    const handleCreateUser = async (e) => {
        e.preventDefault();
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

    const handleCloseModal = () => {
        setAddUser(false);
        setCreateUser(InitialState);
        setEditUser(false);
        setCopyUser(false);
    };


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
                                    <p>{summrey.simnumbers}</p>
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
                                                    <img src={eyeUserIcon} alt='View Phone Numbers' className='user_deleteicon'
                                                        onClick={() => { setAssignedNumber(true); setSelectedUser(user); }} />
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

                {assignedNumber && (
                    <AssignedUserNumberModal
                        setAssignedNumber={setAssignedNumber}
                        selectedUser={selectedUser}
                        setSelectedUser={setSelectedUser}
                    />
                )}

            </div>
        </div>
    );
};

export default Users;
