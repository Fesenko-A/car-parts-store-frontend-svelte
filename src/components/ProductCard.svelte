<script lang="ts">
  import { Badge, Button, Card, Tooltip } from "flowbite-svelte";
  import type { Product } from "../types";
  import { CartPlusAltSolid } from "flowbite-svelte-icons";
  import { formatCurrency } from "$lib";

  export let product: Product;
</script>

<Card
  padding="none"
  class="w-full h-full min-h-[400px] flex flex-col overflow-hidden hover:scale-[1.02] transition-transform duration-200 shadow-lg"
>
  {#if product.specialTag != null}
    <Badge rounded color="red" class="m-1 absolute text-sm "
      >{product.specialTag.name}</Badge
    >
  {/if}
  <a
    href={`/product/${product.id}`}
    class="h-[70%] flex-shrink-0 flex items-center justify-center bg-white/5 overflow-hidden"
  >
    <img
      class="max-h-full max-w-full object-contain p-4"
      src={product.imageUrl}
      alt={product.name}
    />
  </a>

  <div class="p-4 bg-slate-800 flex flex-col h-[30%] min-h-[120px]">
    <a href={`/product/${product.id}`} class="mb-2">
      <h5
        class="text-lg font-semibold tracking-tight text-white line-clamp-2 leading-tight"
      >
        {product.name}
      </h5>
    </a>

    <div class="flex justify-between items-center mt-auto">
      <div class="flex items-baseline flex-wrap gap-x-2">
        <span class="text-xl font-bold text-white"
          >{formatCurrency(product.finalPrice)}</span
        >
        {#if product.discountPercentage > 0}
          <span class="text-md text-red-400 line-through">
            {formatCurrency(product.initialPrice)}
          </span>
        {/if}
      </div>
      <Button size="sm" disabled={!product.inStock} class="flex-shrink-0">
        <CartPlusAltSolid class="w-5 h-5" />
      </Button>
      <Tooltip>{product.inStock ? "Add to cart" : "Out of stock"}</Tooltip>
    </div>
  </div>
</Card>
