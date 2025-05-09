import { writable } from "svelte/store";
import type { OrderFilters } from "../types";

export const defaultFilters: OrderFilters = {
  userId: "",
  searchString: "",
  status: "",
  pageNumber: 1,
  pageSize: 7,
};

export const orderFilters = writable({ ...defaultFilters });

export function resetOrderFilters(userId: string = "") {
  orderFilters.set({ ...defaultFilters, userId });
}
