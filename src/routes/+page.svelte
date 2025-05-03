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
  import type { Product, Brand, Category, SpecialTag } from "../types";
  import {
    brands,
    specialTags,
    categories,
  } from "../stores/productDetailsStore";
  import { onMount } from "svelte";
  import { apiFetch } from "../api";
  import { fade } from "svelte/transition";

  let hidden2 = true;
  let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn,
  };

  let productsData: any = null;
  let productsLoading = true;
  let errorMessage = "";

  onMount(async () => {
    try {
      productsData = await apiFetch("/products/getAll");
    } catch (err) {
      errorMessage = (err as Error).message;
    } finally {
      productsLoading = false;
    }
    console.log(productsData);
  });

  let brandsList: Brand[] = [];
  let specialTagsList: SpecialTag[] = [];
  let categoriesList: Category[] = [];

  $: $brands, (brandsList = $brands);
  $: $specialTags, (specialTagsList = $specialTags);
  $: $categories, (categoriesList = $brands);
  let helper = { start: 1, end: 10, total: 100 };
</script>

<svelte:head>
  <title>DriveLine Car Products</title>
</svelte:head>

<div class="m-3 flex items-center">
  <Button on:click={() => (hidden2 = false)}>
    <FilterOutline />
    Filters
  </Button>
  <span class="ms-3">Found <span class="font-semibold">100</span> products</span
  >
</div>
<Drawer
  transitionType="fly"
  {transitionParams}
  bind:hidden={hidden2}
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
      <Button on:click={() => (hidden2 = false)} class="w-2">
        <RefreshOutline />
      </Button>
      <Tooltip>Reset filters</Tooltip>
      <Button on:click={() => (hidden2 = true)} class="w-2">
        <CloseOutline />
      </Button>
    </div>
  </div>
  <Sidebar>
    <SidebarWrapper
      divClass="overflow-y-auto py-4 px-3 rounded-sm dark:bg-gray-800"
    >
      <SidebarGroup>
        <SidebarDropdownWrapper label="Categories">
          <svelte:fragment slot="icon">
            <GridSolid
              class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </svelte:fragment>
          {#each categoriesList as category (category.id)}
            <SidebarDropdownItem label={category.name} />
          {/each}
        </SidebarDropdownWrapper>
        <SidebarDropdownWrapper label="Brands">
          <svelte:fragment slot="icon">
            <LabelSolid
              class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </svelte:fragment>
          {#each brandsList as brand (brand.id)}
            <SidebarDropdownItem label={brand.name} />
          {/each}
        </SidebarDropdownWrapper>
        <SidebarDropdownWrapper label="Special Tags">
          <svelte:fragment slot="icon">
            <TagSolid
              class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </svelte:fragment>
          {#each specialTagsList as specialTag (specialTag.id)}
            <SidebarDropdownItem label={specialTag.name} />
          {/each}
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
  <p>Loading products...</p>
{:else if productsData}
  <div
    transition:fade={{ duration: 300 }}
    class="grid 2xl:grid-cols-5 xl:grid-cols-4 xl:gap-4 xl:mx-28 lg:grid-cols-3 lg:gap-5 lg:mx-24 md:mx-20 sm:grid-cols-2 gap-4 mx-10 grid-cols-1 mt-5 mb-5 place-items-center"
  >
    {#each productsData.result as product}
      <ProductCard {product} />
    {/each}
  </div>
{:else}
  <p>{errorMessage || "Failed to load products"}</p>
{/if}

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
