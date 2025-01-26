import React, { useState, useEffect } from "react";
import * as employeeService from '../services/api/employeeService.js';

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ fullName: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);  // State để điều khiển popup

  useEffect(() => {
    const fetchData = async () => {
      const data = await employeeService.getEmployee();
      setEmployees(data);
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const addedEmployee = await employeeService.createEmployee(newEmployee);
      setEmployees((prevEmployees) => [...prevEmployees, addedEmployee]);
      setNewEmployee({ fullName: "" });
      setShowPopup(false);  // Đóng popup sau khi thêm nhân viên
    } catch (error) {
      console.error("Error adding employee:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowPopup(true)}  // Hiển thị popup khi nhấn nút
        className="px-4 py-2 bg-blue-500 text-white"
      >
        Add Employee
      </button>

      {/* Popup Create Employee */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl mb-4">Create New Employee</h2>
            <form onSubmit={handleAddEmployee}>
              <input
                type="text"
                name="fullName"
                value={newEmployee.fullName}
                onChange={handleInputChange}
                placeholder="Enter full name"
                className="border px-4 py-2 w-full mb-4"
                required
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="ml-2 px-4 py-2 bg-blue-500 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Employee"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}  // Đóng popup khi nhấn Cancel
                  className="ml-2 px-4 py-2 bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="table-auto w-full border-collapse border border-gray-300 mt-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="border border-gray-300 px-4 py-2">{employee.id}</td>
              <td className="border border-gray-300 px-4 py-2">{employee.fullName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeePage;