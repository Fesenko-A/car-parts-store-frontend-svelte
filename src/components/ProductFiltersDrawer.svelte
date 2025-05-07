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
  } from "flowbite-svelte";
  import {
    CloseOutline,
    GridSolid,
    LabelSolid,
    RefreshOutline,
    SortOutline,
    TagSolid,
  } from "flowbite-svelte-icons";
  import { sineIn } from "svelte/easing";
  import {
    productFilters,
    resetProductFilters,
  } from "../stores/productFilters";
  import { get } from "svelte/store";
  import { SORTING_FILTERS } from "../constants";

  export let hidden: boolean = true;
  export let productsData: any = null;
  export let loading: boolean = false;
  export let categorySelected: boolean = false;
  export let allRelatedBrands: any[] = [];
  export let allRelatedSpecialTags: any[] = [];

  const sortingFilters = Object.values(SORTING_FILTERS);

  $productFilters;

  let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn,
  };

  let filtersDrawerHidden = true;
  let categoriesDropdownOpen = true;
  let brandsDropdownOpen = false;
  let specialTagsDropdownOpen = false;
  let sortByDropdownOpen = false;

  function resetFilters() {
    resetProductFilters();
    categoriesDropdownOpen = true;
    brandsDropdownOpen = false;
    specialTagsDropdownOpen = false;
    sortByDropdownOpen = false;
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

  function selectSortingOption(sortingOptions: string) {
    const current = get(productFilters);
    productFilters.set({ ...current, sortingOptions, pageNumber: 1 });
  }

  function includeOutOfStock() {
    const current = get(productFilters);
    productFilters.set({
      ...current,
      outOfStock: !current.outOfStock,
      pageNumber: 1,
    });
  }

  function toggleDiscountOnly() {
    const current = get(productFilters);
    productFilters.set({
      ...current,
      onlyWithDiscount: !current.onlyWithDiscount,
      pageNumber: 1,
    });
  }
</script>

<Drawer transitionType="fly" {transitionParams} bind:hidden id="filtersSidebar">
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
                class={$productFilters.category?.includes(category.name)
                  ? "bg-blue-100 dark:bg-blue-900"
                  : ""}
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
                  class={$productFilters.brands?.includes(brand.name)
                    ? "bg-blue-100 dark:bg-blue-900"
                    : ""}
                />
              {/each}
            {/if}
          </SidebarDropdownWrapper>
          {#if allRelatedSpecialTags.length > 0}
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
                    class={$productFilters.specialTags?.includes(
                      specialTag.name
                    )
                      ? "bg-blue-100 dark:bg-blue-900"
                      : ""}
                  />
                {/each}
              {/if}
            </SidebarDropdownWrapper>
          {/if}
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
        {/if}

        <SidebarDropdownWrapper
          label="Sort by"
          bind:isOpen={sortByDropdownOpen}
        >
          <svelte:fragment slot="icon">
            <SortOutline
              class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            />
          </svelte:fragment>
          {#each sortingFilters as sortingFilter}
            <SidebarDropdownItem
              label={sortingFilter}
              on:click={() => selectSortingOption(sortingFilter)}
              class={$productFilters.sortingOptions?.includes(sortingFilter)
                ? "bg-blue-100 dark:bg-blue-900"
                : ""}
            />
          {/each}
        </SidebarDropdownWrapper>
        <Toggle
          class="mt-3"
          bind:checked={$productFilters.outOfStock}
          on:click={includeOutOfStock}>Include out of stock</Toggle
        >
        <Toggle
          class="mt-3"
          bind:checked={$productFilters.onlyWithDiscount}
          on:click={toggleDiscountOnly}>Discount only</Toggle
        >
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
</Drawer>
