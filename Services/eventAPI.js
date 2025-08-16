// Services/eventAPI.js
import axios from "axios";
import { authHeader } from "./authAPI";

const BASE_URL = "https://umuganda-backend.onrender.com";

export async function createEvent(body) {
  const dateObj = new Date(body?.date);
  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid date format. Use YYYY-MM-DD");
  }
  const day = String(dateObj.getDate());
  const month = String(dateObj.getMonth() + 1);

  const headers = await authHeader();
  const payload = { ...body, day, month };

  const { data } = await axios.post(`${BASE_URL}/api/events`, payload, {
    headers,
  });
  return data;
}
