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
      <ul>
        {students.map((student) => (
          <li key={student._id} className="mb-2">
            {student.name} ({student.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllStudents;
