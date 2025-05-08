import { user } from "../../stores/userStore";
import { API_BASE_URL } from "./apiUrl";

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function setAccessToken(token: string) {
  localStorage.setItem("accessToken", token);
}

export async function refreshAccessToken() {
  const response = await fetch(`${API_BASE_URL}/auth/refreshToken`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to refresh access token");
  }

  const data = await response.json();
  setAccessToken(data.accessToken);
  return data.accessToken;
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  const json = await res.json();

  if (!res.ok || !json.isSuccess) {
    throw new Error(json.errorMessage || "Login failed");
  }

  const { accessToken, user: userData } = json.data;
  setAccessToken(accessToken);
  user.set(userData);
}

export async function register(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  const json = await res.json();

  if (!res.ok || !json.isSuccess) {
    throw new Error(json.errorMessage || "Registration failed");
  }

  const { accessToken, user: userData } = json.data;
  setAccessToken(accessToken);
  user.set(userData);
}

export function logout() {
  localStorage.removeItem("accessToken");
  user.set(null);
}
