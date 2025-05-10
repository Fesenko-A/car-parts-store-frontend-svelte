<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import OrderDetails from "../../../components/OrderDetails.svelte";
  import { apiFetch } from "$lib";
  import toast from "svelte-french-toast";
  import { Spinner } from "flowbite-svelte";
  import { goto } from "$app/navigation";

  let order: any = null;
  let loading = true;
  let errorMessage = "";

  onMount(async () => {
    try {
      const { id } = $page.params;
      order = await apiFetch(`/orders/get/${id}`);
    } catch (err) {
      errorMessage = (err as Error).message;
      toast.error(errorMessage);
      goto("/user/myorders");
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>{order ? `Order #${order.id}` : "Loading order..."}</title>
</svelte:head>

{#if loading}
  <div class="flex">
    <Spinner size={12} class="mx-auto mt-5" />
  </div>
{:else if order}
  <OrderDetails {order} />
{/if}
