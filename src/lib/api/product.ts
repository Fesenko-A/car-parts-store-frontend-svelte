import { get } from "svelte/store";
import { productFilters } from "../../stores/productFilters";
import { apiFetch, toQueryString } from "$lib";
import type {
  ProductCreateDto,
  ProductFilters,
  ProductUpdateDto,
} from "../../types";

export const getAllProducts = async (filters?: ProductFilters) => {
  const activeFilters = filters ?? get(productFilters);
  const query = toQueryString(activeFilters);
  return await apiFetch(`/products/getAll?${query}`);
};

export const getProduct = async (id: number) => {
  return await apiFetch(`/products/get/${id}`);
};

export const createProduct = async (productDto: ProductCreateDto) => {
  return await apiFetch("/products/create", {
    method: "POST",
    body: JSON.stringify(productDto),
  });
};

export const updateProduct = async (productDto: ProductUpdateDto) => {
  return await apiFetch("/products/update", {
    method: "PUT",
    body: JSON.stringify(productDto),
  });
};
