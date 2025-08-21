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

// --- User: join event
export async function joinEvent(eventId, userId) {
  const headers = await authHeader();
  const payload = { eventId, userId };
  const { data } = await axios.post(`${BASE_URL}/api/events/join`, payload, {
    headers,
  });
  return data;
}

// --- Admin: list participants (filters + pagination)
export async function getParticipants(
  eventId,
  { q, status, sector, page = 1, limit = 10 } = {}
) {
  const headers = await authHeader();
  const params = {};
  if (q) params.q = q;
  if (status) params.status = status; // "joined" | "present" | "absent"
  if (sector) params.sector = sector; // e.g., "Gasabo"
  params.page = page;
  params.limit = limit;

  const { data } = await axios.get(
    `${BASE_URL}/api/events/${eventId}/participants`,
    { headers, params }
  );
  // data shape: { total, page, limit, data: [...] }
  return data;
}

// --- Admin: update participant status
export async function updateParticipantStatus(eventId, userId, status) {
  const headers = await authHeader();
  const { data } = await axios.put(
    `${BASE_URL}/api/events/${eventId}/participants/${userId}`,
    { status }, // "present" | "absent"
    { headers }
  );
  return data;
}
