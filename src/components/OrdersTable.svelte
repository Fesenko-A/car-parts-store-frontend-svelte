<script lang="ts">
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { orders } from "../stores/fakeDatabase";

  let orderList: any[] = [];

  onMount(() => {
    orderList = get(orders);
  });

  function formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString("en-GB");
  }

  function formatCurrency(amount: number) {
    return `${amount.toFixed(2)} €`;
  }
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
    {#each orderList as order, index}
      <TableBodyRow class={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
        <TableBodyCell>{order.orderId}</TableBodyCell>
        <TableBodyCell>{formatDate(order.orderDate)}</TableBodyCell>
        <TableBodyCell>{formatDate(order.lastUpdate)}</TableBodyCell>
        <TableBodyCell>{order.status}</TableBodyCell>
        <TableBodyCell>{formatCurrency(order.orderTotal)}</TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
