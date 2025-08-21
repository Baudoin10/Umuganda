
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://umuganda-backend.onrender.com";

const TOKEN_KEY = "token";
const ROLE_KEY = "role";
const USER_ID_KEY = "userId";

export async function login(email, password) {
  const { data } = await axios.post(`${BASE_URL}/api/auth/login`, {
    email,
    password,
  });

  const token = data?.token || data?.accessToken || "";
  const role = data?.role || "user";
  const userId = data?.userId ? String(data.userId) : "";

  await AsyncStorage.setItem(TOKEN_KEY, token);
  await AsyncStorage.setItem(ROLE_KEY, role);
  await AsyncStorage.setItem(USER_ID_KEY, userId);

  return { token, role, userId };
}

export async function signup({ firstname, lastname, email, password }) {
  await axios.post(`${BASE_URL}/api/auth/register`, {
    firstname,
    lastname,
    email,
    password,
    phone, 
    sector, 
    address, 
  });
}

export async function logout() {
  await AsyncStorage.removeItem(TOKEN_KEY);
  await AsyncStorage.removeItem(ROLE_KEY);
  await AsyncStorage.removeItem(USER_ID_KEY);
}

export async function getToken() {
  return AsyncStorage.getItem(TOKEN_KEY);
}

export async function getRole() {
  return AsyncStorage.getItem(ROLE_KEY);
}

export async function getUserId() {
  return AsyncStorage.getItem(USER_ID_KEY);
}

export async function authHeader() {
  const token = await getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}


