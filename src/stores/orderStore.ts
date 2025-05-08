import { get, writable } from "svelte/store";
import { ORDER_STATUS, PAYMENT_METHODS } from "../constants";
import type { Order, OrderDetails } from "../types";
import { products } from "./productStore";
import { users } from "./userStore";

function getRandomItem<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateFakeOrders(count: number): Order[] {
  const productList = get(products);
  const fakeOrders: Order[] = [];
  const usersArr = get(users);

  for (let i = 0; i < count; i++) {
    const user = getRandomItem(usersArr);
    const orderDetails: OrderDetails[] = [];

    const numItems = Math.floor(Math.random() * 3) + 1;
    const selectedProducts = [...productList]
      .sort(() => 0.5 - Math.random())
      .slice(0, numItems);

    let total = 0;

    selectedProducts.forEach((product, index) => {
      const quantity = Math.floor(Math.random() * 3) + 1;
      const price = product.finalPrice * quantity;
      total += price;

      orderDetails.push({
        orderDetailsId: i * 10 + index,
        orderId: i,
        productId: product.id,
        product,
        productNameAtOrder: product.name,
        productPriceAtOrder: product.finalPrice,
        quantity,
        price,
        order: {} as any,
      });
    });

    const order: Order = {
      orderId: i,
      pickupName: `${user.firstName} ${user.lastName}`,
      pickupPhoneNumber: user.phoneNumber,
      pickupEmail: user.email,
      userId: user.id,
      user,
      status: [
        ORDER_STATUS.PENDING,
        ORDER_STATUS.CONFIRMED,
        ORDER_STATUS.PROCESSING,
        ORDER_STATUS.READY,
        ORDER_STATUS.COMPLETED,
        ORDER_STATUS.CANCELLED,
      ][i % 6],
      paymentMethod: i % 2 == 0 ? PAYMENT_METHODS.CASH : PAYMENT_METHODS.ONLINE,
      orderDate: new Date(Date.now() - i * 86400000),
      lastUpdate: new Date(Date.now() - i * 43200000),
      paid: i % 3 == 0 ? true : false,
      orderDetails: [],
      orderTotal: parseFloat(total.toFixed(2)),
      totalItems: orderDetails.reduce((sum, d) => sum + d.quantity, 0),
    };

    orderDetails.forEach((d) => (d.order = order));
    order.orderDetails = orderDetails;

    fakeOrders.push(order);
  }

  return fakeOrders;
}

export const orders = writable<Order[]>(generateFakeOrders(10));
