import { get } from "svelte/store";
import { productFilters } from "../../stores/productFilters";
import { apiFetch, toQueryString } from "$lib";
import toast from "svelte-french-toast";
import type {
  ProductCreateDto,
  ProductFilters,
  ProductUpdateDto,
} from "../../types";

export const getAllProducts = async (filters?: ProductFilters) => {
  try {
    const activeFilters = filters ?? get(productFilters);
    const query = toQueryString(activeFilters);
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

export const createProduct = async (productDto: ProductCreateDto) => {
  try {
    return await apiFetch("/products/create", {
      method: "POST",
      body: JSON.stringify(productDto),
    });
  } catch (err) {
    const errorMessage = (err as Error).message;
    toast.error(errorMessage);
  }
};

export const updateProduct = async (productDto: ProductUpdateDto) => {
  try {
    return await apiFetch("/products/update", {
      method: "PUT",
      body: JSON.stringify(productDto),
    });
  } catch (err) {
    const errorMessage = (err as Error).message;
    toast.error(errorMessage);
  }
};
