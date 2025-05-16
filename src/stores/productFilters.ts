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

export const adminDefaultFilters: ProductFilters = {
  ...defaultFilters,
  pageSize: 7,
  outOfStock: true,
};

export const productFilters = writable({ ...defaultFilters });
export const adminProductFilters = writable({ ...adminDefaultFilters });

export function resetProductFilters() {
  productFilters.set({ ...defaultFilters });
}

export function resetAdminProductFilters() {
  adminProductFilters.set({ ...adminDefaultFilters });
}
