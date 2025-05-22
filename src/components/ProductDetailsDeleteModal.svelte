<script lang="ts">
  import { deleteBrand, deleteCategory, deleteSpecialTag } from "$lib";
  import { Modal, Button } from "flowbite-svelte";
  import { ExclamationCircleOutline } from "flowbite-svelte-icons";
  import toast from "svelte-french-toast";

  export let open = false;
  export let productDetail: any;
  export let type: "brand" | "category" | "special tag";

  let loading = false;

  const handleDelete = async () => {
    loading = true;
    switch (type) {
      case "brand":
        await handleDeleteBrand();
        break;
      case "category":
        await handleDeleteCategory();
        break;
      case "special tag":
        await handleDeleteSpecialTag();
        break;
    }
    loading = false;
    open = false;
  };

  const handleDeleteBrand = async () => {
    try {
      await deleteBrand(productDetail.id);
      toast.success("The brand was deleted successfully!");
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await deleteCategory(productDetail.id);
      toast.success("The category was deleted successfully!");
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const handleDeleteSpecialTag = async () => {
    try {
      await deleteSpecialTag(productDetail.id);
      toast.success("The special tag was deleted successfully!");
    } catch (err) {
      toast.error((err as Error).message);
    }
  };
</script>

<Modal bind:open size="xs" autoclose>
  <div class="text-center">
    <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12" />
    <h3 class="mb-5 text-lg font-normal text-gray-500">
      Are you sure you want to delete '{productDetail.name}' {type}?
    </h3>
    {#if !loading}
      <Button color="red" class="me-2" on:click={() => handleDelete()}
        >Yes, I'm sure</Button
      >
      <Button color="alternative" on:click={() => (open = false)}>
        No, cancel
      </Button>
    {:else}
      <Button color="alternative" disabled>Loading...</Button>
    {/if}
  </div>
</Modal>
