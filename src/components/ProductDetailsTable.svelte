<script lang="ts">
  import {
    Button,
    Modal,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import { ExclamationCircleOutline } from "flowbite-svelte-icons";
  import type { Brand, Category, SpecialTag } from "../types";
  import {
    brands,
    categories,
    specialTags,
  } from "../stores/productDetailsStore";
  import ProductDetailsCreateModal from "./ProductDetailsCreateModal.svelte";

  export let type: "brand" | "category" | "special tag";

  let productDetailsList: (Brand | Category | SpecialTag)[] = [];

  let deletePopupModal = false;
  let addModal = false;

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

  const deleteProductDetail = (id: number) => {
    deletePopupModal = true;
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
            color="red"
            size="xs"
            on:click={() => deleteProductDetail(productDetail.id)}
            >Delete</Button
          >
        </TableBodyCell>
      </TableBodyRow>
    {/each}
    <TableBodyRow>
      <TableBodyCell colspan={2}></TableBodyCell>
      <TableBodyCell>
        <Button size="xs" on:click={() => (addModal = true)}>Add new</Button>
      </TableBodyCell>
    </TableBodyRow>
  </TableBody>
</Table>

<Modal bind:open={deletePopupModal} size="xs" autoclose>
  <div class="text-center">
    <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12" />
    <h3 class="mb-5 text-lg font-normal text-gray-500">
      Are you sure you want to delete this {type}?
    </h3>
    <Button color="red" class="me-2">Yes, I'm sure</Button>
    <Button color="alternative" on:click={() => (deletePopupModal = false)}
      >No, cancel</Button
    >
  </div>
</Modal>

<ProductDetailsCreateModal bind:open={addModal} {type} />
