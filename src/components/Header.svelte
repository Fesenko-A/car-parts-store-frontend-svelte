<script lang="ts">
  import {
    Navbar,
    NavLi,
    NavUl,
    NavHamburger,
    Button,
    Input,
  } from "flowbite-svelte";
  import {
    ArrowLeftToBracketOutline,
    CartOutline,
    InfoCircleOutline,
    RectangleListSolid,
    SearchOutline,
    UserCircleSolid,
  } from "flowbite-svelte-icons";
  import {
    productFilters,
    resetProductFilters,
  } from "../stores/productFilters";
  import { get } from "svelte/store";
  import { goto } from "$app/navigation";
  import { user } from "../stores/userStore";

  let searchQuery = "";

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const current = get(productFilters);
      productFilters.set({
        ...current,
        searchString: searchQuery,
        pageNumber: 1,
      });
    }
  };

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleLogoClick = () => {
    resetProductFilters();
    searchQuery = "";
    goto("/");
  };
</script>

<Navbar
  fluid
  class="flex items-center justify-between flex-wrap px-4 bg-slate-800"
>
  <div class="flex items-center min-w-0">
    <a
      href="/"
      class="flex items-center"
      on:click|preventDefault={handleLogoClick}
      role="button"
      aria-label="Go to home page"
    >
      <img src="/driveline.png" class="me-3 h-6 sm:h-9" alt="DriveLine Logo" />
    </a>
  </div>

  <div class="flex-1 flex justify-center px-2 min-w-0">
    <div class="relative w-full max-w-md">
      <div
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <SearchOutline class="w-4 h-4 text-gray-400" />
      </div>
      <Input
        id="search-navbar"
        class="ps-10 w-full"
        placeholder="I am looking for..."
        bind:value={searchQuery}
        on:keydown={handleKey}
      />
    </div>
  </div>

  <div class="flex items-center justify-end space-x-2 min-w-0">
    <Button
      color="none"
      data-collapse-toggle="mobile-menu-3"
      aria-controls="mobile-menu-3"
      aria-expanded="false"
      class="md:hidden header-button p-2.5"
      href="/shoppingCart"
    >
      <CartOutline size="lg" />
    </Button>

    <NavHamburger class="header-button hover:bg-slate-800" />
  </div>

  <NavUl class="items-center space-x-3">
    {#if $user}
      <NavLi href="/shoppingCart" class="flex items-center">
        <CartOutline size="lg" class="hidden md:block header-button" />
        <span class="block md:hidden ps-2">Cart</span>
      </NavLi>
      <NavLi href="/" class="flex items-center">
        <InfoCircleOutline size="lg" class="hidden md:block header-button" />
        <span class="block md:hidden ps-2">About</span>
      </NavLi>
      <NavLi href="/user/myorders" class="flex items-center">
        <RectangleListSolid size="lg" class="hidden md:block header-button" />
        <span class="block md:hidden ps-2">My orders</span></NavLi
      >
      <NavLi href="/user/profile" class="flex items-center">
        <UserCircleSolid size="lg" class="hidden md:block header-button" />
        <span class="block md:hidden ps-2">Profile</span>
      </NavLi>
    {:else}
      <NavLi href="/login" class="flex items-center">
        <CartOutline size="lg" class="hidden md:block header-button" />
        <span class="block md:hidden ps-2">Cart</span>
      </NavLi>
      <NavLi href="/" class="flex items-center">
        <InfoCircleOutline size="lg" class="hidden md:block header-button" />
        <span class="block md:hidden ps-2">About</span>
      </NavLi>
      <NavLi href="/login" class="flex items-center">
        <RectangleListSolid size="lg" class="hidden md:block header-button" />
        <span class="block md:hidden ps-2">My orders</span></NavLi
      >
      <NavLi href="/login" class="flex items-center">
        <ArrowLeftToBracketOutline
          size="lg"
          class="hidden md:block header-button"
        />
        <span class="block md:hidden ps-2">Login or register</span>
      </NavLi>
    {/if}
  </NavUl>
</Navbar>
