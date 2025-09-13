
import React, { useState, useEffect } from 'react';
// import Select from "react-select";
import crossIcon from "../assets/crossIcon.png";

import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import api from './Api';

const EditUserModal = ({
    error,
    selectedUser,
    setSelectedUser,
    setEditUser,
    handleChange,
    handleUpdateUser,
}) => {
    // ✅ Department options (multi-select)
    // const departmentss = departments.map((dept) => ({
    //   value: dept.id,
    //   label: dept.name,
    // }));

    // console.log(departmentss);

    const [departments, setDepartments] = useState([]);
    // const [editUser, setEditUser] = useState(false);

    // const [selectedUser, setSelectedUser] = useState(null);
    // const [error, setError] = useState("");

    // const [selectedDepartments, setSelectedDepartments] = useState([]);

    // Reports options
    const reportsOptions = [
        { value: "Report A", label: "Report A" },
        { value: "Report B", label: "Report B" },
        { value: "Report C", label: "Report C" },
        { value: "Report D", label: "Report D" },
        { value: "Report E", label: "Report E" },
        { value: "Report F", label: "Report F" },
    ];

    //  Phone options
    const phoneOptions = [
        { value: "9999999999", label: "9999999999" },
        { value: "8888888888", label: "8888888888" },
        { value: "7777777777", label: "7777777777" },
        { value: "6666666666", label: "6666666666" },
    ];


    const fetchDepartments = async () => {
        try {
            const res = await api.get("/department");
            // console.log(res);

            setDepartments(res.data);
            // console.log(res);

        } catch (err) {
            console.error("Error fetching users:", err);
        }
    }



    useEffect(() => {
        fetchDepartments();

    }, []);


    // const handleUpdateUser = async () => {
    //     if (!createUser.name || createUser.name.trim() === "") {
    //         setError("User name is required");
    //         return;
    //     }

    //     try {
    //         await api.put(`/user/${createUser.id}`, createUser);
    //         fetchUsers();
    //         setEditUser(false);
    //         setError("");
    //     } catch (err) {
    //         console.error("Error updating user", err);
    //     }
    // };




    return (
        <div className="user_container_model">
            <div className="user_model_container">
                <div className="user_model_title">
                    <h3>Edit User</h3>
                    <img
                        src={crossIcon}
                        alt="back"
                        className="model_cross_icon"
                        onClick={() => setEditUser(false)}
                    />
                </div>

                <div className="user_content_container_model">
                    {/* Name & Email */}
                    <div className="user_name_email_model_container">
                        <div className="user_name_email_model">
                            <label>
                                Name <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={selectedUser.name}
                                onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                                required
                            />
                            {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
                        </div>
                        <div className="user_name_email_model">
                            <label>
                                Email <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={selectedUser.email}
                                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    {/* Password & Department */}
                    <div className="user_name_email_model_container">
                        <div className="user_name_email_model">
                            <label>
                                Password <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={selectedUser.password}
                                onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
                                required
                            />
                        </div>
                        <div className="user_name_email_model">
                            <p>
                                Department <span style={{ color: "red" }}>*</span>
                            </p>
                            <select
                                name="department_id"
                                value={selectedUser.department_id}
                                onChange={(e) => setSelectedUser({ ...selectedUser, department_id: e.target.value })}
                                required
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

                    {/* Allowed Department & Phone */}
                    <div className="user_name_email_model_container">
                        <div className="user_name_email_model">
                            <p>
                                Allowed Department <span style={{ color: "red" }}>*</span>


                            </p>

                            <MultiSelect
                                value={Array.isArray(selectedUser.allowed_departments) ? selectedUser.allowed_departments : []}
                                onChange={(e) =>
                                    setSelectedUser({ ...selectedUser, allowed_departments: e.value })
                                }
                                options={departments}
                                optionLabel="name"
                                optionValue="name"
                                placeholder={
                                    selectedUser.allowed_departments?.length > 0
                                        ? `${selectedUser.allowed_departments.length} items selected`
                                        : " "
                                }
                                filter
                                display="chip"
                                className="w-full md:w-20rem multiselect_option"
                            />



                        </div>
                        <div className="user_name_email_model">
                            <p>
                                Phone Numbers <span style={{ color: "red" }}>*</span>
                            </p>
                            <MultiSelect
                                value={Array.isArray(selectedUser.phone_number) ? selectedUser.phone_number : []}
                                onChange={(e) =>
                                    setSelectedUser({ ...selectedUser, phone_number: e.value })
                                }
                                options={phoneOptions}
                                optionLabel="label"
                                optionValue="value"
                                filter
                                display="chip"
                                placeholder={
                                    selectedUser.phone_number?.length > 0
                                        ? `${selectedUser.phone_number.length} items selected`
                                        : ''
                                }
                                className="w-full md:w-20rem multiselect_option"
                            />



                        </div>
                    </div>

                    {/* Status & Expiry */}
                    <div className="user_name_email_model_container">
                        <div>
                            <label>
                                Status <span style={{ color: "red" }}>*</span>
                            </label>
                            <div className="user_model_active_inactive">
                                <div className="user_model_active_inactive_radio">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="Inactive"
                                        checked={selectedUser.status === "Inactive"}
                                        onChange={(e) =>
                                            setSelectedUser({ ...selectedUser, status: e.target.value })
                                        }
                                    />{" "}
                                    Inactive
                                </div>
                                <div className="user_model_active_inactive_radio">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="Active"
                                        checked={selectedUser.status === "Active"}
                                        onChange={(e) =>
                                            setSelectedUser({ ...selectedUser, status: e.target.value })
                                        }
                                    />{" "}
                                    Active
                                </div>
                            </div>
                        </div>
                        <div className="user_name_email_model">
                            <label>
                                Password Expire In (Days)
                                <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                type="number"
                                name="password_expire_days"
                                value={selectedUser.password_expire_days}
                                onChange={(e) =>
                                    setSelectedUser({
                                        ...selectedUser,
                                        password_expire_days: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                    </div>

                    {/* Date Format & Reports */}
                    <div className="user_name_email_model_container">
                        <div className="user_name_email_model">
                            <label>
                                Preferred Date Format<span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                                name="date_format"
                                value={selectedUser.date_format}
                                onChange={(e) =>
                                    setSelectedUser({ ...selectedUser, date_format: e.target.value })
                                }
                            >
                                <option value=""></option>
                                <option value="YYYY/MM/DD">YYYY/MM/DD - 2025/08/25</option>
                                <option value="DD/MM/YYYY">DD/MM/YYYY - 25/08/2025</option>
                                <option value="MM/DD/YYYY">MM/DD/YYYY - 08/25/2025</option>
                            </select>
                        </div>
                        <div className="user_name_email_model">
                            <label>
                                Allowed Reports<span style={{ color: "red" }}>*</span>
                            </label>
                            <MultiSelect
                                value={Array.isArray(selectedUser.allowed_reports) ? selectedUser.allowed_reports : []}
                                onChange={(e) =>
                                    setSelectedUser({ ...selectedUser, allowed_reports: e.value })
                                }
                                options={reportsOptions}
                                optionLabel="label"
                                optionValue="value"
                                filter
                                display="chip"
                                className="w-full md:w-20rem multiselect_option"
                            />


                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="model_btn_container">
                    <button className="model_btn_can" onClick={() => setEditUser(false)}>
                        Cancel
                    </button>
                    <button className="model_btn_sub" onClick={handleUpdateUser}>
                        Update User
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;
