import { get } from "svelte/store";
import { user } from "../../stores/userStore";
import { apiFetch } from "./api";
import { shoppingCart } from "../../stores/shoppingCartStore";
import toast from "svelte-french-toast";
import { checkIfLoggedIn, toQueryString } from "$lib";

export const getShoppingCart = async () => {
  checkIfLoggedIn();

  const userId = get(user)!.id;
  let shoppingCartData;

  try {
    shoppingCartData = await apiFetch(`/shoppingCart/get?userId=${userId}`);
    shoppingCart.set(shoppingCartData);
    return shoppingCartData;
  } catch (err) {
    const errorMessage = (err as Error).message;
    toast.error(errorMessage);
  }
};

export const addProductToCart = async (productId: number) => {
  checkIfLoggedIn();

  const userId = get(user)!.id;
  const updateQuantityBy = 1;
  const query = toQueryString({ userId, productId, updateQuantityBy });

  try {
    await apiFetch(`/shoppingCart/upsert?${query}`, {
      method: "POST",
    });
    toast.success("Product has been added to your shopping cart!");
  } catch (err) {
    const errorMessage = (err as Error).message;
    toast.error(errorMessage);
  }
};
