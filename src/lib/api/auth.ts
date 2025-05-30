import { goto } from "$app/navigation";
import { resetOrderFilters } from "../../stores/orderFilters";
import { resetAdminProductFilters } from "../../stores/productFilters";
import { user } from "../../stores/userStore";
import { apiFetch } from "./api";
import { API_BASE_URL } from "./apiUrl";

export const login = async (email: string, password: string) => {
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
};

export const register = async (
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  password: string
) => {
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
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const setAccessToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const refreshAccessToken = async (): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/auth/refreshToken`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const status = response.status;

    let errorMessage = `Failed to refresh access token. Status: ${status}`;
    try {
      const errorData = await response.json();
      if (errorData?.errorMessage) {
        errorMessage = errorData.errorMessage;
      }
    } catch {
      // response was not JSON, ignore
    }
    logout();
    goto("/login");
    throw new Error(errorMessage);
  }

  const data = await response.json();

  if (data?.data) {
    setAccessToken(data.data);
    return data.data;
  } else {
    throw new Error("Access token not found in refresh response");
  }
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  resetOrderFilters();
  resetAdminProductFilters();
  user.set(null);
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  return await apiFetch("/auth/changePassword", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ currentPassword, newPassword }),
  });
};
