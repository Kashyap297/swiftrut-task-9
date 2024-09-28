import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Hook to get course ID from URL
import api from "../api/api"; // Assuming this is the axios instance with the baseURL and token

const CourseDetails = () => {
  const { id } = useParams(); // Get course ID from URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await api.get(`/courses/${id}`);
        setCourse(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch course details.");
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (loading) return <p>Loading course details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-8">
      {course && (
        <>
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-lg mb-4">{course.description}</p>
          <p className="text-sm text-gray-500">
            Start Date: {new Date(course.startDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500">
            End Date: {new Date(course.endDate).toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">
            Enrolled Students
          </h2>
          {course.students.length > 0 ? (
            <ul className="list-disc pl-6">
              {course.students.map((student) => (
                <li key={student._id} className="mb-2">
                  {student.name} ({student.email})
                </li>
              ))}
            </ul>
          ) : (
            <p>No students are enrolled in this course.</p>
          )}
        </>
      )}
    </div>
  );
};

export default CourseDetails;
