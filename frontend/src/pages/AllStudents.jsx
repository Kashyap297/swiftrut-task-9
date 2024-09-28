import React, { useEffect, useState } from "react";
import api from "../api/api"; // Assuming this is the axios instance with the baseURL and token

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get("/users/students");
        setStudents(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch students.");
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Students</h2>
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
            {students.map((student, index) => (
              <tr
                key={student._id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                } hover:bg-gray-200`}
              >
                <td className="px-4 py-2 border border-gray-300 text-center">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {student.name}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {student.email}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {student.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllStudents;
