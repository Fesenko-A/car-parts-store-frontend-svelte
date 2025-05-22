import { apiFetch } from "./api";
import { specialTags } from "../../stores/productDetailsStore";

export const getAllSpecialTags = async () => {
  const result = await apiFetch("/specialTags/getAll");
  specialTags.set(result);
  return result;
};

export const createSpecialTag = async (name: string) => {
  await apiFetch(`/specialTags/create?name=${name}`, {
    method: "POST",
  });
  await getAllSpecialTags();
};

export const deleteSpecialTag = async (id: number) => {
  await apiFetch(`/specialTags/delete/${id}`, {
    method: "DELETE",
  });
  await getAllSpecialTags();
};
