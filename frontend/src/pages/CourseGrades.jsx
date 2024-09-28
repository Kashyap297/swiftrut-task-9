import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

const CourseGrades = () => {
  const { id } = useParams(); // Get the course ID from the URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseGrades = async () => {
      try {
        const response = await api.get(`/course/${id}/grades`);
        setCourse(response.data); // Assuming this returns the course and grades data
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch course grades.");
        setLoading(false);
      }
    };

    fetchCourseGrades();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!course) {
    return <p className="text-red-500">Course data not found.</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">{course.title}</h1>
      <p className="text-lg mb-4">{course.description}</p>
      <h2 className="text-2xl font-semibold mb-4">Grades</h2>

      {course.grades && course.grades.length > 0 ? (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Student</th>
              <th className="py-2 px-4 border-b">Grade</th>
            </tr>
          </thead>
          <tbody>
            {course.grades.map((grade, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{grade.student.name}</td>
                <td className="py-2 px-4 border-b">{grade.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No grades available for this course.</p>
      )}
    </div>
  );
};

export default CourseGrades;
