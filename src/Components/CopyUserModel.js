
// import React, { useState, useEffect } from 'react';
import crossIcon from "../assets/crossIcon.png";
import '../styles/AddUserModel.css';
// import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

// import api from '../Components/Api';

const CopyUserModal = ({
    selectedUser,
    handleChange,
    createUser,
    setCopyUser,
    handleCreateUser,
}

) => {

    console.log(selectedUser);



    return (
        <div className="user_container_model">
            <form onSubmit={handleCreateUser}>
                <div className="user_model_container">
                    <div className="user_model_title">
                        <h3>Copy User</h3>
                        <img
                            src={crossIcon}
                            alt="back"
                            className="model_cross_icon"
                            onClick={() => setCopyUser(false)}
                        />
                    </div>

                    <div className="user_content_container_model_copy_model">
                        <div className="copy_model_form">

                            <div className="user_name_email_model_container">
                                <div className="user_name_email_model">
                                    <label>
                                        Source User Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={selectedUser?.name || ''}
                                        readOnly

                                    />
                                </div>
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

                            </div>

                            <div className="user_name_email_model_container">
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
                            </div>
                        </div>
                        {/* Buttons */}
                        <div className="copy_model_button_container">
                            <button className="model_btn_can" onClick={() => setCopyUser(false)}>
                                Cancel
                            </button>
                            <button className="model_btn_sub">
                                Copy User
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CopyUserModal;
