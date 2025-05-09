import { user } from "../../stores/userStore";
import { apiFetch } from "./api";
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

  try {
    const data = await response.json();
    if (data?.data) {
      setAccessToken(data.data);
      return data.data;
    } else {
      throw new Error("Access token not found in refresh response");
    }
  } catch (error) {
    console.error("Error parsing refresh token response:", error);
    throw new Error("Failed to parse refresh token response");
  }
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
  localStorage.setItem("user", JSON.stringify(userData));
}

export async function register(
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  password: string
) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, firstName, lastName, phoneNumber, password }),
    credentials: "include",
  });

  const json = await res.json();

  if (!res.ok || !json.isSuccess) {
    throw new Error(json.errorMessage || "Registration failed");
  }

  const { accessToken, user: userData } = json.data;
  setAccessToken(accessToken);
  user.set(userData);
  localStorage.setItem("user", JSON.stringify(userData));
}

export function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  user.set(null);
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
) {
  return await apiFetch("/auth/changePassword", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}
