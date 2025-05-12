import { get } from "svelte/store";
import { resetOrderFilters } from "../../stores/orderFilters";
import { user } from "../../stores/userStore";
import { apiFetch } from "./api";
import { API_BASE_URL } from "./apiUrl";
import { shoppingCart } from "../../stores/shoppingCartStore";

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
  await loadShoppingCart();
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

export const refreshAccessToken = async () => {
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
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  resetOrderFilters();
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

const loadShoppingCart = async () => {
  const userId = get(user)!.id;
  const result = await apiFetch(`/shoppingCart/get?userId=${userId}`);
  shoppingCart.set(result);
  localStorage.setItem("shoppingCart", JSON.stringify(result));
};
