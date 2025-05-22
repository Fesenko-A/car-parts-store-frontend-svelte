<script lang="ts">
  import { createBrand, createCategory, createSpecialTag } from "$lib";
  import { Button, Input, Modal } from "flowbite-svelte";
  import toast from "svelte-french-toast";

  export let open = true;
  export let type: "brand" | "category" | "special tag";

  let loading = false;
  let productDetailName: string;

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    loading = true;
    switch (type) {
      case "brand":
        await handleAddBrand();
        break;
      case "category":
        await handleAddCategory();
        break;
      case "special tag":
        await handleAddSpecialTag();
        break;
    }
    productDetailName = "";
    open = false;
    loading = false;
  };

  const handleAddBrand = async () => {
    try {
      await createBrand(productDetailName);
      toast.success("A new brand has been created successfully!");
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const handleAddCategory = async () => {
    try {
      await createCategory(productDetailName);
      toast.success("A new category has been created successfully!");
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const handleAddSpecialTag = async () => {
    try {
      await createSpecialTag(productDetailName);
      toast.success("A new special tag has been created successfully!");
    } catch (err) {
      toast.error((err as Error).message);
    }
  };
</script>

<Modal title="Add" bind:open autoclose>
  <form on:submit|preventDefault={handleSubmit}>
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
          on:click={() => {
            open = false;
            productDetailName = "";
          }}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading} on:click={handleSubmit}>
          {#if loading}
            Loading...
          {:else}
            Submit
          {/if}
        </Button>
      </div>
    </div>
  </form>
</Modal>
