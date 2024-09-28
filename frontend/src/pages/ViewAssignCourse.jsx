import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link to navigate to course details page
import api from "../api/api"; // Assuming this is the axios instance with the baseURL and token

const ViewAssignCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignedCourses = async () => {
      try {
        const response = await api.get("/courses/teacher/courses");
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch assigned courses.");
        setLoading(false);
      }
    };

    fetchAssignedCourses();
  }, []);

  if (loading) return <p>Loading assigned courses...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Assigned Courses</h1>
      <div className="grid grid-cols-1 gap-4">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white p-6 rounded-lg shadow-md border"
          >
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="text-gray-700 mb-2">{course.description}</p>
            <p className="text-sm text-gray-500">
              Start Date: {new Date(course.startDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              End Date: {new Date(course.endDate).toLocaleDateString()}
            </p>
            <p className="mt-2 text-gray-700">
              <strong>Enrolled Students:</strong> {course.students.length}
            </p>
            {/* Add See Details button */}
            <Link
              to={`/courses/${course._id}`} // Pass course ID in the URL
              className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              See Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAssignCourse;
