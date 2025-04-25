<script lang="ts">
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
    Button,
    Input,
  } from "flowbite-svelte";
  import {
    CartOutline,
    InfoCircleOutline,
    RectangleListSolid,
    SearchOutline,
    UserCircleSolid,
  } from "flowbite-svelte-icons";

  let searchQuery = $state("");
  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // TODO: Add search logic
    }
  };

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
</script>

<Navbar fluid class="flex items-center justify-between flex-wrap px-4">
  <!-- Logo -->
  <div class="flex items-center min-w-0">
    <NavBrand href="/" class="flex items-center">
      <img src="/driveline.png" class="me-3 h-6 sm:h-9" alt="DriveLine Logo" />
    </NavBrand>
  </div>

  <!-- Search -->
  <div class="flex-1 flex justify-center px-2 min-w-0">
    <div class="relative w-full max-w-md">
      <div
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <SearchOutline class="w-4 h-4 text-gray-500 dark:text-gray-400" />
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

  <!-- Icons -->
  <div class="flex items-center justify-end space-x-2 min-w-0">
    <!-- Mobile Cart Icon  -->
    <Button
      color="none"
      data-collapse-toggle="mobile-menu-3"
      aria-controls="mobile-menu-3"
      aria-expanded="false"
      class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
    >
      <CartOutline size="lg" />
    </Button>

    <NavHamburger />
  </div>
  <NavUl class="items-center space-x-3">
    <NavLi href="/" class="flex items-center">
      <CartOutline size="lg" />
      <span class="block md:hidden ps-2">Cart</span>
    </NavLi>
    <NavLi href="/" class="flex items-center">
      <InfoCircleOutline size="lg" />
      <span class="block md:hidden ps-2">About</span>
    </NavLi>
    <NavLi href="/user/myorders" class="flex items-center">
      <RectangleListSolid size="lg" />
      <span class="block md:hidden ps-2">My orders</span></NavLi
    >
    <NavLi href="/" class="flex items-center">
      <UserCircleSolid size="lg" />
      <span class="block md:hidden ps-2">Profile</span></NavLi
    >
  </NavUl>
</Navbar>
