import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import Sidebar from "./components/Sidebar"; // Import Sidebar
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex">
          <Sidebar /> {/* Sidebar */}
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} /> {/* Handle homepage */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
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
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
