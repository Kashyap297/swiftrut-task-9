import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  FaChalkboardTeacher,
  FaBook,
  FaSignOutAlt,
  FaUser,
  FaAngleDown,
  FaAngleUp,
  FaUserGraduate,
  FaTachometerAlt,
} from "react-icons/fa"; // Import icons

const Sidebar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // State to toggle the dropdowns
  const [teacherDropdownOpen, setTeacherDropdownOpen] = useState(false);
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [studentDropdownOpen, setStudentDropdownOpen] = useState(false); // New state for managing students

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="bg-gray-800 text-white h-screen w-64 p-6">
      <h1 className="text-2xl font-bold mb-6">EMS Dashboard</h1>

      {user ? (
        <>
          {/* Show User Info */}
          <p className="mb-4 flex items-center">
            <FaUser className="mr-2" /> Hello, {user.name}
          </p>

          {/* Dashboard Link */}
          <div className="mb-6">
            <h3 className="font-semibold cursor-pointer flex justify-between items-center">
              <Link
                to={
                  user.role === "Admin"
                    ? "/admin"
                    : user.role === "Teacher"
                    ? "/teacher"
                    : "/student"
                }
                className="flex items-center text-blue-300 hover:underline"
              >
                <FaTachometerAlt className="mr-2" /> Dashboard
              </Link>
            </h3>
          </div>

          {/* Admin Dropdown */}
          {user.role === "Admin" && (
            <div className="mb-6">
              {/* Manage Teacher Dropdown */}
              <div className="mb-4">
                <h3
                  className="font-semibold cursor-pointer flex justify-between items-center"
                  onClick={() => setTeacherDropdownOpen(!teacherDropdownOpen)}
                >
                  <span className="flex items-center">
                    <FaChalkboardTeacher className="mr-2" />
                    Manage Teacher
                  </span>
                  <span>
                    {teacherDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
                  </span>
                </h3>
                {teacherDropdownOpen && (
                  <ul className="mt-2 pl-4">
                    <li className="mb-2">
                      <Link
                        to="/create-teacher"
                        className="text-blue-300 hover:underline"
                      >
                        Create Teacher
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link
                        to="/teachers"
                        className="text-blue-300 hover:underline"
                      >
                        See All Teachers
                      </Link>
                    </li>
                  </ul>
                )}
              </div>

              {/* Manage Course Dropdown */}
              <div className="mb-4">
                <h3
                  className="font-semibold cursor-pointer flex justify-between items-center"
                  onClick={() => setCourseDropdownOpen(!courseDropdownOpen)}
                >
                  <span className="flex items-center">
                    <FaBook className="mr-2" />
                    Manage Course
                  </span>
                  <span>
                    {courseDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
                  </span>
                </h3>
                {courseDropdownOpen && (
                  <ul className="mt-2 pl-4">
                    <li className="mb-2">
                      <Link
                        to="/create-course"
                        className="text-blue-300 hover:underline"
                      >
                        Create Course
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link
                        to="/courses"
                        className="text-blue-300 hover:underline"
                      >
                        See All Courses
                      </Link>
                    </li>
                  </ul>
                )}
              </div>

              {/* Manage Student Dropdown */}
              <div>
                <h3
                  className="font-semibold cursor-pointer flex justify-between items-center"
                  onClick={() => setStudentDropdownOpen(!studentDropdownOpen)}
                >
                  <span className="flex items-center">
                    <FaUserGraduate className="mr-2" />
                    Manage Student
                  </span>
                  <span>
                    {studentDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
                  </span>
                </h3>
                {studentDropdownOpen && (
                  <ul className="mt-2 pl-4">
                    <li className="mb-2">
                      <Link
                        to="/students"
                        className="text-blue-300 hover:underline"
                      >
                        See All Students
                      </Link>
                    </li>
                    {/* New Link to enroll students */}
                    <li className="mb-2">
                      <Link
                        to="/enroll-student"
                        className="text-blue-300 hover:underline"
                      >
                        Enroll Student in Course
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Teacher Dropdown */}
          {user.role === "Teacher" && (
            <div className="mb-6">
              {/* View Assigned Courses */}
              <div className="mb-4">
                <h3
                  className="font-semibold cursor-pointer flex justify-between items-center"
                  onClick={() => setCourseDropdownOpen(!courseDropdownOpen)}
                >
                  <span className="flex items-center">
                    <FaBook className="mr-2" />
                    Assigned Courses
                  </span>
                  <span>
                    {courseDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
                  </span>
                </h3>
                {courseDropdownOpen && (
                  <ul className="mt-2 pl-4">
                    <li className="mb-2">
                      <Link
                        to="/assigned-courses"
                        className="text-blue-300 hover:underline"
                      >
                        View Assigned Courses
                      </Link>
                    </li>
                  </ul>
                )}
              </div>

              {/* Manage Student Dropdown */}
              <div>
                <h3
                  className="font-semibold cursor-pointer flex justify-between items-center"
                  onClick={() => setStudentDropdownOpen(!studentDropdownOpen)}
                >
                  <span className="flex items-center">
                    <FaUserGraduate className="mr-2" />
                    Manage Student
                  </span>
                  <span>
                    {studentDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
                  </span>
                </h3>
                {studentDropdownOpen && (
                  <ul className="mt-2 pl-4">
                    <li className="mb-2">
                      <Link
                        to="/students"
                        className="text-blue-300 hover:underline"
                      >
                        See All Students
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Student Dropdown */}
          {user.role === "Student" && (
            <div className="mb-6">
              {/* View All Courses */}
              <div className="mb-4">
                <h3
                  className="font-semibold cursor-pointer flex justify-between items-center"
                  onClick={() => setCourseDropdownOpen(!courseDropdownOpen)}
                >
                  <span className="flex items-center">
                    <FaBook className="mr-2" />
                    View All Courses
                  </span>
                  <span>
                    {courseDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
                  </span>
                </h3>
                {courseDropdownOpen && (
                  <ul className="mt-2 pl-4">
                    <li className="mb-2">
                      <Link
                        to="/all-courses"
                        className="text-blue-300 hover:underline"
                      >
                        Enroll in Courses
                      </Link>
                    </li>
                  </ul>
                )}
              </div>

              {/* View Enrolled Courses */}
              <div>
                <h3
                  className="font-semibold cursor-pointer flex justify-between items-center"
                  onClick={() => setStudentDropdownOpen(!studentDropdownOpen)}
                >
                  <span className="flex items-center">
                    <FaUserGraduate className="mr-2" />
                    View Enrolled Courses
                  </span>
                  <span>
                    {studentDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
                  </span>
                </h3>
                {studentDropdownOpen && (
                  <ul className="mt-2 pl-4">
                    <li className="mb-2">
                      <Link
                        to="/enrolled-courses"
                        className="text-blue-300 hover:underline"
                      >
                        See Your Enrolled Courses
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 py-2 px-4 rounded-lg mt-4 hover:bg-red-600 flex items-center"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </>
      ) : (
        <div className="space-y-4">
          {/* Login and Register Links */}
          <Link
            to="/login"
            className="block bg-blue-500 py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block bg-green-500 py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
