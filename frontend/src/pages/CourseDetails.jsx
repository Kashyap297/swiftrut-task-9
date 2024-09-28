import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Hook to get course ID from URL
import api from "../api/api"; // Assuming this is the axios instance with the baseURL and token

const CourseDetails = () => {
  const { id } = useParams(); // Get course ID from URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editGrade, setEditGrade] = useState(null); // Track which student's grade is being edited
  const [grades, setGrades] = useState({}); // To store grades dynamically for each student
  const [successMessage, setSuccessMessage] = useState(null);

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

  const handleGradeChange = (studentId, grade) => {
    setGrades({
      ...grades,
      [studentId]: grade, // Update the grade for the specific student
    });
  };

  const handleSaveGrade = async (studentId) => {
    try {
      const grade = grades[studentId];
      if (!grade) {
        setError("Please enter a grade");
        return;
      }
      await api.post(`/courses/${id}/assign-grade`, {
        studentId,
        grade,
      });
      setSuccessMessage("Grade assigned successfully.");
      setError(null);
      setEditGrade(null); // Turn back to plain text after saving
    } catch (err) {
      setError("Failed to assign grade.");
    }
  };

  if (loading) return <p>Loading course details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-8">
      {course && (
        <>
          <h1 className="text-3xl font-bold mb-4 text-center">
            {course.title}
          </h1>
          <p className="text-lg mb-4 text-center">{course.description}</p>
          <div className="flex justify-center mb-4">
            <p className="text-sm text-gray-500 mx-2">
              Start Date: {new Date(course.startDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500 mx-2">
              End Date: {new Date(course.endDate).toLocaleDateString()}
            </p>
          </div>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-center">
            Enrolled Students
          </h2>
          {successMessage && (
            <p className="text-green-500 text-center">{successMessage}</p>
          )}
          {course.students.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-6 text-left">Grade</th>
                    <th className="py-3 px-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {course.students.map((student, index) => (
                    <tr
                      key={student._id}
                      className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                      <td className="py-4 px-6 border-b">{student.name}</td>
                      <td className="py-4 px-6 border-b">{student.email}</td>
                      <td className="py-4 px-6 border-b">
                        {/* Display grade as text or input depending on the state */}
                        {editGrade === student._id ? (
                          <input
                            type="number"
                            className="border p-2 rounded w-full"
                            placeholder="Assign grade"
                            value={grades[student._id] || ""}
                            onChange={(e) =>
                              handleGradeChange(student._id, e.target.value)
                            }
                          />
                        ) : (
                          <span
                            className="cursor-pointer"
                            onClick={() => setEditGrade(student._id)}
                          >
                            {grades[student._id] || "No grade assigned"}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 border-b text-center">
                        {editGrade === student._id ? (
                          <button
                            onClick={() => handleSaveGrade(student._id)}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                            onClick={() => setEditGrade(student._id)}
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center">
              No students are enrolled in this course.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default CourseDetails;
