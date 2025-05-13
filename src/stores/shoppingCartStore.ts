import { derived, writable } from "svelte/store";
import type { ShoppingCart } from "../types";

export const shoppingCart = writable<ShoppingCart | null>(null);
export const cartIsEmpty = derived(
  shoppingCart,
  ($shoppingCart) => $shoppingCart!.cartItems.length === 0
);
