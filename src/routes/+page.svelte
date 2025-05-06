<script lang="ts">
  import {
    Button,
    Drawer,
    Sidebar,
    SidebarDropdownItem,
    SidebarDropdownWrapper,
    SidebarGroup,
    SidebarWrapper,
    Toggle,
    Tooltip,
    Pagination,
    Spinner,
  } from "flowbite-svelte";
  import {
    GridSolid,
    LabelSolid,
    TagSolid,
    FilterOutline,
    RefreshOutline,
    CloseOutline,
    SortOutline,
  } from "flowbite-svelte-icons";
  import { sineIn } from "svelte/easing";
  import ProductCard from "../components/ProductCard.svelte";
  import { onDestroy, onMount } from "svelte";
  import { apiFetch } from "../api";
  import { fade } from "svelte/transition";
  import { toQueryString } from "../utils/utils";
  import {
    productFilters,
    resetProductFilters,
  } from "../stores/productFilters";
  import { get } from "svelte/store";

  let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn,
  };
  let filtersDrawerHidden = true;
  let categoriesDropdownOpen = true;
  let brandsDropdownOpen = false;
  let specialTagsDropdownOpen = false;

  let productsData: any = null;
  let allRelatedBrands: any[] = [];
  let allRelatedSpecialTags: any[] = [];
  let loading = true;

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

  function resetFilters() {
    resetProductFilters();
    categoriesDropdownOpen = true;
    brandsDropdownOpen = false;
    specialTagsDropdownOpen = false;
  }

  function selectCategory(category: string) {
    const current = get(productFilters);
    productFilters.set({ ...current, category, pageNumber: 1 });
    categoriesDropdownOpen = false;
    brandsDropdownOpen = true;
  }

  function selectBrand(brand: string) {
    const current = get(productFilters);
    const currentBrands = current.brands ?? [];

    const updatedBrands = currentBrands.includes(brand)
      ? currentBrands.filter((b) => b !== brand)
      : [...currentBrands, brand];

    productFilters.set({ ...current, brands: updatedBrands, pageNumber: 1 });
  }

  function selectSpecialTag(specialTag: string) {
    const current = get(productFilters);
    const currentSpecialTags = current.specialTags ?? [];

    const updatedSpecialTags = currentSpecialTags.includes(specialTag)
      ? currentSpecialTags.filter((b) => b !== specialTag)
      : [...currentSpecialTags, specialTag];

    productFilters.set({
      ...current,
      specialTags: updatedSpecialTags,
      pageNumber: 1,
    });
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
{/if}
<Drawer
  transitionType="fly"
  {transitionParams}
  bind:hidden={filtersDrawerHidden}
  id="sidebar2"
>
  <div class="flex items-center">
    <h5
      id="drawer-navigation-label-3"
      class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
    >
      Filters
    </h5>
    <div class="dark:text-white ms-auto items-center">
      <Button on:click={resetFilters} class="w-2">
        <RefreshOutline />
      </Button>
      <Tooltip>Reset filters</Tooltip>
      <Button on:click={() => (filtersDrawerHidden = true)} class="w-2">
        <CloseOutline />
      </Button>
    </div>
  </div>
  <Sidebar>
    <SidebarWrapper
      divClass="overflow-y-auto py-4 px-3 rounded-sm dark:bg-gray-800"
    >
      <SidebarGroup>
        <SidebarDropdownWrapper
          bind:isOpen={categoriesDropdownOpen}
          label="Categories"
        >
          <svelte:fragment slot="icon">
            <GridSolid
              class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </svelte:fragment>
          {#if loading}
            <SidebarDropdownItem label="Loading..." />
          {:else if productsData}
            {#each productsData.relatedCategories as category}
              <SidebarDropdownItem
                label={category.name}
                on:click={() => selectCategory(category.name)}
              />
            {/each}
          {/if}
        </SidebarDropdownWrapper>
        {#if categorySelected}
          <SidebarDropdownWrapper
            label="Brands"
            bind:isOpen={brandsDropdownOpen}
          >
            <svelte:fragment slot="icon">
              <LabelSolid
                class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              />
            </svelte:fragment>
            {#if loading}
              <SidebarDropdownItem label="Loading..." />
            {:else if productsData}
              {#each allRelatedBrands as brand}
                <SidebarDropdownItem
                  label={brand.name}
                  on:click={() => selectBrand(brand.name)}
                />
              {/each}
            {/if}
          </SidebarDropdownWrapper>
          <SidebarDropdownWrapper
            label="Special Tags"
            bind:isOpen={specialTagsDropdownOpen}
          >
            <svelte:fragment slot="icon">
              <TagSolid
                class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              />
            </svelte:fragment>
            {#if loading}
              <SidebarDropdownItem label="Loading..." />
            {:else if productsData}
              {#each allRelatedSpecialTags as specialTag}
                <SidebarDropdownItem
                  label={specialTag.name}
                  on:click={() => selectSpecialTag(specialTag.name)}
                />
              {/each}
            {/if}
          </SidebarDropdownWrapper>
          <SidebarDropdownWrapper label="Sort by">
            <svelte:fragment slot="icon">
              <SortOutline
                class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              />
            </svelte:fragment>
            <SidebarDropdownItem label="Price: highest" />
            <SidebarDropdownItem label="Price: lowest" />
          </SidebarDropdownWrapper>
        {:else}
          <SidebarDropdownWrapper label="Brands" class="bg-gray-100" disabled>
            <svelte:fragment slot="icon">
              <LabelSolid
                class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              />
            </svelte:fragment>
          </SidebarDropdownWrapper>
          <Tooltip>Select category first</Tooltip><SidebarDropdownWrapper
            label="Special tags"
            class="bg-gray-100"
            disabled
          >
            <svelte:fragment slot="icon">
              <TagSolid
                class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              />
            </svelte:fragment>
          </SidebarDropdownWrapper>
          <Tooltip>Select category first</Tooltip>
          <SidebarDropdownWrapper label="Sort by" class="bg-gray-100" disabled>
            <svelte:fragment slot="icon">
              <SortOutline
                class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              />
            </svelte:fragment>
          </SidebarDropdownWrapper>
          <Tooltip>Select category first</Tooltip>
        {/if}

        <Toggle class="mt-3">Include out of stock</Toggle>
        <Toggle class="mt-3">Discount only</Toggle>
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
</Drawer>
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
