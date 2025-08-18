import axios from "axios";

const BASE_URL = "https://umuganda-backend.onrender.com";

export const fetchUserProfile = async (userId) => {
  const res = await axios.get(`${BASE_URL}/api/users/${userId}`);
  return res.data.user;
};

export const updateUserProfile = async (userId, payload) => {
  const res = await axios.put(`${BASE_URL}/api/users/${userId}`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};
