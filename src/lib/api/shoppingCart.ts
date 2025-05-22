import { get } from "svelte/store";
import { user } from "../../stores/userStore";
import { apiFetch } from "./api";
import { shoppingCart } from "../../stores/shoppingCartStore";
import { checkIfLoggedIn, toQueryString } from "$lib";

export const getShoppingCart = async () => {
  checkIfLoggedIn();
  const userId = get(user)!.id;
  let shoppingCartData;

  shoppingCartData = await apiFetch(`/shoppingCart/get?userId=${userId}`);
  shoppingCart.set(shoppingCartData);
  return shoppingCartData;
};

export const updateCartItem = async (
  productId: number,
  updateQuantityBy: number
) => {
  checkIfLoggedIn();
  const userId = get(user)!.id;
  const query = toQueryString({ userId, productId, updateQuantityBy });

  const result = await apiFetch(`/shoppingCart/upsert?${query}`, {
    method: "POST",
  });
  shoppingCart.set(result);
};
