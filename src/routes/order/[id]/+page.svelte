<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import OrderDetails from "../../../components/OrderDetails.svelte";
  import { getOrder } from "$lib";
  import { goto } from "$app/navigation";
  import toast from "svelte-french-toast";
  import CustomSpinner from "../../../components/CustomSpinner.svelte";

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
      toast.error((err as Error).message);
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
  <CustomSpinner />
{:else if order}
  <OrderDetails {order} />
{/if}
