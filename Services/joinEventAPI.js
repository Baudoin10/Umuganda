// Services/joinEventAPI.js (or eventAPI.js)
import axios from "axios";
import { authHeader } from "./authAPI";
const BASE_URL = "https://umuganda-backend.onrender.com";

export async function fetchEvents() {
  const headers = await authHeader(); // ✅ token
  const { data } = await axios.get(`${BASE_URL}/api/events`, { headers });
  const list = Array.isArray(data) ? data : data?.events ?? [];
  return list.map((e) => ({
    ...e,
    participantsCount: e.participants?.length ?? e.participantsCount ?? 0,
  }));
}
