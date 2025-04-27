<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { orders } from "../../../stores/orderStore";
  import { Button, Dropdown, DropdownItem, Input } from "flowbite-svelte";
  import { ArrowRightOutline, ChevronDownOutline } from "flowbite-svelte-icons";
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
    searchString: "",
    userId: "",
  };

  onMount(() => {
    orderList = get(orders);
  });

  const handleSearchChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    filters.searchString = target.value.trim();
  };

  const handleUserIdChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    filters.userId = target.value.trim();
  };

  const selectStatus = (status: string) => {
    filters.status = status;
    dropdownOpen = false;
  };

  const applyFilters = () => {
    console.log(filters);
  };
</script>

<div
  class="flex flex-col sm:flex-row justify-end gap-2 p-2 rounded-lg shadow-sm"
>
  <div class="relative w-full sm:w-auto">
    <Button
      class="h-10 w-full sm:w-auto px-4 rounded-lg flex items-center justify-between gap-2"
    >
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

  <div class="w-full sm:w-48">
    <Input
      id="pickup-data"
      class="h-10 w-full px-3 rounded-lg"
      placeholder="Phone, name or email"
      on:blur={handleSearchChange}
      bind:value={filters.searchString}
    />
  </div>

  <div class="w-full sm:w-32">
    <Input
      id="user-id"
      class="h-10 w-full px-3 rounded-lg"
      placeholder="User ID"
      on:blur={handleUserIdChange}
      bind:value={filters.userId}
    />
  </div>
  <Button class="h-10" on:click={applyFilters}>
    Apply
    <ArrowRightOutline />
  </Button>
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
