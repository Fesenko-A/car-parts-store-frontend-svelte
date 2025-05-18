import toast from "svelte-french-toast";
import { apiFetch } from "./api";
import { categories } from "../../stores/productDetailsStore";

export const getAllCategories = async () => {
  try {
    const result = await apiFetch("/categories/getAll");
    categories.set(result);
    return result;
  } catch (err) {
    const errorMessage = (err as Error).message;
    toast.error(errorMessage);
  }
};
