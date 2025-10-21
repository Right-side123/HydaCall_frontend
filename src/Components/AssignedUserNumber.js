import crossIcon from "../assets/crossIcon.png";
import '../styles/AddUserModel.css';
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import searchicon from '../assets/searchicon.png';
import { useState } from "react";
import api from '../Components/Api';
import { useEffect } from "react";

const AssignedUserNumberModal = ({
    selectedUser,
    setAssignedNumber,
}
) => {

    const [search, setSearch] = useState('');
    const [simNumbers, setSimNumbers] = useState([]);



    const filteredSimNumbers = simNumbers.filter((sim) =>
        sim.SIM_Number.toString().includes(search) ||
        sim.Name.toLowerCase().includes(search.toLowerCase())
    );



    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    // Calculate indexes
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Apply search + pagination together
    const currentNumbers = filteredSimNumbers.slice(indexOfFirstItem, indexOfLastItem);

    // Total pages
    const totalPages = Math.ceil(filteredSimNumbers.length / itemsPerPage);
    useEffect(() => {
        setCurrentPage(1);
    }, [search]);


    const fetchSimDetails = async (userId) => {
        try {
            const res = await api.get(`/usersnumber/${userId}`);
            setSimNumbers(res.data);
        } catch (err) {
            console.error(err);
            setSimNumbers([]);
        }
    };


    useEffect(() => {
        if (selectedUser?.id) {
            fetchSimDetails(selectedUser.id);
        }
    }, [selectedUser]);

    // console.log(error);
    // console.log(loding);
    // console.log(simNumbers);

    return (
        <div className="user_container_model">
            <div className="user_model_container">
                <div className="user_model_title">
                    <h3> {selectedUser.name} - Assigned Phone Numbers</h3>
                    <img
                        src={crossIcon}
                        alt="back"
                        className="model_cross_icon"
                        onClick={() => setAssignedNumber(false)}
                    />
                </div>
                <div className="assined_phone_number_content_container">
                    <div className='assined_phone_number_search_box_container'>
                        <img src={searchicon} alt='search' className='searchicon' />
                        <input type='text'
                            placeholder='Search'
                            className='search_box'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="assined_phone_number_table_container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Name</th>
                                    <th>SIM Number</th>
                                    <th>Department Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentNumbers && currentNumbers.length > 0 ? (
                                    currentNumbers.map((sim, index) => (
                                        <tr key={sim.id}>
                                            <td>{indexOfFirstItem + index + 1}</td>
                                            <td>{sim.Name}</td>
                                            <td>{sim.SIM_Number}</td>
                                            <td>{sim.Department}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: "center" }}>No SIM numbers found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
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
                            disabled={currentPage === totalPages || totalPages === 0}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default AssignedUserNumberModal;
