import axios from "axios";

const BASE_URL = "https://umuganda-backend.onrender.com";

export const fetchEvents = async () => {
  const res = await axios.get(`${BASE_URL}/api/events`);
  return Array.isArray(res.data) ? res.data : res.data?.events ?? [];
};
