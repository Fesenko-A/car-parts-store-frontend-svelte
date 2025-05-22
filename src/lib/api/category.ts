import { apiFetch } from "./api";
import { categories } from "../../stores/productDetailsStore";

export const getAllCategories = async () => {
  const result = await apiFetch("/categories/getAll");
  categories.set(result);
  return result;
};

export const createCategory = async (name: string) => {
  await apiFetch(`/categories/create?name=${name}`, {
    method: "POST",
  });
  await getAllCategories();
};

export const deleteCategory = async (id: number) => {
  await getAllCategories();
};
