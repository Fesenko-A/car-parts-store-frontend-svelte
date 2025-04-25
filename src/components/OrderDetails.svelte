<script lang="ts">
  import { formatCurrency, formatDate } from "../utils/utils";
  import {
    Table,
    TableHead,
    TableHeadCell,
    TableBody,
    TableBodyRow,
    TableBodyCell,
    Button,
  } from "flowbite-svelte";
  import type { Order } from "../types";
  import { PAYMENT_METHODS } from "../constants";

  export let order: Order;
</script>

{#if order}
  <section class="bg-white p-6 rounded-lg shadow-lg mb-6">
    <h2 class="text-2xl font-bold mb-4">Order Overview</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div class="bg-gray-100 p-4 rounded-lg">
        <p class="text-sm text-gray-600">Status</p>
        <p class="font-medium">
          {order.status}
          {#if order.lastUpdate}
            <span class="text-sm text-gray-500">
              (Last Updated: {formatDate(order.lastUpdate)})</span
            >
          {/if}
        </p>
      </div>
      <div class="bg-gray-100 p-4 rounded-lg">
        <p class="text-sm text-gray-600">Order Date</p>
        <p class="font-medium">{formatDate(order.orderDate)}</p>
      </div>
      <div class="bg-gray-100 p-4 rounded-lg">
        <p class="text-sm text-gray-600">Payment Method</p>
        <div class="flex items-center">
          {#if order.paymentMethod === PAYMENT_METHODS.CASH}
            <span class="font-medium text-gray-800">{order.paymentMethod}</span>
            <Button size="xs" class=" text-white rounded-lg pt-1 pb-1 ms-2">
              Pay Online
            </Button>
          {:else}
            <p class="font-medium text-gray-800">{order.paymentMethod}</p>
          {/if}
        </div>
      </div>

      <div class="bg-gray-100 p-4 rounded-lg">
        <p class="text-sm text-gray-600">Pickup Name</p>
        <p class="font-medium">{order.pickupName}</p>
      </div>
      <div class="bg-gray-100 p-4 rounded-lg">
        <p class="text-sm text-gray-600">Pickup Phone</p>
        <p class="font-medium">{order.pickupPhoneNumber}</p>
      </div>
      <div class="bg-gray-100 p-4 rounded-lg">
        <p class="text-sm text-gray-600">Pickup Email</p>
        <p class="font-medium">{order.pickupEmail}</p>
      </div>
    </div>
  </section>

  <h2 class="text-2xl font-bold ps-6">Order Items</h2>
  <Table striped={true} hoverable={true} class="mb-5">
    <TableHead>
      <TableHeadCell>Product</TableHeadCell>
      <TableHeadCell>Price per Unit</TableHeadCell>
      <TableHeadCell>Quantity</TableHeadCell>
      <TableHeadCell>Total</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each order.orderDetails as detail}
        <TableBodyRow>
          <TableBodyCell>{detail.productNameAtOrder}</TableBodyCell>
          <TableBodyCell
            >{formatCurrency(detail.productPriceAtOrder)}</TableBodyCell
          >
          <TableBodyCell>{detail.quantity}</TableBodyCell>
          <TableBodyCell>{formatCurrency(detail.price)}</TableBodyCell>
        </TableBodyRow>
      {/each}</TableBody
    >
    <tfoot>
      <tr class="font-semibold text-gray-900">
        <th scope="row" class="py-3 px-6 text-base" colspan="2">Total</th>
        <td class="py-3 px-6 font-bold">{order.totalItems}</td>
        <td class="py-3 px-6 font-bold">{formatCurrency(order.orderTotal)}</td>
      </tr>
    </tfoot>
  </Table>
{:else}
  <p>Order not found.</p>
{/if}
