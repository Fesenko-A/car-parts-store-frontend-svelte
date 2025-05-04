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
  import { onMount } from "svelte";
  import { apiFetch } from "../api";
  import { fade } from "svelte/transition";
  import { toQueryString } from "../utils/utils";

  let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn,
  };
  let filtersDrawerHidden = true;
  let categoriesDropdownOpen = true;
  let brandsDropdownOpen = false;
  let specialTagsDropdownOpen = false;

  let categoriesData: any = null;
  let categoriesLoading = true;

  let brands: any = null;
  let brandsLoading = true;

  let specialTags: any = null;
  let specialTagsLoading = true;

  let products: any = null;
  let productsLoading = true;

  let errorMessage = "";

  onMount(async () => {
    try {
      loadProducts();
      loadCategories();
      loadBrands();
      loadSpecialTags();
    } catch (err) {
      errorMessage = (err as Error).message;
    } finally {
      productsLoading = false;
      categoriesLoading = false;
      brandsLoading = false;
      specialTagsLoading = false;
    }
  });

  const productFilters = {
    brands: [],
    category: "",
    specialTag: "",
    searchString: "",
    sortingOptions: "",
    pageNumber: 1,
    pageSize: 10,
    outOfStock: true,
    onlyWithDiscount: false,
  };

  async function loadProducts() {
    let query = toQueryString(productFilters);
    products = await apiFetch(`/products/getAll?${query}`);
    paginationHelper.start =
      (productFilters.pageNumber - 1) * productFilters.pageSize;
    paginationHelper.end = Math.min(
      productFilters.pageNumber * productFilters.pageSize,
      products.pagination.totalRecords
    );
    paginationHelper.total = products.pagination.totalRecords;
  }

  async function loadCategories() {
    categoriesData = await apiFetch("/category/getAll");
  }

  async function loadBrands() {
    brands = await apiFetch("/brand/getAll");
  }

  async function loadSpecialTags() {
    specialTags = await apiFetch("/specialTag/getAll");
  }

  let currentPage = 1;
  const paginationHelper = {
    start: 0,
    end: 0,
    total: 0,
  };

  const next = async () => {
    if (paginationHelper.end < paginationHelper.total) {
      currentPage += 1;
      productFilters.pageNumber = currentPage;
      productsLoading = true;
      await loadProducts();
      productsLoading = false;
    }
  };

  const previous = async () => {
    if (currentPage > 1) {
      currentPage -= 1;
      productFilters.pageNumber = currentPage;
      productsLoading = true;
      await loadProducts();
      productsLoading = false;
    }
  };
</script>

<svelte:head>
  <title>DriveLine Car Products</title>
</svelte:head>

<div class="m-3 flex items-center">
  <Button on:click={() => (filtersDrawerHidden = false)}>
    <FilterOutline />
    Filters
  </Button>
</div>
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
      <Button on:click={() => (filtersDrawerHidden = false)} class="w-2">
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
          isOpen={categoriesDropdownOpen}
          label="Categories"
        >
          <svelte:fragment slot="icon">
            <GridSolid
              class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </svelte:fragment>
          {#if categoriesLoading}
            <SidebarDropdownItem label="Loading..." />
          {:else if categoriesData}
            {#each categoriesData.data as category (category.id)}
              <SidebarDropdownItem label={category.name} />
            {/each}
          {/if}
        </SidebarDropdownWrapper>
        <SidebarDropdownWrapper label="Brands" isOpen={brandsDropdownOpen}>
          <svelte:fragment slot="icon">
            <LabelSolid
              class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </svelte:fragment>
          {#if brandsLoading}
            <SidebarDropdownItem label="Loading..." />
          {:else if brands}
            {#each brands.data as brand (brand.id)}
              <SidebarDropdownItem label={brand.name} />
            {/each}
          {/if}
        </SidebarDropdownWrapper>
        <SidebarDropdownWrapper
          label="Special Tags"
          isOpen={specialTagsDropdownOpen}
        >
          <svelte:fragment slot="icon">
            <TagSolid
              class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </svelte:fragment>
          {#if specialTagsLoading}
            <SidebarDropdownItem label="Loading..." />
          {:else if specialTags}
            {#each specialTags.data as specialTag (specialTag.id)}
              <SidebarDropdownItem label={specialTag.name} />
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
        <Toggle class="mt-3">Include out of stock</Toggle>
        <Toggle class="mt-3">Discount only</Toggle>
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
</Drawer>
<p class="text-center font-semibold text-lg">Search results for ...</p>

{#if productsLoading}
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
{:else if products}
  <div
    transition:fade={{ duration: 500 }}
    class="grid 2xl:grid-cols-5 xl:grid-cols-4 xl:gap-4 xl:mx-28 lg:grid-cols-3 lg:gap-5 lg:mx-24 md:mx-20 sm:grid-cols-2 gap-4 mx-10 grid-cols-1 mt-5 mb-5 place-items-center"
  >
    {#each products.data as product}
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
