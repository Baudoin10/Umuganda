
import axios from "axios";

const BASE_URL = "https://umuganda-backend.onrender.com";

export const fetchNotifications = async () => {
  const res = await axios.get(`${BASE_URL}/api/notifications`);
  return Array.isArray(res.data) ? res.data : res.data?.notifications ?? [];
};
