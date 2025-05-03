import { API_BASE_URL } from "./config";

export async function apiFetch(endpoint: string, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    const text = await res.text();
    if (!text) {
      throw new Error("Empty response from server");
    }

    const json = JSON.parse(text);

    if (!json.isSuccess) {
      throw new Error(json.errorMessage || "Unknown API error");
    }

    return json.result;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
}
