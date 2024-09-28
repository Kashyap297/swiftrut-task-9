// src/pages/ViewGrade.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

const ViewGrade = () => {
  const { courseId } = useParams(); // Get courseId from URL params
  const { user } = useContext(AuthContext); // Get the logged-in user
  const [grade, setGrade] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrade = async () => {
      try {
        const { data } = await api.get(`/courses/${courseId}/student/grades`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setGrade(data);
      } catch (error) {
        setError("Grade not assigned by teacher.");
      } finally {
        setLoading(false);
      }
    };

    fetchGrade();
  }, [courseId]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Grade</h1>
      {loading ? (
        <p className="text-center text-lg text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-lg text-red-500">{error}</p>
      ) : grade ? (
        <div className="bg-white shadow-lg rounded-lg p-6 border hover:shadow-xl transition-shadow">
          <p className="text-lg text-green-600">Grade: {grade.grade} marks</p>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">
          Grade not yet assigned.
        </p>
      )}
    </div>
  );
};

export default ViewGrade;
