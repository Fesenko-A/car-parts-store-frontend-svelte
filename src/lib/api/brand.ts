import toast from "svelte-french-toast";
import { apiFetch } from "./api";
import { brands } from "../../stores/productDetailsStore";

export const getAllBrands = async () => {
  try {
    const result = await apiFetch("/brands/getAll");
    brands.set(result);
    return result;
  } catch (err) {
    const errorMessage = (err as Error).message;
    toast.error(errorMessage);
  }
};
