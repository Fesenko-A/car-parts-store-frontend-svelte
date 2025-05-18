import toast from "svelte-french-toast";
import { apiFetch } from "./api";
import { specialTags } from "../../stores/productDetailsStore";

export const getAllSpecialTags = async () => {
  try {
    const result = await apiFetch("/specialTags/getAll");
    specialTags.set(result);
    return result;
  } catch (err) {
    const errorMessage = (err as Error).message;
    toast.error(errorMessage);
  }
};
