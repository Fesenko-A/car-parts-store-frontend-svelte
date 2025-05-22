import { checkIfAdmin, checkIfLoggedIn } from "$lib/accessHelper";
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
};

export const getOrder = async (id: number) => {
  checkIfLoggedIn();

  return await apiFetch(`/orders/get/${id}`);
};

export const getAllOrders = async () => {
  checkIfLoggedIn();

  const filters = get(orderFilters);
  const query = toQueryString(filters);
  return await apiFetch(`/orders/getAll?${query}`);
};

export const updateOrderStatus = async (orderId: number, newStatus: string) => {
  checkIfLoggedIn();
  checkIfAdmin();

  return await apiFetch(`/orders/update/${orderId}`, {
    method: "PUT",
    body: JSON.stringify({
      status: newStatus,
    }),
  });
};

export const updateOrderPaidInCash = async (orderId: number) => {
  checkIfLoggedIn();
  checkIfAdmin();

  return await apiFetch(`/orders/update/${orderId}`, {
    method: "PUT",
    body: JSON.stringify({
      paid: true,
    }),
  });
};
