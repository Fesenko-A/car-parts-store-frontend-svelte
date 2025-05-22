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
  import type { Brand, Category, SpecialTag } from "../types";
  import {
    brands,
    categories,
    specialTags,
  } from "../stores/productDetailsStore";
  import ProductDetailsCreateModal from "./ProductDetailsCreateModal.svelte";
  import ProductDetailsDeleteModal from "./ProductDetailsDeleteModal.svelte";
  import { PlusOutline, TrashBinOutline } from "flowbite-svelte-icons";

  export let type: "brand" | "category" | "special tag";

  let productDetailsList: (Brand | Category | SpecialTag)[] = [];

  let deleteModal = false;
  let addModal = false;

  let selectedProductDetail: any;

  $: {
    switch (type) {
      case "brand":
        $brands && (productDetailsList = $brands);
        break;
      case "category":
        $categories && (productDetailsList = $categories);
        break;
      case "special tag":
        $specialTags && (productDetailsList = $specialTags);
        break;
    }
  }

  const deleteProductDetail = (productDetail: any) => {
    deleteModal = true;
    selectedProductDetail = productDetail;
  };
</script>

<Table hoverable={true} striped={true} shadow>
  <TableHead class="dark:bg-gray-200 dark:text-black">
    <TableHeadCell>ID</TableHeadCell>
    <TableHeadCell>Name</TableHeadCell>
    <TableHeadCell>Action</TableHeadCell>
  </TableHead>
  <TableBody tableBodyClass="divide-y">
    {#each productDetailsList as productDetail}
      <TableBodyRow>
        <TableBodyCell>{productDetail.id}</TableBodyCell>
        <TableBodyCell>{productDetail.name}</TableBodyCell>
        <TableBodyCell>
          <Button
            color="alternative"
            on:click={() => deleteProductDetail(productDetail)}
          >
            <TrashBinOutline class="me-2" color="#d30000" />
            Delete
          </Button>
        </TableBodyCell>
      </TableBodyRow>
    {/each}
    <TableBodyRow>
      <TableBodyCell colspan={2}></TableBodyCell>
      <TableBodyCell>
        <Button color="alternative" on:click={() => (addModal = true)}>
          <PlusOutline class="me-2" />
          Add new
        </Button>
      </TableBodyCell>
    </TableBodyRow>
  </TableBody>
</Table>

<ProductDetailsDeleteModal
  bind:open={deleteModal}
  productDetail={selectedProductDetail}
  {type}
/>

<ProductDetailsCreateModal bind:open={addModal} {type} />
