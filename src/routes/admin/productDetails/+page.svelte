<script lang="ts">
  import { Tabs, TabItem } from "flowbite-svelte";
  import ProductDetailsTable from "../../../components/ProductDetailsTable.svelte";
  import { onMount } from "svelte";
  import { getAllBrands, getAllCategories, getAllSpecialTags } from "$lib";
  import toast from "svelte-french-toast";

  let loading = false;

  let type = "brand";

  onMount(async () => {
    loading = true;
    try {
      await getAllBrands();
      await getAllCategories();
      await getAllSpecialTags();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Product details</title>
</svelte:head>

<Tabs class="m-2" contentClass="bg-white m-2" tabStyle="pill">
  <TabItem
    open
    on:click={() => {
      type = "brand";
    }}
  >
    <span slot="title">Brands</span>
    <div class="mx-10">
      <ProductDetailsTable type="brand" />
    </div>
  </TabItem>
  <TabItem
    on:click={() => {
      type = "category";
    }}
  >
    <span slot="title">Categories</span>
    <div class="mx-10">
      <ProductDetailsTable type="category" />
    </div>
  </TabItem>
  <TabItem
    on:click={() => {
      type = "special tag";
    }}
  >
    <span slot="title">Special Tags</span>
    <div class="mx-10">
      <ProductDetailsTable type="special tag" />
    </div>
  </TabItem>
</Tabs>
