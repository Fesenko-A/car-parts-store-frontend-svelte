<script lang="ts">
  import { page } from "$app/stores";
  import OrderDetails from "../../../components/OrderDetails.svelte";
  import { orders } from "../../../stores/orderStore";

  let order: any;

  $: {
    const { id } = $page.params;
    const ordersList = $orders;
    order = ordersList.find((o) => o.orderId === parseInt(id));
  }
</script>

<OrderDetails {order} />
