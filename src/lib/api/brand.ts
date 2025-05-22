import { apiFetch } from "./api";
import { brands } from "../../stores/productDetailsStore";

export const getAllBrands = async () => {
  const result = await apiFetch("/brands/getAll");
  brands.set(result);
  return result;
};

export const createBrand = async (name: string) => {
  await apiFetch(`/brands/create?name=${name}`, {
    method: "POST",
  });
  await getAllBrands();
};

export const deleteBrand = async (id: number) => {
  await apiFetch(`/brands/delete/${id}`, {
    method: "DELETE",
  });
  await getAllBrands();
};
