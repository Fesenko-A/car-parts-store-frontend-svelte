<script lang="ts">
  import { onMount } from "svelte";
  import { checkIfAdmin, checkIfLoggedIn } from "$lib";
  import CustomSpinner from "../../components/CustomSpinner.svelte";

  let isChecking = true;

  onMount(() => {
    if (!checkIfLoggedIn() || !checkIfAdmin()) return;
    isChecking = false;
  });
</script>

<svelte:head>
  <title>Admin panel</title>
</svelte:head>

{#if !isChecking}
  <div class="m-3">
    <h2 class="text-2xl font-bold mb-4">Admin panel</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <a href="/admin/products">
        <div class="bg-gray-100 p-4 rounded-lg h-20 flex shadow-lg">
          <p class="text-lg font-medium m-auto">Products</p>
        </div>
      </a>
      <a href="/admin/allOrders">
        <div class="bg-gray-100 p-4 rounded-lg h-20 flex shadow-lg">
          <p class="text-lg font-medium m-auto">Orders</p>
        </div>
      </a>
      <a href="/admin/productDetails">
        <div class="bg-gray-100 p-4 rounded-lg h-20 flex shadow-lg">
          <p class="text-lg font-medium m-auto">Product Details</p>
        </div>
      </a>
    </div>
  </div>
{:else}
  <CustomSpinner />
{/if}
