// Services/usersAPI.js
import axios from "axios";
import { authHeader } from "./authAPI";

const BASE_URL = "https://umuganda-backend.onrender.com";

export async function getUsers() {
  const headers = await authHeader();
  const { data } = await axios.get(`${BASE_URL}/api/users`, { headers });
  return data;
}

export async function deleteUser(id) {
  const headers = await authHeader();
  const { data } = await axios.delete(`${BASE_URL}/api/users/${id}`, {
    headers,
  });
  return data;
}
