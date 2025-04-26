import { get, writable } from "svelte/store";
import type { CartItem, Product } from "../types";
import { products } from "./productStore";

export const cart = writable<CartItem[]>([]);

function generateFakeCartItems(count: number) {
  const fakeCartItems: CartItem[] = [];
  const numProducts = get(products).length;

  for (let i = 0; i < count; i++) {
    const product = get(products)[Math.floor(Math.random() * numProducts)];
    const quantity = Math.floor(Math.random() * 3) + 1;
    fakeCartItems.push({
      id: Date.now() + i,
      productId: product.id,
      product,
      quantity,
      shoppingCartId: 1,
    });
  }

  return fakeCartItems;
}

cart.set(generateFakeCartItems(5));

export function addToCart(product: Product, quantity = 1) {
  cart.update((items) => {
    const existingItem = items.find((item) => item.productId === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.push({
        id: Date.now(),
        productId: product.id,
        product,
        quantity,
        shoppingCartId: 1,
      });
    }
    return [...items];
  });
}

export function removeFromCart(cartItemId: number) {
  cart.update((items) => items.filter((item) => item.id !== cartItemId));
}

export function updateQuantity(cartItemId: number, quantity: number) {
  cart.update((items) => {
    const item = items.find((i) => i.id === cartItemId);
    if (item) {
      item.quantity = quantity > 0 ? quantity : 1;
    }
    return [...items];
  });
}
