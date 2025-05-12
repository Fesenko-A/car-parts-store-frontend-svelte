import { writable } from "svelte/store";
import type { ShoppingCart } from "../types";

const persist = <T>(key: string, initialValue: T) => {
  const storedValue =
    typeof window !== "undefined" ? localStorage.getItem(key) : null;
  const data = storedValue ? JSON.parse(storedValue) : initialValue;

  const store = writable<T>(data);

  if (typeof window !== "undefined") {
    store.subscribe((value) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }

  return store;
};

export const shoppingCart = persist<ShoppingCart | null>("shoppingCart", null);
