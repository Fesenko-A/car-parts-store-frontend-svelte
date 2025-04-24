<script lang="ts">
  import { Badge, Breadcrumb, BreadcrumbItem, Button } from "flowbite-svelte";
  import type { Product } from "../../../types";

  export let data: {
    product: Product;
  };
</script>

{#if data.product}
  <div class="flex flex-col lg:flex-row gap-8 p-8 max-w-7xl mx-auto">
    <div class="lg:w-2/5 w-full flex justify-center items-start">
      <img
        src={data.product.imageUrl}
        alt={data.product.name}
        class="w-full max-w-md object-contain rounded-lg shadow-lg"
      />
    </div>

    <div class="lg:w-3/5 w-full space-y-6 py-4">
      <Breadcrumb class="text-lg">
        <BreadcrumbItem>{data.product.category.name}</BreadcrumbItem>
        <BreadcrumbItem>{data.product.brand.name}</BreadcrumbItem>
      </Breadcrumb>

      <h1 class="text-2xl xl:text-3xl font-bold tracking-tight text-gray-900">
        {data.product.name}
      </h1>

      {#if data.product.specialTag}
        <div class="my-2">
          <Badge large color="red" class="text-lg"
            >{data.product.specialTag.name}</Badge
          >
        </div>
      {/if}

      <div class="flex items-center gap-3 my-6">
        {#if data.product.discountPercentage > 0}
          <span class="text-red-600 font-bold text-4xl">
            ${data.product.finalPrice}
          </span>
          <span class="line-through text-2xl text-gray-600">
            ${data.product.initialPrice}
          </span>
          <span
            class="text-xl font-bold bg-red-100 text-red-800 px-3 py-1 rounded-full"
          >
            -{data.product.discountPercentage}%
          </span>
        {:else}
          <span class="font-bold text-4xl text-gray-900">
            ${data.product.finalPrice}
          </span>
        {/if}
      </div>

      <div class="flex gap-4 my-8">
        <Button size="xl" class="px-8 py-3 text-lg font-semibold"
          >Add to cart</Button
        >
        <Button
          size="xl"
          color="alternative"
          class="px-8 py-3 text-lg font-semibold"
        >
          Add to wishlist
        </Button>
      </div>

      <div class="prose max-w-none">
        <h3 class="text-xl font-semibold mb-4">Product Details</h3>
        <p class="text-lg leading-relaxed text-gray-700">
          {data.product.description}
        </p>
      </div>
    </div>
  </div>
{:else}
  <div class="p-8 text-center">
    <p class="text-2xl text-gray-600">Product not found.</p>
  </div>
{/if}
