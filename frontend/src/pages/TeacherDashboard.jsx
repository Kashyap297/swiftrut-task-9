import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const TeacherDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to Teacher Dashboard, {user.name}!
      </h1>
      <p className="text-lg">
        Use the sidebar to manage your courses and view students.
      </p>
    </div>
  );
};

export default TeacherDashboard;
