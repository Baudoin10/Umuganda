
import axios from "axios";
import { authHeader } from "./authAPI";

const BASE_URL = "https://umuganda-backend.onrender.com";

export async function getMe() {
  const headers = await authHeader();
  const { data } = await axios.get(`${BASE_URL}/api/me`, { headers });
  return data;
}
