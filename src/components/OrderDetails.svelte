<script lang="ts">
  import { formatCurrency, formatDate } from "$lib";
  import {
    Table,
    TableHead,
    TableHeadCell,
    TableBody,
    TableBodyRow,
    TableBodyCell,
    Button,
    Dropdown,
    DropdownItem,
  } from "flowbite-svelte";
  import type { Order } from "../types";
  import { ORDER_STATUS, PAYMENT_METHODS } from "../constants";
  import { ChevronDownOutline } from "flowbite-svelte-icons";

  export let order: Order;

  let statusDropdownOpen = false;
  let currentStatus = order.status;
  const orderStatuses = [
    ORDER_STATUS.PENDING,
    ORDER_STATUS.CONFIRMED,
    ORDER_STATUS.PROCESSING,
    ORDER_STATUS.READY,
    ORDER_STATUS.COMPLETED,
    ORDER_STATUS.CANCELLED,
  ];

  function handleOrderStatusChange(newStatus: string) {
    statusDropdownOpen = true;
    if (newStatus === currentStatus) return;
    order.status = newStatus;
    currentStatus = newStatus;
    statusDropdownOpen = false;
  }

  function statusIsDisabled(status: string) {
    return orderStatuses.indexOf(status) < orderStatuses.indexOf(currentStatus);
  }

  function handlePaymensStatusChange() {
    order.paid = true;
  }

  function handleOnlinePayment() {
    order.paid = true;
    order.paymentMethod = PAYMENT_METHODS.ONLINE;
  }
</script>

{#if order}
  <section class="bg-white p-6 rounded-lg shadow-lg mb-6">
    <h2 class="text-2xl font-bold mb-4">Order Overview</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div class="bg-gray-100 p-4 rounded-lg">
        <p class="text-sm text-gray-600">Status</p>
        <p class="font-medium">
          <Button class="shadow" size="sm" color="alternative">
            {order.status}<ChevronDownOutline />
          </Button>
          <Dropdown bind:open={statusDropdownOpen}>
            {#each orderStatuses as status}
              <DropdownItem
                on:click={() => handleOrderStatusChange(status)}
                disabled={statusIsDisabled(status)}
                class={statusIsDisabled(status)
                  ? "opacity-50 cursor-not-allowed"
                  : ""}
              >
                {status}
              </DropdownItem>
            {/each}
          </Dropdown>
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
            <span class="font-medium text-gray-800">{order.paymentMethod}</span
            >&nbsp;
            {#if order.paid}
              <span class="font-medium text-green-600">Paid</span>
            {:else}
              <span class="font-medium text-red-600">Unpaid</span>
              <Button
                class="ms-2 shadow"
                size="sm"
                color="alternative"
                on:click={handleOnlinePayment}
              >
                Pay Online
              </Button>
              <Button
                class="ms-2 shadow"
                size="sm"
                color="alternative"
                on:click={handlePaymensStatusChange}
              >
                Mark as paid in cash
              </Button>
            {/if}
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
