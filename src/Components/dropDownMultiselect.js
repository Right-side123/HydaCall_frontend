import React from "react";
import Select from "react-select";
import crossIcon from "../assets/crossIcon.png";

const AddUserModal = ({
  createUser,
  setCreateUser,
  department,
  handleChange,
  handleSubmit,
  setAddUser,
}) => {
  // ✅ Department options (multi-select)
  const departmentOptions = department.map((dept) => ({
    value: dept.id,
    label: dept.name,
  }));

  console.log(department);

  // ✅ Reports options
  const reportsOptions = [
    { value: "Report A", label: "Report A" },
    { value: "Report B", label: "Report B" },
    { value: "Report C", label: "Report C" },
  ];

  // ✅ Phone options
  const phoneOptions = [
    { value: "SIM 1", label: "SIM 1" },
    { value: "SIM 2", label: "SIM 2" },
  ];

  return (
    <div className="user_container_model">
      <div className="user_model_container">
        <div className="user_model_title">
          <h3>Add User</h3>
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
                {department.map((dept) => (
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

              <Select
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
              />

            </div>
            <div className="user_name_email_model">
              <p>
                Phone Numbers <span style={{ color: "red" }}>*</span>
              </p>
              <Select
                options={phoneOptions}
                value={phoneOptions.find(
                  (opt) => opt.value === createUser.phone_number
                )}
                onChange={(selected) =>
                  setCreateUser({ ...createUser, phone_number: selected.value })
                }
                placeholder="Select Phone"
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
              <Select
                isMulti
                options={reportsOptions}
                value={reportsOptions.filter((opt) =>
                  createUser.allowed_reports.includes(opt.value)
                )}
                onChange={(selected) =>
                  setCreateUser({
                    ...createUser,
                    allowed_reports: selected.map((s) => s.value),
                  })
                }
                placeholder={
                  createUser.allowed_reports.length > 0
                    ? `${createUser.allowed_reports.length} items selected`
                    : "Select Reports"
                }
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
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
