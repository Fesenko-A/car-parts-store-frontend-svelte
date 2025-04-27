<script lang="ts">
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import { formatCurrency, formatDate } from "../utils/utils";
  import { goto } from "$app/navigation";

  export let orders: any[] = [];

  const navigateToDetails = (id: number) => {
    goto(`/order/${id}`);
  };
</script>

<Table hoverable={true} striped={true} class="mt-5 mb-5">
  <TableHead>
    <TableHeadCell>Order ID</TableHeadCell>
    <TableHeadCell>Order Date</TableHeadCell>
    <TableHeadCell>Last Updated</TableHeadCell>
    <TableHeadCell>Status</TableHeadCell>
    <TableHeadCell>Total Price</TableHeadCell>
  </TableHead>
  <TableBody tableBodyClass="divide-y">
    {#each orders as order}
      <TableBodyRow on:click={() => navigateToDetails(order.orderId)}>
        <TableBodyCell>{order.orderId}</TableBodyCell>
        <TableBodyCell>{formatDate(order.orderDate)}</TableBodyCell>
        <TableBodyCell>{formatDate(order.lastUpdate)}</TableBodyCell>
        <TableBodyCell>{order.status}</TableBodyCell>
        <TableBodyCell>{formatCurrency(order.orderTotal)}</TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
