import { apiFetch } from "$lib";
import toast from "svelte-french-toast";

export const createOnlinePaymentIntent = async (orderId: number) => {
  try {
    const response = await apiFetch(`/onlinePayments/createIntent/${orderId}`, {
      method: "POST",
    });
    return response.clientSecret;
  } catch (err) {
    const errorMessage = (err as Error).message;
    toast.error(errorMessage);
  }
};

export const createOnlinePayment = async (
  orderId: number,
  paymentId: string
) => {
  try {
    await apiFetch(`/onlinePayments/create/${orderId}/${paymentId}`, {
      method: "POST",
    });
  } catch (err) {
    const errorMessage = (err as Error).message;
    toast.error(errorMessage);
  }
};
