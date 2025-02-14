import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

export const createAxiosInstance = (setUserRole, setUserName) => {
  // Request Interceptor to add Bearer Token
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor for handling 401 errors
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setUserRole(null);
        setUserName(null);
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
