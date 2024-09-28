import React, { useEffect, useState } from "react";
import api from "../api/api"; // Assuming this is the axios instance with the baseURL and token

const AllCoursesForStudents = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses"); // Fetch all courses
        setCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };

    const fetchEnrolledCourses = async () => {
      try {
        const response = await api.get("/courses/student/enrolled"); // Fetch enrolled courses
        setEnrolledCourses(response.data.map((course) => course._id)); // Store enrolled course IDs
      } catch (error) {
        console.error("Failed to fetch enrolled courses", error);
      }
    };

    fetchCourses();
    fetchEnrolledCourses();
    setLoading(false);
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      await api.post(`/courses/${courseId}/enroll`); // Enroll student in the course
      setEnrolledCourses([...enrolledCourses, courseId]); // Add course to the enrolled list
      alert("You have successfully enrolled in the course.");
    } catch (error) {
      console.error("Failed to enroll in course", error);
      alert("Failed to enroll in the course.");
    }
  };

  if (loading) {
    return <p>Loading courses...</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">All Available Courses</h1>
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
            <p>Teacher: {course.teacher?.name || "Unknown"}</p>

            <div className="mt-4">
              {enrolledCourses.includes(course._id) ? (
                <button
                  disabled
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                >
                  Already Enrolled
                </button>
              ) : (
                <button
                  onClick={() => handleEnroll(course._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Enroll
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCoursesForStudents;
