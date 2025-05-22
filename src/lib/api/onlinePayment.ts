import { apiFetch } from "$lib";

export const createOnlinePaymentIntent = async (orderId: number) => {
  const response = await apiFetch(`/onlinePayments/createIntent/${orderId}`, {
    method: "POST",
  });
  return response.clientSecret;
};

export const createOnlinePayment = async (
  orderId: number,
  paymentId: string
) => {
  await apiFetch(`/onlinePayments/create/${orderId}/${paymentId}`, {
    method: "POST",
  });
};
