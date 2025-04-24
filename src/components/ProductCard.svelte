<script lang="ts">
  import { Badge, Button, Card } from "flowbite-svelte";
  import type { Product } from "../types";
  import { CartPlusAltSolid } from "flowbite-svelte-icons";

  export let product: Product;
</script>

<Card
  padding="none"
  color="none"
  class="w-full h-full min-h-[400px] flex flex-col overflow-hidden"
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
    <a href="/" class="mb-2">
      <h5
        class="text-lg font-semibold tracking-tight text-white line-clamp-2 leading-tight"
      >
        {product.name}
      </h5>
    </a>

    <div class="flex justify-between items-center mt-auto">
      <div class="flex items-baseline flex-wrap gap-x-2">
        <span class="text-xl font-bold text-white">${product.finalPrice}</span>
        {#if product.discountPercentage > 0}
          <span class="text-md text-red-400 line-through">
            ${product.initialPrice}
          </span>
        {/if}
      </div>
      <Button href="/" size="sm" class="flex-shrink-0">
        <CartPlusAltSolid class="w-5 h-5" />
      </Button>
    </div>
  </div>
</Card>
