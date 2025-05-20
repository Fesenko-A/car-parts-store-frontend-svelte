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

export const createSpecialTag = async (name: string) => {
  try {
    await apiFetch(`/specialTags/create?name=${name}`, {
      method: "POST",
    });
    await getAllSpecialTags();
  } catch (err) {
    const errorMessage = (err as Error).message;
    toast.error(errorMessage);
  }
};

export const deleteSpecialTag = async (id: number) => {
  try {
    await apiFetch(`/specialTags/delete/${id}`, {
      method: "DELETE",
    });
    await getAllSpecialTags();
  } catch (err) {
    const errorMessage = (err as Error).message;
    toast.error(errorMessage);
  }
};
