<script lang="ts">
  import { Button } from "flowbite-svelte";
  import { FilterOutline } from "flowbite-svelte-icons";
  import { onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { productFilters } from "../stores/productFilters";
  import { get } from "svelte/store";
  import ProductCard from "../components/ProductCard.svelte";
  import ProductFiltersDrawer from "../components/ProductFiltersDrawer.svelte";
  import PaginationControl from "../components/PaginationControl.svelte";
  import { getAllProducts } from "$lib";
  import toast from "svelte-french-toast";
  import CustomSpinner from "../components/CustomSpinner.svelte";

  let productsData: any = null;
  let allRelatedBrands: any[] = [];
  let allRelatedSpecialTags: any[] = [];

  let loading = true;
  let filtersDrawerHidden: boolean = true;
  let categorySelected = false;

  let unsubscribe: () => void;

  onMount(async () => {
    await loadProducts();

    unsubscribe = productFilters.subscribe(() => {
      loadProducts();
    });
  });

  onDestroy(() => unsubscribe?.());

  const loadProducts = async () => {
    loading = true;
    try {
      productsData = await getAllProducts();
      getOrderDetails();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      loading = false;
    }
  };

  const getOrderDetails = () => {
    const filters = get(productFilters);
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
  };
</script>

<svelte:head>
  <title>DriveLine Car Products</title>
</svelte:head>

{#if $productFilters.searchString.length > 0}
  <p class="text-center font-semibold text-lg mt-5">
    Search results for <span>"{$productFilters.searchString}"</span>
  </p>
{/if}

{#if loading}
  <CustomSpinner />
{:else}
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
  {#if productsData.result.length > 0}
    <div
      transition:fade={{ duration: 500 }}
      class="grid 2xl:grid-cols-5 xl:grid-cols-4 xl:gap-4 xl:mx-28 lg:grid-cols-3 lg:gap-5 lg:mx-24 md:mx-20 sm:grid-cols-2 gap-4 mx-10 grid-cols-1 mt-5 mb-5 place-items-center"
    >
      {#each productsData.result as product}
        <ProductCard {product} />
      {/each}
    </div>
    <PaginationControl
      filters={productFilters}
      totalRecords={productsData.pagination.totalRecords}
    />
  {:else}
    <p class="text-center">
      No products to display :( Try to apply different filters
    </p>
  {/if}
{/if}
