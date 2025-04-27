<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { orders } from "../../../stores/orderStore";
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { ChevronDownOutline } from "flowbite-svelte-icons";
  import OrdersTable from "../../../components/OrdersTable.svelte";
  import { ORDER_STATUS } from "../../../constants";
  import { Pagination } from "flowbite-svelte";
  import type { OrderFilters } from "../../../types";

  let helper = { start: 1, end: 10, total: 100 };
  let orderList: any[] = [];
  const orderStatuses = Object.values(ORDER_STATUS);
  let dropdownOpen = false;

  let filters: OrderFilters = {
    pageNumber: 1,
    pageSize: 5,
    status: "",
    userId: "",
  };

  onMount(() => {
    orderList = get(orders);
  });

  const selectStatus = (status: string) => {
    filters.status = status;
    dropdownOpen = false;
    console.log(filters);
  };
</script>

<div class="flex justify-end mt-1 me-1">
  <Button class="h-10">
    {#if filters.status === ""}
      Order status
    {:else}
      {filters.status}
    {/if}
    <ChevronDownOutline />
  </Button>
  <Dropdown bind:open={dropdownOpen}>
    {#each orderStatuses as status}
      <DropdownItem on:click={() => selectStatus(status)}>
        {status}
      </DropdownItem>
    {/each}
  </Dropdown>
</div>
<OrdersTable orders={orderList} />

<div class="flex flex-col items-center justify-center gap-2 mb-2">
  <div class="text-sm text-gray-700">
    Showing <span class="font-semibold text-gray-900">{helper.start}</span>
    to
    <span class="font-semibold text-gray-900">{helper.end}</span>
    of
    <span class="font-semibold text-gray-900">{helper.total}</span>
    Entries
  </div>

  <Pagination table pages={[]}>
    <span slot="prev">Prev</span>
  </Pagination>
</div>
