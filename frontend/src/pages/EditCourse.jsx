import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

const EditCourse = () => {
  const { id } = useParams(); // Get course ID from the route
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    teacher: "", // This should hold the teacher ID
  });

  const [teachers, setTeachers] = useState([]); // State to store all available teachers

  // Fetch available teachers for the teacher dropdown
  const fetchTeachers = async () => {
    try {
      const response = await api.get("/users/teachers"); // Assuming you have an endpoint to get all teachers
      setTeachers(response.data);
    } catch (error) {
      console.error("Failed to fetch teachers");
    }
  };

  // Fetch the course details for editing
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/courses/${id}`);
        setCourse({
          title: response.data.title,
          description: response.data.description,
          startDate: new Date(response.data.startDate)
            .toISOString()
            .split("T")[0],
          endDate: new Date(response.data.endDate).toISOString().split("T")[0],
          teacher: response.data.teacher?._id || "", // Set teacher ID if it exists
        });
      } catch (error) {
        console.error("Failed to load course");
      }
    };
    fetchCourse();
    fetchTeachers(); // Fetch the teachers to populate the dropdown
  }, [id]);

  // Handle form input change
  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission for updating the course
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/courses/${id}`, course);
      alert("Course updated successfully");
      navigate("/courses");
    } catch (error) {
      console.error("Failed to update course", error);
      alert("Failed to update course");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Edit Course</h1>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={course.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            value={course.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>

        {/* Start Date */}
        <div className="mb-4">
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={course.startDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>

        {/* End Date */}
        <div className="mb-4">
          <label className="block text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            value={course.endDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>

        {/* Teacher Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700">Teacher</label>
          <select
            name="teacher"
            value={course.teacher}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          >
            <option value="">Select a teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Update Course
        </button>
      </form>
    </div>
  );
};

export default EditCourse;
