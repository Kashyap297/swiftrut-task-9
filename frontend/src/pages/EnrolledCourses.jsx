import React, { useState, useEffect } from "react";
import api from "../api/api";

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const { data } = await api.get("/courses/student/enrolled");
        setCourses(data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // If 404 error occurs, it means no courses are enrolled
          setCourses([]); // Empty courses array
        } else {
          setError("Failed to fetch enrolled courses. Please try again.");
        }
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Your Enrolled Courses
      </h1>
      {loading ? (
        <p className="text-center text-lg text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-lg text-red-500">{error}</p>
      ) : courses.length === 0 ? (
        <p className="text-center text-lg text-gray-500">
          You have not enrolled in any courses yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white shadow-lg rounded-lg p-6 border hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-4">{course.title}</h2>
              <p className="text-gray-700 mb-4">{course.description}</p>
              <p className="text-sm text-gray-500">
                Start Date: {new Date(course.startDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                End Date: {new Date(course.endDate).toLocaleDateString()}
              </p>

              {/* Show Grade if exists */}
              {course.grades && course.grades.length > 0 ? (
                <div className="mt-4">
                  <p className="text-lg text-green-600">
                    Grade: {course.grades[0].grade} marks given by{" "}
                    {course.teacher?.name}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-500 mt-4">
                  Grade not yet assigned.
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
