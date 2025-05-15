import { checkIfLoggedIn } from "$lib/accessHelper";
import toast from "svelte-french-toast";
import { apiFetch } from "./api";
import { shoppingCart } from "../../stores/shoppingCartStore";

export const createOrder = async (
  userId: string,
  pickupName: string,
  pickupPhoneNumber: string,
  pickupEmail: string
) => {
  checkIfLoggedIn();

  try {
    const result = await apiFetch("/orders/create", {
      body: JSON.stringify({
        userId,
        pickupName,
        pickupPhoneNumber,
        pickupEmail,
      }),
      method: "POST",
    });
    shoppingCart.set(null);
    return result;
  } catch (err) {
    const errorMessage = (err as Error).message;
    toast.error(errorMessage);
  }
};
