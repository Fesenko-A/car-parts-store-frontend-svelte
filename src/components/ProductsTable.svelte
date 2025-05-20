<script lang="ts">
  import {
    Button,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import { EditOutline } from "flowbite-svelte-icons";
  import type { Product } from "../types";
  import ProductUpsertDrawer from "./ProductUpsertDrawer.svelte";
  import { formatCurrency } from "$lib";
  import { createEventDispatcher } from "svelte";

  export let products: Product[];

  let updateDrawerHidden = true;
  let selectedProduct: Product | null = null;

  const dispatch = createEventDispatcher();

  const handleUpsert = () => {
    updateDrawerHidden = true;
    dispatch("productUpsert");
  };
</script>

<Table hoverable={true} striped={true}>
  <TableHead>
    <TableHeadCell>Id</TableHeadCell>
    <TableHeadCell>Product name</TableHeadCell>
    <TableHeadCell>Description</TableHeadCell>
    <TableHeadCell>Category</TableHeadCell>
    <TableHeadCell>Brand</TableHeadCell>
    <TableHeadCell>In stock</TableHeadCell>
    <TableHeadCell>Special tag</TableHeadCell>
    <TableHeadCell>Initial price</TableHeadCell>
    <TableHeadCell>Discount</TableHeadCell>
    <TableHeadCell>Final price</TableHeadCell>
    <TableHeadCell>Actions</TableHeadCell>
  </TableHead>
  <TableBody tableBodyClass="divide-y">
    {#each products as product}
      <TableBodyRow>
        <TableBodyCell>{product.id}</TableBodyCell>
        <TableBodyCell>
          <a href="/product/{product.id}">
            {product.name.length > 50
              ? product.name.slice(0, 50) + "..."
              : product.name}
          </a>
        </TableBodyCell>
        <TableBodyCell>
          {product.description.length > 30
            ? product.description.slice(0, 30) + "..."
            : product.description}
        </TableBodyCell>
        <TableBodyCell>{product.category.name}</TableBodyCell>
        <TableBodyCell>{product.brand.name}</TableBodyCell>
        <TableBodyCell>{product.inStock ? "Yes" : "No"}</TableBodyCell>
        <TableBodyCell>{product.specialTag?.name}</TableBodyCell>
        <TableBodyCell>{formatCurrency(product.initialPrice)}</TableBodyCell>
        <TableBodyCell
          >{product.discountPercentage > 0
            ? product.discountPercentage + "%"
            : "No"}</TableBodyCell
        >
        <TableBodyCell>{formatCurrency(product.finalPrice)}</TableBodyCell>
        <TableBodyCell>
          <Button
            color="none"
            on:click={() => {
              selectedProduct = product;
              updateDrawerHidden = false;
            }}
          >
            Edit
            <EditOutline class="ms-2" />
          </Button>
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>

{#if selectedProduct}
  <ProductUpsertDrawer
    bind:hidden={updateDrawerHidden}
    {selectedProduct}
    on:productUpsert={handleUpsert}
    mode="update"
  />
{/if}
