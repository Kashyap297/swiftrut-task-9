import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRedirect from "./components/AuthRedirect"; // Import AuthRedirect
import AuthProvider from "./context/AuthContext";
import CreateTeacher from "./pages/CreateTeacher"; // New import
import AllTeachers from "./pages/AllTeachers"; // New import
import CreateCourse from "./pages/CreateCourse"; // New import
import AllCourses from "./pages/AllCourses"; // New import
import EditCourse from "./pages/EditCourse";
import AllStudents from "./pages/AllStudents"; // New import for students

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex">
          <Sidebar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />

              {/* If logged in, redirect user from login/register */}
              <Route
                path="/login"
                element={
                  <AuthRedirect>
                    <Login />
                  </AuthRedirect>
                }
              />
              <Route
                path="/register"
                element={
                  <AuthRedirect>
                    <Register />
                  </AuthRedirect>
                }
              />

              {/* Protected Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute role="Admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/teacher"
                element={
                  <ProtectedRoute role="Teacher">
                    <TeacherDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student"
                element={
                  <ProtectedRoute role="Student">
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />

              {/* New routes */}
              <Route
                path="/create-teacher"
                element={
                  <ProtectedRoute role="Admin">
                    <CreateTeacher />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/teachers"
                element={
                  <ProtectedRoute role="Admin">
                    <AllTeachers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-course"
                element={
                  <ProtectedRoute role="Admin">
                    <CreateCourse />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-course/:id"
                element={
                  <ProtectedRoute role="Admin">
                    <EditCourse />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/courses"
                element={
                  <ProtectedRoute role="Admin">
                    <AllCourses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/students"
                element={
                  <ProtectedRoute role={["Admin", "Teacher"]}>
                    <AllStudents />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
