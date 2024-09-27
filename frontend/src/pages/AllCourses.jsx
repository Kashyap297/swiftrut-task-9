import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

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

  const handleEdit = (courseId) => {
    // Navigate to an Edit Course page (you'll need to create this page)
    navigate(`/edit-course/${courseId}`);
  };

  const handleDelete = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await api.delete(`/courses/${courseId}`);
        setCourses(courses.filter((course) => course._id !== courseId));
        alert("Course deleted successfully");
      } catch (error) {
        console.error("Failed to delete course", error);
        alert("Failed to delete course");
      }
    }
  };

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

            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleEdit(course._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(course._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
