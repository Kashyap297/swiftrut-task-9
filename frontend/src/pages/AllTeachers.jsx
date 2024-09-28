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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Teachers</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2 border border-gray-300">#</th>
              <th className="px-4 py-2 border border-gray-300">Name</th>
              <th className="px-4 py-2 border border-gray-300">Email</th>
              <th className="px-4 py-2 border border-gray-300">Role</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr
                key={teacher._id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                } hover:bg-gray-200`}
              >
                <td className="px-4 py-2 border border-gray-300 text-center">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {teacher.name}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {teacher.email}
                </td>
                <td className="px-4 py-2 border border-gray-300">Teacher</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTeachers;
