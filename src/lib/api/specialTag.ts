import toast from "svelte-french-toast";
import { apiFetch } from "./api";

export const getAllSpecialTags = async () => {
  try {
    return await apiFetch("/specialTags/getAll");
  } catch (err) {
    const errorMessage = (err as Error).message;
    toast.error(errorMessage);
  }
};
