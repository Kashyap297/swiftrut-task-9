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
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">All Teachers</h1>
      <div className="grid grid-cols-1 gap-4">
        {teachers.map((teacher) => (
          <div
            key={teacher._id}
            className="bg-white p-4 rounded-lg shadow-md border"
          >
            <h2 className="text-xl font-bold">{teacher.name}</h2>
            <p>Email: {teacher.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTeachers;
