import api from "../api/api";

export const fetchCourses = async () => {
  const response = await api.get("/courses");
  return response.data;
};

export const createCourse = async (courseData) => {
  const response = await api.post("/courses", courseData);
  return response.data;
};
