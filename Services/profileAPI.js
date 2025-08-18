
import axios from "axios";


export const fetchUserProfile = async (userId) => {
  const res = await axios.get(`/api/users/${userId}`);
  return res.data; 
};


export const updateUserProfile = async (userId, payload) => {
  const res = await axios.put(`/api/users/${userId}`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};


