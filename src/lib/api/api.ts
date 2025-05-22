import { getAccessToken, refreshAccessToken } from "$lib/api/auth";
import { API_BASE_URL } from "./apiUrl";

interface ApiFetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const apiFetch = async (
  endpoint: string,
  options: ApiFetchOptions = {},
  requiresAuth = true
) => {
  try {
    let accessToken = requiresAuth ? getAccessToken() : null;
    let json: any;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...options.headers,
    };

    let res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (res.status === 401 && requiresAuth) {
      accessToken = await refreshAccessToken();
      headers["Authorization"] = `Bearer ${accessToken}`;
      res = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });
    }

    try {
      json = await res.json();
    } catch {
      throw new Error("Invalid JSON response from server");
    }

    return json.data;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};
