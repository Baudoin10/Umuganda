import axios from "axios";

const BASE_URL = "https://umuganda-backend.onrender.com";

export const fetchTasks = async () => {
  const res = await axios.get(`${BASE_URL}/api/tasks`);
  return res.data;
};

export const updateTaskStatus = async (taskId, newStatus) => {
  const payload = {
    status: newStatus,
    lastUpdated: new Date().toISOString(),
  };
  const res = await axios.put(`${BASE_URL}/api/tasks/${taskId}`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};
