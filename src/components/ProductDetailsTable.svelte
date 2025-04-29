<script lang="ts">
  import {
    Button,
    Input,
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

  export let productDetailsList: (Brand | Category | SpecialTag)[] = [];
  export let type: string = "brand";

  let deletePopupModal = false;
  const deleteProductDetail = (productDetail: any) => {
    deletePopupModal = true;
    console.log(productDetail);
  };

  let addModal = false;
  let productDetailName: string = "";

  const addProductDetail = () => {
    if (!productDetailName.trim()) {
      let errorMessage = `Please enter a valid name for the ${type}.`;
      console.log(errorMessage);
      return;
    }

    console.log("Adding", type, productDetailName);
    productDetailName = "";
    addModal = false;
  };
</script>

<Table hoverable={true} striped={true} shadow>
  <TableHead class="dark:bg-gray-200 dark:text-black">
    <TableHeadCell>ID</TableHeadCell>
    <TableHeadCell>
      Name
      <Button size="xs" class="px-2 ms-1" on:click={() => (addModal = true)}
        >Add new</Button
      >
    </TableHeadCell>
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
            on:click={() => deleteProductDetail(productDetail)}>Delete</Button
          >
        </TableBodyCell>
      </TableBodyRow>
    {/each}
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

<Modal title="Add {type}" bind:open={addModal} autoclose>
  <div class="flex flex-col gap-4 items-center">
    <Input
      required
      placeholder={`Name of ${type}`}
      bind:value={productDetailName}
      class="w-full"
    />
    <div class="flex gap-2 w-full justify-end">
      <Button
        type="button"
        color="alternative"
        on:click={() => (addModal = false)}
      >
        Cancel
      </Button>
      <Button type="button" on:click={addProductDetail}>Submit</Button>
    </div>
  </div>
</Modal>
