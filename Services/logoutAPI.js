// src/Services/authAPI.js
import axios from "axios";
const BASE_URL = "https://umuganda-backend.onrender.com";

export async function logout() {
  await axios.post(`${BASE_URL}/api/auth/logout`, {});
}
