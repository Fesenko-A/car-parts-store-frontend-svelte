<script lang="ts">
  import { apiFetch, formatDateTime } from "$lib";
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import type { Order } from "../types";
  import { ORDER_STATUS, PAYMENT_METHODS } from "../constants";
  import { ChevronDownOutline } from "flowbite-svelte-icons";
  import { isAdmin } from "../stores/userStore";
  import toast from "svelte-french-toast";
  import { goto } from "$app/navigation";
  import OrderItemsTable from "./OrderItemsTable.svelte";

  export let order: Order;

  let errorMessage = "";

  let statusDropdownOpen = false;
  let statusUpdateLoading = false;

  let statusButtonDisabled =
    order.status === ORDER_STATUS.CANCELLED ||
    order.status === ORDER_STATUS.COMPLETED;

  let currentStatus = order.status;
  const orderStatuses = [
    ORDER_STATUS.PENDING,
    ORDER_STATUS.CONFIRMED,
    ORDER_STATUS.PROCESSING,
    ORDER_STATUS.READY,
    ORDER_STATUS.COMPLETED,
    ORDER_STATUS.CANCELLED,
  ];

  const handleOrderStatusChange = async (newStatus: string) => {
    if (newStatus === currentStatus) return;
    statusDropdownOpen = false;
    statusUpdateLoading = true;

    try {
      const updatedOrder = await apiFetch(`/orders/update/${order.orderId}`, {
        method: "PUT",
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      order = updatedOrder;
      currentStatus = updatedOrder.status;
      toast.success("Order status updated successfully");
      notifyAboutRefund();
    } catch (err) {
      errorMessage = (err as Error).message;
      toast.error(errorMessage);
    } finally {
      statusUpdateLoading = false;
    }
  };

  const notifyAboutRefund = () => {
    if (
      currentStatus == ORDER_STATUS.CANCELLED &&
      order.paymentMethod == PAYMENT_METHODS.ONLINE
    ) {
      toast.success(
        "Online payment has been refunded and will be returned in 10 business days.",
        {
          duration: 6000,
        }
      );
    }
  };

  const statusIsDisabled = (status: string) => {
    return (
      orderStatuses.indexOf(status) <= orderStatuses.indexOf(currentStatus)
    );
  };

  const handlePaidInCash = async () => {
    try {
      const updatedOrder = await apiFetch(`/orders/update/${order.orderId}`, {
        method: "PUT",
        body: JSON.stringify({
          paid: true,
        }),
      });

      order = updatedOrder;
      toast.success("Order payment updated successfully");
    } catch (err) {
      errorMessage = (err as Error).message;
      toast.error(errorMessage);
    }
  };

  const handleOnlinePayment = () => {
    goto("/payment", {
      state: {
        orderId: order.orderId,
      },
    });
  };
</script>

{#if order}
  <section class="bg-white p-6 rounded-lg shadow-lg mb-6">
    <div class="flex justify-between">
      <h2 class="text-2xl font-bold mb-4">Order Overview</h2>
      <h2 class="text-2xl font-bold mb-4">ID: {order.orderId}</h2>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div class="order-details-tile">
        <p class="text-sm text-gray-600">Status</p>
        <p class="order-details-tile-text">
          {#if $isAdmin}
            <Button
              class="shadow"
              size="sm"
              color="alternative"
              disabled={statusUpdateLoading || statusButtonDisabled}
            >
              {#if statusUpdateLoading}
                Loading...
              {:else}
                {order.status}<ChevronDownOutline />
              {/if}
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
          {:else}
            {order.status}
          {/if}

          {#if order.lastUpdate}
            <span class="text-sm text-gray-500">
              (Last Updated: {formatDateTime(order.lastUpdate)})</span
            >
          {/if}
        </p>
      </div>
      <div class="order-details-tile">
        <p class="text-sm text-gray-600">Order Date</p>
        <p class="order-details-tile-text">{formatDateTime(order.orderDate)}</p>
      </div>
      <div class="order-details-tile">
        <p class="text-sm text-gray-600">Payment Method</p>
        <div class="order-details-tile-text">
          <span class="font-medium text-gray-800">{order.paymentMethod}</span>
          {#if order.paid}
            <span class="font-medium text-green-600">(Paid)</span>
          {:else}
            <span class="font-medium text-red-600">
              {#if order.paymentMethod === PAYMENT_METHODS.ONLINE && order.status === ORDER_STATUS.CANCELLED}
                (Refunded)
              {:else}
                (Unpaid)
              {/if}
            </span>
            {#if order.status != ORDER_STATUS.CANCELLED}
              <Button
                class="ms-2 shadow"
                size="sm"
                color="alternative"
                on:click={handleOnlinePayment}
              >
                Pay Online
              </Button>
              {#if $isAdmin}
                <Button
                  class="ms-2 shadow"
                  size="sm"
                  color="alternative"
                  on:click={handlePaidInCash}
                >
                  Mark as paid in cash
                </Button>
              {/if}
            {/if}
          {/if}
        </div>
      </div>

      <div class="order-details-tile">
        <p class="text-sm text-gray-600">Pickup Name</p>
        <p class="order-details-tile-text">{order.pickupName}</p>
      </div>
      <div class="order-details-tile">
        <p class="text-sm text-gray-600">Pickup Phone</p>
        <p class="order-details-tile-text">{order.pickupPhoneNumber}</p>
      </div>
      <div class="order-details-tile">
        <p class="text-sm text-gray-600">Pickup Email</p>
        <p class="order-details-tile-text">{order.pickupEmail}</p>
      </div>
    </div>
  </section>

  <h2 class="text-2xl font-bold ps-6">Order Items</h2>
  <OrderItemsTable {order} />
{:else}
  <p>Order not found.</p>
{/if}
