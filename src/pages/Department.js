import React, { useEffect, useState } from 'react';
import '../styles/Department.css';
import Layout from '../Components/Layout';
import departmenticon from '../assets/department.png';
import searchicon from '../assets/searchicon.png';
import editicon from '../assets/editIcon.png';
import deleteicon from '../assets/deleteIcon.png';
import crossIcon from '../assets/crossIcon.png';
import Sidebar from '../Components/Sidebar';
import api from '../Components/Api';

const Department = () => {

    const [model, setModel] = useState(false);
    const [editDepartment, setEditDepartment] = useState(false);
    const [search, setSearch] = useState('');
    const [department, setDepartment] = useState([]);
    const [createDepartment, setCreateDepartment] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [error, setError] = useState("");


    const filteredDepartments = department.filter((dept) =>
        dept.name.toLowerCase().includes(search.toLowerCase())
    );


    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calculate indexes
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Apply search + pagination together
    const currentDepartments = filteredDepartments.slice(indexOfFirstItem, indexOfLastItem);

    // Total pages
    const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);


    const fetchDepartments = async () => {
        try {
            const res = await api.get("/department");
            setDepartment(res.data);
        } catch (err) {
            console.log("Error fetching department:", err);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);


    // Create Department Handler


    const handleCreateDepartment = async (e) => {
        e.preventDefault();

        if (!createDepartment) {
            setError("Department name is required!");
            return;
        }

        try {
            await api.post("/department", { name: createDepartment });
            setModel(false);
            setCreateDepartment("");
            fetchDepartments();
            setError("");
        } catch (error) {
            setError("Failed to create department")
        }
    };



    // Edit Department Handler
    const handleUpdateDepartment = async () => {
        if (!selectedDepartment.name || selectedDepartment.name.trim() === "") {
            setError("Department name is required");
            return;
        }

        try {
            await api.put(`/department/${selectedDepartment.id}`, {
                name: selectedDepartment.name

            });
            setEditDepartment(false);
            fetchDepartments();
            setError("");
        } catch (err) {
            console.error("Error updating department", err);
        }
    };

    // Delete Department Handler

    const handleDeleteDepartment = async (id) => {
        try {
            await api.delete(`/department/${id}`)
            fetchDepartments();
        }
        catch (err) {
            console.error("Error deleteing department", err);

        }
    };

    const handleCloseModel = () => {
        setModel(false);
        setError("");
        setCreateDepartment("");
    };


    // const filterDepartment = department.filter(department =>
    //     department.departmentname.toLowerCase().includes(search.toLowerCase()) ||
    //     department.agentmobile.includes(search)
    // );

    // Filtered data (search applied)




    return (
        <div className='main-layout'>
            <Sidebar />

            <div className='page-content'>
                <div className="department_titel_container">
                    <h1 className='department_title'>DEPARTMENT</h1>
                    <Layout></Layout>
                </div>
                <div className='department_second_container'>
                    <div className='department_second_container_top'>
                        <h3>Department</h3>
                        <div className='department_second_container_top_right'>
                            <div className='search_box_container'> <img src={searchicon} alt='search' className='searchicon' />
                                <input
                                    type='text'
                                    placeholder='Search'
                                    className='search_box'
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)} />
                            </div>
                            {/* <div className='add_dept_btn_container'> */}

                            <button className='add_dept_btn' onClick={() => setModel(true)}>     <img src={departmenticon} alt='department' className='dept_icon' />Add Department</button>
                            {/* </div> */}

                        </div>
                    </div>
                    <div className='main_container_table'>
                        <table>
                            <thead className=' table_heading'>
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {/* <tbody className='table_body'>
                                {department.map((dept, index) => (
                                    <tr key={dept.id}>
                                        <td>{index + 1}</td>
                                        <td>{dept.name}</td>
                                        <td >
                                            <div className='action_icons'>
                                                <img src={editicon} alt='edit' className='editicon' onClick={() => { setEditDepartment(true); setSelectedDepartment(dept); }} />
                                                <span className='divider'></span>
                                                <img src={deleteicon} alt='delete' className='deleteicon' onClick={() => { handleDeleteDepartment(dept.id) }} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody> */}

                            <tbody className='table_body'>
                                {currentDepartments.map((dept, index) => (
                                    <tr key={dept.id}>
                                        <td>{indexOfFirstItem + index + 1}</td>
                                        <td>{dept.name}</td>
                                        <td>
                                            <div className='action_icons'>
                                                <img
                                                    src={editicon}
                                                    alt='edit'
                                                    className='editicon'
                                                    onClick={() => { setEditDepartment(true); setSelectedDepartment(dept); }}
                                                />
                                                <span className='divider'></span>
                                                <img
                                                    src={deleteicon}
                                                    alt='delete'
                                                    className='deleteicon'
                                                    onClick={() => { handleDeleteDepartment(dept.id) }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
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


                {/* model add department */}

                {model && (
                    <div className='main_container_model'>
                        <div className='department_model_container'>
                            <div className='department_model_title'>
                                <h3>Create Department</h3>
                                <img src={crossIcon} alt='back' className='model_cross_icon' onClick={handleCloseModel} />
                            </div>
                            <div className='model_input_container'>
                                <label>Name <span style={{ color: 'red' }}>*</span></label>
                                <input type='text' name='name'
                                    value={createDepartment || ""}
                                    onChange={(e) => {
                                        setCreateDepartment(e.target.value);
                                        setError("");
                                    }} required />
                                {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
                            </div>
                            <div className='model_btn_container'>

                                <button className='model_btn_can' onClick={handleCloseModel}>Cancel</button>
                                <button className='model_btn_sub' onClick={handleCreateDepartment}>Create</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* model update department */}

                {editDepartment && (
                    <div className='main_container_model'>
                        <div className='department_model_container'>
                            <div className='department_model_title'>
                                <h3>Edit Department</h3>
                                <img src={crossIcon} alt='back' className='model_cross_icon' onClick={() => { setEditDepartment(false); setError("") }} />
                            </div>
                            <div className='model_input_container'>
                                <label>Name <span style={{ color: 'red' }}>*</span></label>
                                <input
                                    type='text'
                                    name='name'
                                    required
                                    value={selectedDepartment?.name || ""}
                                    onChange={(e) => {
                                        setSelectedDepartment({ ...selectedDepartment, name: e.target.value });
                                        setError("");
                                    }} />
                                {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
                            </div>
                            <div className='model_btn_container'>

                                <button className='model_btn_can' onClick={() => { setEditDepartment(false); setError("") }}>Cancel</button>

                                <button className='model_btn_sub' onClick={handleUpdateDepartment}>Update</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Department;
