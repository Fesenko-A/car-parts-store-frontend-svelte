import { writable } from "svelte/store";
import type { ProductFilters } from "../types";

export const defaultFilters: ProductFilters = {
  category: "",
  brands: [],
  specialTags: [],
  searchString: "",
  sortingOptions: "",
  pageNumber: 1,
  pageSize: 10,
  outOfStock: false,
  onlyWithDiscount: false,
};

export const productFilters = writable({ ...defaultFilters });

export function resetProductFilters() {
  productFilters.set({ ...defaultFilters });
}
