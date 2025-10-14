

import axios from "axios";
import { authHeader } from "./authAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://umuganda-backend.onrender.com";

export async function getMe() {
  const userId = await AsyncStorage.getItem("userId");
  const headers = await authHeader();

  try {
    if (userId) {
      const { data } = await axios.get(`${BASE_URL}/api/users/${userId}`, {
        headers,
      });
      return data;
    } else {
      throw new Error("No user ID found");
    }
  } catch (error) {
    console.error(
      "Error fetching user:",
      error.response?.data || error.message
    );
    throw error;
  }
}