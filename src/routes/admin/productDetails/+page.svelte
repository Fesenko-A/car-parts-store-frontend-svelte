<script>
  import { Tabs, TabItem } from "flowbite-svelte";
  import {
    brands,
    categories,
    specialTags,
  } from "../../../stores/productDetailsStore";
  import { get } from "svelte/store";
  import ProductDetailsTable from "../../../components/ProductDetailsTable.svelte";

  let brandsList = get(brands);
  let categoriesList = get(categories);
  let specialTagsList = get(specialTags);

  let type = "brand";
</script>

<Tabs class="m-2" contentClass="bg-white m-2" tabStyle="pill">
  <TabItem
    open
    on:click={() => {
      type = "brand";
    }}
  >
    <span slot="title">Brands</span>
    <div class="mx-10">
      <ProductDetailsTable productDetailsList={brandsList} {type} />
    </div>
  </TabItem>
  <TabItem
    on:click={() => {
      type = "category";
    }}
  >
    <span slot="title">Categories</span>
    <div class="mx-10">
      <ProductDetailsTable productDetailsList={categoriesList} {type} />
    </div>
  </TabItem>
  <TabItem
    on:click={() => {
      type = "special tag";
    }}
  >
    <span slot="title">Special Tags</span>
    <div class="mx-10">
      <ProductDetailsTable productDetailsList={specialTagsList} {type} />
    </div>
  </TabItem>
</Tabs>
