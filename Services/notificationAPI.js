// Services/notificationAPI.js
import axios from "axios";
import { authHeader } from "./authAPI";

const BASE_URL = "https://umuganda-backend.onrender.com";

export async function createNotification({
  title,
  message,
  isBroadcast,
  targetUserIds = [],
}) {
  const headers = await authHeader();
  const payload = {
    title,
    message,
    targetUserIds: isBroadcast ? "all" : targetUserIds,
  };
  const { data } = await axios.post(`${BASE_URL}/api/notifications`, payload, {
    headers,
  });
  return data;
}
