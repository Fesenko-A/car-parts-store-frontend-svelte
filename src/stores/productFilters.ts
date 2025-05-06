import { writable } from "svelte/store";

export const defaultFilters: {
  category: string;
  brands: string[];
  specialTags: string[];
  searchString: string;
  sortingOptions: string;
  pageNumber: number;
  pageSize: number;
  outOfStock: boolean;
  onlyWithDiscount: boolean;
} = {
  category: "",
  brands: [],
  specialTags: [],
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
