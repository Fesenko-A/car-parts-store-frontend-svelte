<script lang="ts">
  import { Button, Pagination, Spinner } from "flowbite-svelte";
  import { FilterOutline } from "flowbite-svelte-icons";
  import ProductCard from "../components/ProductCard.svelte";
  import { onDestroy, onMount } from "svelte";
  import { apiFetch } from "../api";
  import { fade } from "svelte/transition";
  import { toQueryString } from "../utils/utils";
  import { productFilters } from "../stores/productFilters";
  import { get } from "svelte/store";
  import ProductFiltersDrawer from "../components/ProductFiltersDrawer.svelte";

  let productsData: any = null;
  let allRelatedBrands: any[] = [];
  let allRelatedSpecialTags: any[] = [];
  let loading = true;
  let filtersDrawerHidden: boolean = true;

  let categorySelected = false;

  let errorMessage = "";

  let unsubscribe: () => void;

  onMount(() => {
    loadInitialData();

    unsubscribe = productFilters.subscribe(() => {
      loadProducts();
    });
  });

  onDestroy(() => {
    unsubscribe?.();
  });

  async function loadInitialData() {
    try {
      await loadProducts();
    } catch (err) {
      errorMessage = (err as Error).message;
    } finally {
      loading = false;
    }
  }

  async function loadProducts() {
    try {
      loading = true;
      const filters = get(productFilters);
      const query = toQueryString(filters);
      productsData = await apiFetch(`/products/getAll?${query}`);

      if (filters.category) {
        categorySelected = true;
        if (filters.brands?.length === 0) {
          allRelatedBrands = productsData.relatedBrands;
        }
        if (filters.specialTags?.length === 0) {
          allRelatedSpecialTags = productsData.relatedSpecialTags;
        }
      } else {
        categorySelected = false;
        allRelatedBrands = [];
        allRelatedSpecialTags = [];
      }

      paginationHelper.start = (filters.pageNumber - 1) * filters.pageSize;
      paginationHelper.end = Math.min(
        filters.pageNumber * filters.pageSize,
        productsData.pagination.totalRecords
      );
      paginationHelper.total = productsData.pagination.totalRecords;
    } catch (err) {
      errorMessage = (err as Error).message;
    } finally {
      loading = false;
    }
  }

  const paginationHelper = {
    start: 0,
    end: 0,
    total: 0,
  };

  const next = async () => {
    const current = get(productFilters);
    if (paginationHelper.end < paginationHelper.total) {
      productFilters.set({ ...current, pageNumber: current.pageNumber + 1 });
    }
  };

  const previous = async () => {
    const current = get(productFilters);
    if (current.pageNumber > 1) {
      productFilters.set({ ...current, pageNumber: current.pageNumber - 1 });
    }
  };
</script>

<svelte:head>
  <title>DriveLine Car Products</title>
</svelte:head>

{#if !loading}
  <div class="m-3 flex items-center" transition:fade={{ duration: 500 }}>
    <Button on:click={() => (filtersDrawerHidden = false)}>
      <FilterOutline />
      Filters
    </Button>
  </div>
  <ProductFiltersDrawer
    bind:hidden={filtersDrawerHidden}
    {productsData}
    {loading}
    {categorySelected}
    {allRelatedBrands}
    {allRelatedSpecialTags}
  />
{/if}

{#if $productFilters.searchString.length > 0}
  <p class="text-center font-semibold text-lg">
    Search results for <span>"{$productFilters.searchString}"</span>
  </p>
{/if}

{#if loading}
  <div
    in:fade={{ duration: 200 }}
    out:fade={{ duration: 100 }}
    class="relative w-full"
  >
    <Spinner
      size="12"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    />
  </div>
{:else if productsData}
  <div
    transition:fade={{ duration: 500 }}
    class="grid 2xl:grid-cols-5 xl:grid-cols-4 xl:gap-4 xl:mx-28 lg:grid-cols-3 lg:gap-5 lg:mx-24 md:mx-20 sm:grid-cols-2 gap-4 mx-10 grid-cols-1 mt-5 mb-5 place-items-center"
  >
    {#each productsData.result as product}
      <ProductCard {product} />
    {/each}
  </div>

  <div class="flex flex-col items-center justify-center gap-2 mb-2">
    <div class="text-sm text-gray-700 dark:text-gray-400">
      Showing <span class="font-semibold text-gray-900 dark:text-white"
        >{paginationHelper.start}</span
      >
      to
      <span class="font-semibold text-gray-900 dark:text-white"
        >{paginationHelper.end}</span
      >
      of
      <span class="font-semibold text-gray-900 dark:text-white"
        >{paginationHelper.total}</span
      >
      Entries
    </div>

    <Pagination table on:previous={previous} on:next={next} pages={[]}>
      <span slot="prev">Prev</span>
    </Pagination>
  </div>
{:else}
  <p>{errorMessage || "Failed to load products"}</p>
{/if}
