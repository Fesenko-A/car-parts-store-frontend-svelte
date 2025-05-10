<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import {
    Button,
    ButtonGroup,
    Dropdown,
    DropdownItem,
    Input,
    Spinner,
  } from "flowbite-svelte";
  import {
    ChevronDownOutline,
    RefreshOutline,
    SearchOutline,
  } from "flowbite-svelte-icons";
  import OrdersTable from "../../../components/OrdersTable.svelte";
  import { ORDER_STATUS } from "../../../constants";
  import {
    orderFilters,
    resetOrderFilters,
  } from "../../../stores/orderFilters";
  import { apiFetch, checkIfAdmin, checkIfLoggedIn, toQueryString } from "$lib";
  import PaginationControl from "../../../components/PaginationControl.svelte";

  const orderStatuses = Object.values(ORDER_STATUS);
  let ordersData: any = null;
  let dropdownOpen = false;
  let isChecking = true;
  let loading = false;

  let errorMessage = "";
  let userId = "";
  let searchString = "";

  let unsubscribe: () => void;

  onMount(() => {
    if (!checkIfLoggedIn() || !checkIfAdmin()) return;
    isChecking = false;

    resetOrderFilters();
    loadOrders();

    unsubscribe = orderFilters.subscribe(() => {
      loadOrders();
    });

    return () => {
      unsubscribe?.();
    };
  });

  const handleSearchChange = async () => {
    const current = get(orderFilters);
    orderFilters.set({ ...current, searchString, pageNumber: 1 });
    await loadOrders();
  };

  const handleUserIdChange = async () => {
    const current = get(orderFilters);
    orderFilters.set({ ...current, userId, pageNumber: 1 });
    await loadOrders();
  };

  const selectStatus = async (status: string) => {
    const current = get(orderFilters);
    orderFilters.set({ ...current, status });
    dropdownOpen = false;
    await loadOrders();
  };

  const resetFilters = () => {
    resetOrderFilters();
    userId = "";
    searchString = "";
  };

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

  const paginationHelper = {
    start: 0,
    end: 0,
    total: 0,
  };
</script>

<svelte:head>
  <title>All orders</title>
</svelte:head>

{#if !isChecking}
  {#if !loading}
    <div
      class="flex flex-col sm:flex-row justify-end gap-2 p-2 rounded-lg shadow-sm"
    >
      <div class="w-full sm:w-auto">
        <Button class="px-3 h-10" on:click={resetFilters}>
          <RefreshOutline class="me-1.5" /> Reset filters
        </Button>
      </div>

      <div class="relative w-full sm:w-auto">
        <Button class="px-3 h-10">
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

      <div class="w-full h-10 sm:w-52">
        <ButtonGroup>
          <Input
            id="pickup-data"
            class="h-10 w-full px-3 rounded-l-lg"
            placeholder="Phone, name or email"
            bind:value={searchString}
            on:keydown={(e) => e.key === "Enter" && handleSearchChange()}
          />
          <Button color="primary" class="w-3" on:click={handleSearchChange}
            ><SearchOutline /></Button
          >
        </ButtonGroup>
      </div>

      <div class="w-full h-10 sm:w-36">
        <ButtonGroup>
          <Input
            id="user-id"
            class="h-10 w-full px-3 rounded-l-lg"
            placeholder="User ID"
            bind:value={userId}
            on:keydown={(e) => e.key === "Enter" && handleUserIdChange()}
          />
          <Button color="primary" class="w-3" on:click={handleUserIdChange}
            ><SearchOutline /></Button
          >
        </ButtonGroup>
      </div>
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
{/if}
