import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';

const EmployeePage = () => {
    const { logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const employees = [
        { id: 1, name: "Shivam Mandal", role: "Developer", salary: "5000" },
        { id: 2, name: "Navin kumar", role: "Designer", salary: "4500" },
        { id: 3, name: "Vicky Raj", role: "Product Manager", salary: "6000" },
        { id: 4, name: "Rajeev Ranjan", role: "Marketing Specialist", salary: "4000" },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-violet-100">
            <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-4xl">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Employee List</h2>
                <table className="w-full border-collapse mb-6 rounded-2xl">
                    <thead className='bg-violet-300'>
                        <tr>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Role</th>
                            <th className="border px-4 py-2">Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length > 0 ? (
                            employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td className="border px-4 py-2">{employee.name}</td>
                                    <td className="border px-4 py-2">{employee.role}</td>
                                    <td className="border px-4 py-2">Rs.{employee.salary}.00</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="border px-4 py-2 text-center">No employees found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="text-center">
                    <button
                        onClick={handleLogout}
                        className="bg-violet-400 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeePage;
