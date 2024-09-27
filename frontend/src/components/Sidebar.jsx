import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

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
          <p className="mb-4">Hello, {user.name}</p>

          {/* Admin Dropdown */}
          {user.role === "Admin" && (
            <div className="mb-6">
              <h3 className="font-semibold">Admin Options</h3>
              <ul className="mt-2">
                <li className="mb-2">
                  <Link
                    to="/teachers"
                    className="text-blue-300 hover:underline"
                  >
                    Teachers
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/students"
                    className="text-blue-300 hover:underline"
                  >
                    Students
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 py-2 px-4 rounded-lg mt-4 hover:bg-red-600"
          >
            Logout
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
