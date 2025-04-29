<script lang="ts">
  import {
    Button,
    ButtonGroup,
    Input,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import { products } from "../../../stores/productStore";
  import type { Product } from "../../../types";
  import { formatCurrency } from "../../../utils/utils";
  import {
    EditOutline,
    PlusOutline,
    SearchOutline,
  } from "flowbite-svelte-icons";
  import ProductUpsertDrawer from "../../../components/ProductUpsertDrawer.svelte";

  let selectedProduct: Product;
  let hidden = true;
  let searchQuery: string = "";

  let productsList: Product[] = [];
  $: $products, (productsList = $products);

  function handleSearch() {
    console.log(searchQuery);
  }
</script>

<div
  class="flex flex-col sm:flex-row justify-end gap-2 p-2 rounded-lg shadow-sm"
>
  <ButtonGroup class="w-1/4 h-10">
    <Input bind:value={searchQuery} placeholder="Search by product name" />
    <Button color="primary" on:click={handleSearch}><SearchOutline /></Button>
  </ButtonGroup>

  <Button class="h-10" on:click={() => (hidden = false)}>
    Add <PlusOutline class="ms-1" />
  </Button>
</div>
<Table hoverable={true} striped={true}>
  <TableHead>
    <TableHeadCell>Id</TableHeadCell>
    <TableHeadCell sort={() => 0}>PRODUCT NAME</TableHeadCell>
    <TableHeadCell>Description</TableHeadCell>
    <TableHeadCell>Category</TableHeadCell>
    <TableHeadCell>Brand</TableHeadCell>
    <TableHeadCell>In stock</TableHeadCell>
    <TableHeadCell>Special tag</TableHeadCell>
    <TableHeadCell>Initial price</TableHeadCell>
    <TableHeadCell>Discount</TableHeadCell>
    <TableHeadCell sort={() => 0}>FINAL PRICE</TableHeadCell>
    <TableHeadCell>Actions</TableHeadCell>
  </TableHead>
  <TableBody tableBodyClass="divide-y">
    {#each productsList as product}
      <TableBodyRow>
        <TableBodyCell>{product.id}</TableBodyCell>
        <TableBodyCell
          >{product.name.length > 50
            ? product.name.slice(0, 50) + "..."
            : product.name}</TableBodyCell
        >
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
              hidden = false;
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

<ProductUpsertDrawer bind:hidden {selectedProduct} />
