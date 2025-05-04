import { writable } from "svelte/store";

export const defaultFilters = {
  brands: [],
  category: "",
  specialTag: "",
  searchString: "",
  sortingOptions: "",
  pageNumber: 1,
  pageSize: 10,
  outOfStock: true,
  onlyWithDiscount: false,
};

export const productFilters = writable({ ...defaultFilters });

export function resetProductFilters() {
  productFilters.set({ ...defaultFilters });
}
