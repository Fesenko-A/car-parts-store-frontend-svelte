<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { Button, Dropdown, DropdownItem, Spinner } from "flowbite-svelte";
  import { ChevronDownOutline, RefreshOutline } from "flowbite-svelte-icons";
  import { ORDER_STATUS } from "../../../constants";
  import {
    orderFilters,
    resetOrderFilters,
  } from "../../../stores/orderFilters";
  import { user } from "../../../stores/userStore";
  import { apiFetch, checkIfLoggedIn, toQueryString } from "$lib";
  import OrdersTable from "../../../components/OrdersTable.svelte";
  import PaginationControl from "../../../components/PaginationControl.svelte";

  const orderStatuses = Object.values(ORDER_STATUS);
  let ordersData: any = null;
  let dropdownOpen = false;
  let loading = false;
  let isChecking = true;

  let errorMessage = "";

  let unsubscribe: () => void;

  const loadOrders = async () => {
    try {
      const filters = get(orderFilters);
      const query = toQueryString(filters);
      loading = true;
      ordersData = await apiFetch(`/orders/getAll?${query}`);
      paginationHelper.start = (filters.pageNumber - 1) * filters.pageSize;
      paginationHelper.end = Math.min(
        filters.pageNumber * filters.pageSize,
        ordersData.pagination.totalRecords
      );
      paginationHelper.total = ordersData.pagination.totalRecords;
    } catch (err) {
      errorMessage = (err as Error).message;
    } finally {
      loading = false;
    }
  };

  const resetFilters = () => {
    resetOrderFilters(get(user)!.id);
  };

  const selectStatus = async (status: string) => {
    const current = get(orderFilters);
    orderFilters.set({ ...current, status });
    dropdownOpen = false;
    await loadOrders();
  };

  onMount(() => {
    if (!checkIfLoggedIn()) return;
    isChecking = false;

    orderFilters.set({ ...get(orderFilters), userId: get(user)!.id });
    loadOrders();

    unsubscribe = orderFilters.subscribe(() => {
      loadOrders();
    });

    return () => {
      unsubscribe?.();
    };
  });

  const paginationHelper = {
    start: 0,
    end: 0,
    total: 0,
  };
</script>

<svelte:head>
  <title>My orders</title>
</svelte:head>

{#if !isChecking && !loading}
  <div class="flex justify-end mt-1 me-1">
    <Button class="me-1 px-3" on:click={resetFilters}>
      <RefreshOutline class="me-1.5" /> Reset filters
    </Button>
    <Button class="px-3">
      {#if $orderFilters.status == ""}
        Order status
      {:else}
        {$orderFilters.status}
      {/if}
      <ChevronDownOutline class="ms-1.5" />
    </Button>
    <Dropdown bind:open={dropdownOpen}>
      {#each orderStatuses as status}
        <DropdownItem on:click={() => selectStatus(status)}>
          {status}
        </DropdownItem>
      {/each}
    </Dropdown>
  </div>

  {#if ordersData.result.length > 0}
    <OrdersTable orders={ordersData.result} />
    <PaginationControl {paginationHelper} filters={orderFilters} />
  {:else}
    <p class="text-center text-lg mt-4">Nothing to display</p>
  {/if}
{:else}
  <div class="flex">
    <Spinner size={12} class="mx-auto mt-20" />
  </div>
{/if}
