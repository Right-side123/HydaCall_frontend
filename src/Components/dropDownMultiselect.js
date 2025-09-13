
import React, { useState, useEffect } from 'react';
// import Select from "react-select";
import crossIcon from "../assets/crossIcon.png";

import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import api from '../Components/Api';

const AddUserModal = ({
  mode,
  createUser,
  setCreateUser,
  handleChange,
  handleSubmit,
  setAddUser,
}) => {
  // ✅ Department options (multi-select)
  // const departmentss = departments.map((dept) => ({
  //   value: dept.id,
  //   label: dept.name,
  // }));

  // console.log(departmentss);

  const [departments, setDepartments] = useState([]);

  // const [selectedDepartments, setSelectedDepartments] = useState([]);

  // Reports options
  const reportsOptions = [
    { value: "Report A", label: "Report A" },
    { value: "Report B", label: "Report B" },
    { value: "Report C", label: "Report C" },
  ];

  //  Phone options
  const phoneOptions = [
    { value: "SIM 1", label: "SIM 1" },
    { value: "SIM 2", label: "SIM 2" },
  ];


  const fetchDepartments = async () => {
    try {
      const res = await api.get("/department");
      setDepartments(res.data);
    } catch (err) {
      console.error("Error fetching department:", err);
    }
  }

  useEffect(() => {
    fetchDepartments();
  }, []);



  return (
    <div className="user_container_model">
      <div className="user_model_container">
        <div className="user_model_title">
          {/* <h3>Add User</h3> */}
          <h3>{mode === "edit" ? "Edit User" : "Add User"}</h3>
          <img
            src={crossIcon}
            alt="back"
            className="model_cross_icon"
            onClick={() => setAddUser(false)}
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
                value={createUser.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="user_name_email_model">
              <label>
                Email <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={createUser.email}
                onChange={handleChange}
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
                value={createUser.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="user_name_email_model">
              <p>
                Department <span style={{ color: "red" }}>*</span>
              </p>
              <select
                name="department_id"
                value={createUser.department_id}
                onChange={handleChange}
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

              {/* <Select
                isMulti
                options={departmentOptions}
                value={departmentOptions.filter((opt) =>
                  createUser.allowed_departments.includes(opt.value)
                )}
                onChange={(selected) =>
                  setCreateUser({
                    ...createUser,
                    allowed_departments: selected.map((s) => s.value),
                  })
                }
                placeholder={
                  createUser.allowed_departments.length > 0
                    ? `${createUser.allowed_departments.length} items selected`
                    : "Select Departments"
                }
                isSearchable={false}
                menuPlacement="auto"
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 })
                }}
              /> */}

              <MultiSelect
                value={Array.isArray(createUser.allowed_departments) ? createUser.allowed_departments : []}
                onChange={(e) =>
                  setCreateUser({ ...createUser, allowed_departments: e.value })
                }
                options={departments}
                optionLabel="name"
                optionValue="name"
                placeholder={
                  createUser.allowed_departments?.length > 0
                    ? `${createUser.allowed_departments.length} items selected`
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
                value={Array.isArray(createUser.phone_number) ? createUser.phone_number : []}
                onChange={(e) =>
                  setCreateUser({ ...createUser, phone_number: e.value })
                }
                options={phoneOptions}
                optionLabel="label"
                optionValue="value"
                filter
                display="chip"
                placeholder={
                  createUser.phone_number?.length > 0
                    ? `${createUser.phone_number.length} items selected`
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
                    checked={createUser.status === "Inactive"}
                    onChange={(e) =>
                      setCreateUser({ ...createUser, status: e.target.value })
                    }
                  />{" "}
                  Inactive
                </div>
                <div className="user_model_active_inactive_radio">
                  <input
                    type="radio"
                    name="status"
                    value="Active"
                    checked={createUser.status === "Active"}
                    onChange={(e) =>
                      setCreateUser({ ...createUser, status: e.target.value })
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
                value={createUser.password_expire_days}
                onChange={(e) =>
                  setCreateUser({
                    ...createUser,
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
                value={createUser.date_format}
                onChange={(e) =>
                  setCreateUser({ ...createUser, date_format: e.target.value })
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
                value={Array.isArray(createUser.allowed_reports) ? createUser.allowed_reports : []}
                onChange={(e) =>
                  setCreateUser({ ...createUser, allowed_reports: e.value })
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
          <button className="model_btn_can" onClick={() => setAddUser(false)}>
            Cancel
          </button>
          <button className="model_btn_sub" onClick={handleSubmit}>
            {mode === "edit" ? "Update User" : "Add User"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
