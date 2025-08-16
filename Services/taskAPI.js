// Services/taskAPI.js
import axios from "axios";
import { authHeader } from "./authAPI";

const BASE_URL = "https://umuganda-backend.onrender.com";

export async function createTask(task) {
  const headers = await authHeader();
  const { data } = await axios.post(`${BASE_URL}/api/tasks`, task, { headers });
  return data;
}
