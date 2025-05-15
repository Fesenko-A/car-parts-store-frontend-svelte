import { checkIfAdmin, checkIfLoggedIn } from "$lib/accessHelper";
import toast from "svelte-french-toast";
import { apiFetch } from "./api";
import { shoppingCart } from "../../stores/shoppingCartStore";
import { get } from "svelte/store";
import { orderFilters } from "../../stores/orderFilters";
import { toQueryString } from "$lib/utils";

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

export const getOrder = async (id: number) => {
  checkIfLoggedIn();

  try {
    return await apiFetch(`/orders/get/${id}`);
  } catch (err) {
    const errorMessage = (err as Error).message;
    toast.error(errorMessage);
  }
};

export const getAllOrders = async () => {
  try {
    const filters = get(orderFilters);
    const query = toQueryString(filters);
    return await apiFetch(`/orders/getAll?${query}`);
  } catch (err) {
    const errorMessage = (err as Error).message;
    toast.error(errorMessage);
  }
};

export const updateOrderStatus = async (orderId: number, newStatus: string) => {
  checkIfLoggedIn();
  checkIfAdmin();

  try {
    return await apiFetch(`/orders/update/${orderId}`, {
      method: "PUT",
      body: JSON.stringify({
        status: newStatus,
      }),
    });
  } catch (err) {
    const errorMessage = (err as Error).message;
    toast.error(errorMessage);
  }
};

export const updateOrderPaidInCash = async (orderId: number) => {
  try {
    return await apiFetch(`/orders/update/${orderId}`, {
      method: "PUT",
      body: JSON.stringify({
        paid: true,
      }),
    });
  } catch (err) {
    const errorMessage = (err as Error).message;
    toast.error(errorMessage);
  }
};
