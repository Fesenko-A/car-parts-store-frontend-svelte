<script lang="ts">
  import { formatCurrency, updateCartItem } from "$lib";
  import toast from "svelte-french-toast";
  import type { CartItem } from "../types";

  export let cartItem: CartItem;

  let loading = false;

  const handleDecreaseCartItem = async () => {
    try {
      loading = true;
      await updateCartItem(cartItem.productId, -1);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      loading = false;
    }
  };

  const handleIncreaseCartItem = async () => {
    try {
      loading = true;
      await updateCartItem(cartItem.productId, 1);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      loading = false;
    }
  };

  const handleRemoveCartItem = async () => {
    try {
      loading = true;
      await updateCartItem(cartItem.productId, cartItem.quantity * -1);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      loading = false;
    }
  };
</script>

<div
  class="flex flex-col sm:flex-row gap-6 p-4 rounded-2xl shadow hover:shadow-lg transition-shadow bg-white"
>
  <div class="w-full sm:w-1/3 lg:w-1/4 flex-shrink-0">
    <a href={`/product/${cartItem.product.id}`} class="block">
      <img
        src={cartItem.product.imageUrl}
        alt={cartItem.product.name}
        class="w-full h-48 sm:h-56 object-contain rounded-xl p-4 hover:scale-105 transition-transform"
      />
    </a>
  </div>

  <div class="flex-1 flex flex-col justify-between">
    <div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">
        {cartItem.product.name}
      </h3>

      {#if cartItem.product.finalPrice < cartItem.product.initialPrice}
        <div class="flex items-center gap-2 mb-1">
          <span class="text-2xl font-bold text-red-600">
            {formatCurrency(cartItem.product.finalPrice)}
          </span>
          <span class="text-base text-gray-400 line-through">
            {formatCurrency(cartItem.product.initialPrice)}
          </span>
        </div>
        <p class="text-sm text-green-600 font-medium mb-3">
          You save {formatCurrency(
            cartItem.product.initialPrice - cartItem.product.finalPrice
          )}
        </p>
      {:else}
        <div class="text-2xl font-bold text-gray-900 mb-3">
          {formatCurrency(cartItem.product.finalPrice)}
        </div>
      {/if}
    </div>

    <div class="flex items-center justify-between mt-4">
      <div
        class="flex items-center rounded-full overflow-hidden shadow bg-gray-100"
        class:opacity-50={loading}
      >
        <button
          class="px-4 py-2 text-lg font-bold hover:bg-gray-200 transition-colors"
          aria-label="Decrease quantity"
          on:click={handleDecreaseCartItem}
          disabled={loading}
        >
          -
        </button>
        <span class="px-5 py-2 text-lg font-medium">{cartItem.quantity}</span>
        <button
          class="px-4 py-2 text-lg font-bold hover:bg-gray-200 transition-colors"
          aria-label="Increase quantity"
          on:click={handleIncreaseCartItem}
          disabled={loading}
        >
          +
        </button>
      </div>
      <button
        class="flex items-center gap-1 text-red-600 hover:bg-red-100 hover:text-red-700 px-3 py-1 rounded-full text-sm font-semibold transition-colors"
        on:click={handleRemoveCartItem}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        Remove
      </button>
    </div>
  </div>
</div>
