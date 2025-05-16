import toast from "svelte-french-toast";
import { apiFetch } from "./api";

export const getAllCategories = async () => {
  try {
    return await apiFetch("/categories/getAll");
  } catch (err) {
    const errorMessage = (err as Error).message;
    toast.error(errorMessage);
  }
};
