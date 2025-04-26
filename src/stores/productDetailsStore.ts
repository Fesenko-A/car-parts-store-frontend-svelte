import { writable } from "svelte/store";
import type { Brand, Category, SpecialTag } from "../types";

export const brands = writable<Brand[]>([
  { id: 1, name: "Triple QX" },
  { id: 2, name: "Shell" },
  { id: 3, name: "Castrol" },
  { id: 4, name: "Bosch" },
  { id: 5, name: "Varta" },
]);

export const categories = writable<Category[]>([
  { id: 1, name: "Oils" },
  { id: 2, name: "Batteries" },
  { id: 3, name: "Bulbs" },
]);

export const specialTags = writable<SpecialTag[]>([
  { id: 1, name: "Best seller" },
  { id: 2, name: "Litimed offer" },
]);
