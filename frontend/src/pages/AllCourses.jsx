import React, { useEffect, useState } from "react";
import api from "../api/api";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch courses");
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">All Courses</h1>
      <div className="grid grid-cols-1 gap-4">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white p-4 rounded-lg shadow-md border"
          >
            <h2 className="text-xl font-bold">{course.title}</h2>
            <p>Description: {course.description}</p>
            <p>
              Start Date: {new Date(course.startDate).toLocaleDateString()} -
              End Date: {new Date(course.endDate).toLocaleDateString()}
            </p>
            <p>Teacher: {course.teacher?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
