import React, { useEffect, useState } from "react";
import { fetchCourses } from "../services/CourseService";

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const loadCourses = async () => {
      const courseData = await fetchCourses();
      setCourses(courseData);
    };
    loadCourses();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Teacher Dashboard</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Assigned Courses</h2>
        <ul>
          {courses.map((course) => (
            <li key={course._id} className="border p-4 mb-2 rounded-lg">
              {course.title} - {course.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeacherDashboard;
