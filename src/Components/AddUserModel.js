import React, { useState } from 'react';
import crossIcon from '../assets/crossIcon.png';
const AddUserModal = ({ setAddUser }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        department: "",
        allowedDepartment: "",
        phoneNumbers: [],
        status: "Active",
        passwordExpire: "",
        dateFormat: "",
        allowedReports: []
    });

    const reportsList = [
        "Call Summary Report",
        "Analysis Report",
        "Hourly Analysis Report",
        "Day Wise Analysis Report",
        "Never Attended Report",
        "Not Pickup By Client Report"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleReportChange = (report) => {
        setFormData((prev) => {
            const alreadySelected = prev.allowedReports.includes(report);
            return {
                ...prev,
                allowedReports: alreadySelected
                    ? prev.allowedReports.filter((r) => r !== report)
                    : [...prev.allowedReports, report],
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data: ", formData);


        if (!formData.name || !formData.email || !formData.password) {
            alert("Please fill all required fields");
            return;
        }

        setAddUser(false);
    };

    return (
        <div className="main_container_model">
            <div className="department_model_container">
                <div className="department_model_title">
                    <h3>Add User</h3>
                    <img
                        src={crossIcon}
                        alt="close"
                        className="model_cross_icon"
                        onClick={() => setAddUser(false)}
                    />
                </div>

                <form onSubmit={handleSubmit} className="mainphonemodel">
                    {/* Name & Email */}
                    <div className="phone_model_content">
                        <div className="phone_model_input_container">
                            <label>Name <span style={{ color: 'red' }}>*</span></label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="phone_model_input_container">
                            <label>Email <span style={{ color: 'red' }}>*</span></label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Password & Department */}
                    <div className="phone_model_content">
                        <div className="phone_model_input_container">
                            <label>Password <span style={{ color: 'red' }}>*</span></label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="phone_model_input_container">
                            <label>Department <span style={{ color: 'red' }}>*</span></label>
                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select</option>
                                <option>Admin</option>
                                <option>DWS HR</option>
                                <option>Noida H.R</option>
                                <option>Outreach (Noida)</option>
                            </select>
                        </div>
                    </div>

                    {/* Allowed Dept & Phone Numbers */}
                    <div className="phone_model_content">
                        <div className="phone_model_input_container">
                            <label>Allowed Department <span style={{ color: 'red' }}>*</span></label>
                            <select
                                name="allowedDepartment"
                                value={formData.allowedDepartment}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select</option>
                                <option>Admin</option>
                                <option>DWS HR</option>
                                <option>Noida H.R</option>
                                <option>Outreach (Noida)</option>
                            </select>
                        </div>
                        <div className="phone_model_input_container">
                            <label>Phone Numbers <span style={{ color: 'red' }}>*</span></label>
                            <select
                                name="phoneNumbers"
                                value={formData.phoneNumbers}
                                onChange={handleChange}
                                multiple
                                required
                            >
                                <option>SIM 1</option>
                                <option>SIM 2</option>
                            </select>
                        </div>
                    </div>

                    {/* Status & Expire Days */}
                    <div className="phone_model_content">
                        <div className="phone_model_input_container">
                            <label>Status <span style={{ color: 'red' }}>*</span></label>
                            <div>
                                <input
                                    type="radio"
                                    name="status"
                                    value="Active"
                                    checked={formData.status === "Active"}
                                    onChange={handleChange}
                                /> Active
                                <input
                                    type="radio"
                                    name="status"
                                    value="Inactive"
                                    checked={formData.status === "Inactive"}
                                    onChange={handleChange}
                                /> Inactive
                            </div>
                        </div>
                        <div className="phone_model_input_container">
                            <label>Password Expire In (Days)<span style={{ color: 'red' }}>*</span></label>
                            <input
                                type="number"
                                name="passwordExpire"
                                value={formData.passwordExpire}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Date format & Reports */}
                    <div className="phone_model_content">
                        <div className="phone_model_input_container">
                            <label>Preferred Date Format <span style={{ color: 'red' }}>*</span></label>
                            <select
                                name="dateFormat"
                                value={formData.dateFormat}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select</option>
                                <option>YYYY/MM/DD - 2025/08/26</option>
                                <option>DD/MM/YYYY - 26/08/2025</option>
                                <option>MM/DD/YYYY - 08/26/2025</option>
                            </select>
                        </div>
                        <div className="phone_model_input_container">
                            <label>Allowed Reports <span style={{ color: 'red' }}>*</span></label>
                            <div className="reports-list">
                                {reportsList.map((report, idx) => (
                                    <div key={idx}>
                                        <input
                                            type="checkbox"
                                            checked={formData.allowedReports.includes(report)}
                                            onChange={() => handleReportChange(report)}
                                        />
                                        {report}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="model_btn_container">
                        <button
                            type="button"
                            className="model_btn_can"
                            onClick={() => setAddUser(false)}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="model_btn_sub">
                            Add User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserModal;
