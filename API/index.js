// src/Api/index.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://umuganda-backend.onrender.com",
  timeout: 30000, // optional: remove if you don't want a 30s cap
});

// Attach Authorization header if token exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
