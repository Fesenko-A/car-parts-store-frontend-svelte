import toast from "svelte-french-toast";
import { apiFetch } from "./api";

export const getAllBrands = async () => {
  try {
    return await apiFetch("/brands/getAll");
  } catch (err) {
    const errorMessage = (err as Error).message;
    toast.error(errorMessage);
  }
};
