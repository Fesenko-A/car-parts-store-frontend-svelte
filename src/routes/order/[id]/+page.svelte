<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import OrderDetails from "../../../components/OrderDetails.svelte";
  import { getOrder } from "$lib";
  import { Spinner } from "flowbite-svelte";
  import { goto } from "$app/navigation";

  let order: any = null;
  let loading = true;

  onMount(async () => {
    loading = true;
    try {
      const { id } = $page.params;
      const numericId = Number(id);
      if (isNaN(numericId)) {
        throw new Error("Invalid order ID");
      }

      order = await getOrder(numericId);
    } catch (err) {
      goto("/user/myorders");
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>{order ? `Order #${order.orderId}` : "Loading order..."}</title>
</svelte:head>

{#if loading}
  <div class="flex">
    <Spinner size={12} class="mx-auto mt-5" />
  </div>
{:else if order}
  <OrderDetails {order} />
{/if}
