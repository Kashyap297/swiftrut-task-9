import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const { data } = await api.get("/courses/student/enrolled");
      setCourses(data);
      setLoading(false);
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
      ) : courses.length === 0 ? (
        <p className="text-center text-lg text-gray-500">
          You have not enrolled in any courses yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="mt-6">
                <Link
                  to={`/course/${course._id}/grades`}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 block text-center"
                >
                  View Grade
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
