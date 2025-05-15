import { get } from "svelte/store";
import { productFilters } from "../../stores/productFilters";
import { apiFetch, toQueryString } from "$lib";
import toast from "svelte-french-toast";

export const getAllProducts = async () => {
  try {
    const filters = get(productFilters);
    const query = toQueryString(filters);
    return await apiFetch(`/products/getAll?${query}`);
  } catch (err) {
    const errorMessage = (err as Error).message;
    toast.error(errorMessage);
  }
};

export const getProduct = async (id: number) => {
  try {
    return await apiFetch(`/products/get/${id}`);
  } catch (err) {
    const errorMessage = (err as Error).message;
    toast.error(errorMessage);
  }
};
