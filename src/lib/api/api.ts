import { getAccessToken, refreshAccessToken } from "$lib/api/auth";
import { API_BASE_URL } from "./apiUrl";

interface ApiFetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function apiFetch(
  endpoint: string,
  options: ApiFetchOptions = {},
  requiresAuth = true
) {
  try {
    let accessToken = requiresAuth ? getAccessToken() : null;

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
      res = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
    }

    const text = await res.text();
    if (!text) {
      throw new Error("Empty response from server");
    }

    const json = JSON.parse(text);
    if (!json.isSuccess) {
      throw new Error(json.errorMessage || "Unknown API error");
    }

    return json.data;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
}
