// Services/tasksAPI.js
import axios from "axios";
import { authHeader } from "./authAPI";

const BASE_URL = "https://umuganda-backend.onrender.com";

export async function createTask(task) {
  const headers = await authHeader();
  const { data } = await axios.post(`${BASE_URL}/api/tasks`, task, { headers });
  return data;
}

// ✅ Add this function
export async function fetchTasks() {
  const headers = await authHeader();
  const { data } = await axios.get(`${BASE_URL}/api/tasks`, { headers });
  return data;
}
