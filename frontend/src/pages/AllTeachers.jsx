import React, { useEffect, useState } from "react";
import api from "../api/api";

const AllTeachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await api.get("/users/teachers");
        setTeachers(response.data);
      } catch (error) {
        console.error("Failed to fetch teachers");
      }
    };
    fetchTeachers();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        All Teachers
      </h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-white uppercase bg-gray-800">
            <tr>
              <th className="px-6 py-3 border-b border-gray-200">#</th>
              <th className="px-6 py-3 border-b border-gray-200">Name</th>
              <th className="px-6 py-3 border-b border-gray-200">Email</th>
              <th className="px-6 py-3 border-b border-gray-200">Role</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr
                key={teacher._id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                <td className="px-6 py-4 border-b border-gray-200 text-center">
                  {index + 1}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 font-medium text-gray-900">
                  {teacher.name}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-500">
                  {teacher.email}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-green-600">
                  Teacher
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTeachers;
