import { writable } from "svelte/store";
import type { Brand, Category, SpecialTag } from "../types";

export const brands = writable<Brand[]>([]);

export const categories = writable<Category[]>([]);

export const specialTags = writable<SpecialTag[]>([]);
