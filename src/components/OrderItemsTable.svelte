<script>
  import { formatCurrency } from "$lib";
  import {
    Table,
    TableHead,
    TableHeadCell,
    TableBody,
    TableBodyRow,
    TableBodyCell,
  } from "flowbite-svelte";

  export let order;
</script>

<Table striped={true} hoverable={true} class="mb-5">
  <TableHead>
    <TableHeadCell>Product</TableHeadCell>
    <TableHeadCell>Price per Unit</TableHeadCell>
    <TableHeadCell>Quantity</TableHeadCell>
    <TableHeadCell>Total</TableHeadCell>
  </TableHead>
  <TableBody tableBodyClass="divide-y">
    {#each order.orderDetails as detail}
      <TableBodyRow>
        <TableBodyCell>{detail.productNameAtOrder}</TableBodyCell>
        <TableBodyCell
          >{formatCurrency(detail.productPriceAtOrder)}</TableBodyCell
        >
        <TableBodyCell>{detail.quantity}</TableBodyCell>
        <TableBodyCell>{formatCurrency(detail.price)}</TableBodyCell>
      </TableBodyRow>
    {/each}</TableBody
  >
  <tfoot>
    <tr class="font-semibold text-gray-900">
      <th scope="row" class="py-3 px-6 text-base" colspan="2">Total</th>
      <td class="py-3 px-6 font-bold">{order.totalItems}</td>
      <td class="py-3 px-6 font-bold">{formatCurrency(order.orderTotal)}</td>
    </tr>
  </tfoot>
</Table>
