<script lang="ts">
  import { Button, ButtonGroup, Input, Spinner } from "flowbite-svelte";
  import {
    PlusOutline,
    RefreshOutline,
    SearchOutline,
  } from "flowbite-svelte-icons";
  import { onDestroy, onMount } from "svelte";
  import {
    getAllBrands,
    getAllCategories,
    getAllProducts,
    getAllSpecialTags,
  } from "$lib";
  import ProductsTable from "../../../components/ProductsTable.svelte";
  import PaginationControl from "../../../components/PaginationControl.svelte";
  import {
    adminProductFilters,
    resetAdminProductFilters,
  } from "../../../stores/productFilters";
  import { get } from "svelte/store";
  import ProductUpsertDrawer from "../../../components/ProductUpsertDrawer.svelte";
  import toast from "svelte-french-toast";
  import CustomSpinner from "../../../components/CustomSpinner.svelte";

  let addDrawerHidden = true;
  let searchString: string = "";
  const filters = adminProductFilters;

  let products: any = null;
  let loading = true;

  let unsubscribe: () => void;

  onMount(async () => {
    await fetchAllData();

    unsubscribe = filters.subscribe(() => {
      fetchAllData();
    });
  });

  onDestroy(() => unsubscribe?.());

  const fetchAllData = async () => {
    loading = true;
    await Promise.all([loadProducts(), loadProductDetails()]);
    loading = false;
  };

  const loadProducts = async () => {
    try {
      products = await getAllProducts(get(filters));
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const loadProductDetails = async () => {
    try {
      await Promise.all([
        getAllBrands(),
        getAllCategories(),
        getAllSpecialTags(),
      ]);
    } catch {
      // error handled elsewhere
    }
  };

  const handleSearchChange = () => {
    const current = get(filters);
    filters.set({ ...current, searchString, pageNumber: 1 });
  };

  const resetFilters = () => {
    resetAdminProductFilters();
    searchString = "";
  };
</script>

<svelte:head>
  <title>All products</title>
</svelte:head>

{#if loading}
  <CustomSpinner />
{:else}
  <div
    class="flex flex-col sm:flex-row justify-end gap-2 p-2 rounded-lg shadow-sm"
  >
    <Button class="px-3 h-10" on:click={resetFilters}>
      <RefreshOutline class="me-1.5" /> Reset filters
    </Button>
    <ButtonGroup class="w-full md:w-1/4 h-10">
      <Input
        bind:value={searchString}
        placeholder="Search by product name"
        on:keydown={(e) => e.key === "Enter" && handleSearchChange()}
      />
      <Button color="primary" on:click={handleSearchChange}>
        <SearchOutline />
      </Button>
    </ButtonGroup>
    <Button class="h-10" on:click={() => (addDrawerHidden = false)}>
      Add <PlusOutline class="ms-1" />
    </Button>
  </div>

  {#if products && products.result?.length > 0}
    <ProductsTable products={products.result} on:productUpsert={loadProducts} />
    <PaginationControl
      totalRecords={products.pagination.totalRecords}
      {filters}
    />
  {:else}
    <p class="text-center">No products to display</p>
  {/if}

  <ProductUpsertDrawer
    bind:hidden={addDrawerHidden}
    mode="create"
    on:productUpsert={loadProducts}
  />
{/if}
