<script lang="ts">
  import { page } from "$app/stores";
  import {
    Badge,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Spinner,
    Tooltip,
  } from "flowbite-svelte";
  import type { Product } from "../../../types";
  import { onMount } from "svelte";
  import { addProductToCart, apiFetch, formatCurrency } from "$lib";
  import { goto } from "$app/navigation";

  let product: Product | null = null;
  let loading = false;

  let productId: string;
  $: productId = $page.params.id;

  onMount(async () => {
    loading = true;
    product = await apiFetch(`/products/get/${productId}`);
    loading = false;
  });

  const handleAddProduct = async () => {
    try {
      loading = true;
      await addProductToCart(product!.id);
    } catch {
      goto("/");
    } finally {
      loading = false;
    }
  };
</script>

<svelte:head>
  <title>{product ? product.name : "Loading..."}</title>
</svelte:head>

{#if !loading}
  {#if product}
    <div class="flex flex-col lg:flex-row gap-8 p-8 max-w-7xl mx-auto">
      <div class="lg:w-2/5 w-full flex justify-center items-start">
        <img
          src={product.imageUrl}
          alt={product.name}
          class="w-full max-w-md object-contain rounded-lg shadow-lg"
        />
      </div>

      <div class="lg:w-3/5 w-full space-y-6 py-4">
        <Breadcrumb class="text-lg">
          <BreadcrumbItem>{product.category.name}</BreadcrumbItem>
          <BreadcrumbItem>{product.brand.name}</BreadcrumbItem>
        </Breadcrumb>

        <h1 class="text-2xl xl:text-3xl font-bold tracking-tight text-gray-900">
          {product.name}
        </h1>

        {#if product.specialTag}
          <div class="my-2">
            <Badge large color="red" class="text-lg"
              >{product.specialTag.name}</Badge
            >
          </div>
        {/if}

        <div class="flex items-center gap-3 my-6">
          {#if product.discountPercentage > 0}
            <span class="text-red-600 font-bold text-4xl">
              {formatCurrency(product.finalPrice)}
            </span>
            <span class="line-through text-2xl text-gray-600">
              {formatCurrency(product.initialPrice)}
            </span>
            <span
              class="text-xl font-bold bg-red-100 text-red-800 px-3 py-1 rounded-full"
            >
              -{product.discountPercentage}%
            </span>
          {:else}
            <span class="font-bold text-4xl text-gray-900">
              {formatCurrency(product.finalPrice)}
            </span>
          {/if}
        </div>

        <div class="flex gap-4 my-8">
          <Button
            size="xl"
            class="px-8 py-3 text-lg font-semibold w-3xs"
            disabled={!product.inStock}
            on:click={handleAddProduct}
          >
            {#if product.inStock}
              {#if loading}
                Loading
              {:else}
                Add to cart
              {/if}
            {:else}
              Out of stock
            {/if}
          </Button>
          <Button
            size="xl"
            color="alternative"
            class="px-8 py-3 text-lg font-semibold w-3xs"
            disabled
          >
            Add to wishlist
          </Button>
          <Tooltip>To be implemented</Tooltip>
        </div>

        <div class="prose max-w-none">
          <h3 class="text-xl font-semibold mb-4">Product Details</h3>
          <p class="text-lg leading-relaxed text-gray-700">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  {:else}
    <div class="p-8 text-center">
      <p class="text-2xl text-gray-600">Product not found.</p>
    </div>
  {/if}
{:else}
  <div class="flex">
    <Spinner size={12} class="mx-auto mt-20" />
  </div>
{/if}
