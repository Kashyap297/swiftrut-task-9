import React, { useEffect, useState } from "react";
import { fetchTeachers, fetchStudents } from "../services/UserService";

const AdminDashboard = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const teacherData = await fetchTeachers();
      const studentData = await fetchStudents();
      setTeachers(teacherData);
      setStudents(studentData);
    };

    loadData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Teachers</h2>
        <ul>
          {teachers.map((teacher) => (
            <li key={teacher._id} className="border p-4 mb-2 rounded-lg">
              {teacher.name} ({teacher.email})
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Students</h2>
        <ul>
          {students.map((student) => (
            <li key={student._id} className="border p-4 mb-2 rounded-lg">
              {student.name} ({student.email})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
