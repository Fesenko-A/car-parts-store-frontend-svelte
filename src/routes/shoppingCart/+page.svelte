<script lang="ts">
  import { Button } from "flowbite-svelte";
  import { cart, removeFromCart, updateQuantity } from "../../stores/cartStore";
  import { formatCurrency } from "$lib";
  import { CartOutline } from "flowbite-svelte-icons";

  let cartItems = $cart;
  let total = cartItems
    .reduce((sum, item) => sum + item.product.finalPrice * item.quantity, 0)
    .toFixed(2);
</script>

<svelte:head>
  <title>Shopping Cart</title>
</svelte:head>

<div class="max-w-6xl mx-auto p-4 sm:p-6 pb-28 relative">
  {#if cartItems.length === 0}
    <div class="text-center py-16">
      <CartOutline class="h-18 w-18 text-gray-400 mx-auto" />
      <h3 class="mt-4 text-lg font-semibold">Your cart is empty</h3>
      <p class="mt-1 text-gray-500">Start adding some products to your cart</p>
    </div>
  {:else}
    <div class="space-y-10">
      <div class="space-y-8">
        {#each cartItems as item (item.id)}
          <div
            class="flex flex-col sm:flex-row gap-6 p-4 rounded-2xl shadow hover:shadow-lg transition-shadow bg-white"
          >
            <div class="w-full sm:w-1/3 lg:w-1/4 flex-shrink-0">
              <a href={`/product/${item.product.id}`} class="block">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  class="w-full h-48 sm:h-56 object-contain rounded-xl p-4 hover:scale-105 transition-transform"
                />
              </a>
            </div>

            <div class="flex-1 flex flex-col justify-between">
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">
                  {item.product.name}
                </h3>

                {#if item.product.initialPrice && item.product.finalPrice < item.product.initialPrice}
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-2xl font-bold text-red-600">
                      {formatCurrency(item.product.finalPrice)}
                    </span>
                    <span class="text-base text-gray-400 line-through">
                      {formatCurrency(item.product.initialPrice)}
                    </span>
                  </div>
                  <p class="text-sm text-green-600 font-medium mb-3">
                    You save {formatCurrency(
                      item.product.initialPrice - item.product.finalPrice
                    )}
                  </p>
                {:else}
                  <div class="text-2xl font-bold text-gray-900 mb-3">
                    {formatCurrency(item.product.finalPrice)}
                  </div>
                {/if}
              </div>

              <div class="flex items-center justify-between mt-4">
                <div
                  class="flex items-center rounded-full overflow-hidden shadow bg-gray-100"
                >
                  <button
                    on:click={() => updateQuantity(item.id, item.quantity - 1)}
                    class="px-4 py-2 text-lg font-bold hover:bg-gray-200 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span class="px-5 py-2 text-lg font-medium"
                    >{item.quantity}</span
                  >
                  <button
                    on:click={() => updateQuantity(item.id, item.quantity + 1)}
                    class="px-4 py-2 text-lg font-bold hover:bg-gray-200 transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  on:click={() => removeFromCart(item.id)}
                  class="flex items-center gap-1 text-red-600 hover:bg-red-100 hover:text-red-700 px-3 py-1 rounded-full text-sm font-semibold transition-colors"
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
        {/each}
      </div>

      <div class="hidden sm:block bg-white rounded-2xl shadow p-8 mt-8">
        <h2 class="text-xl font-semibold mb-6">Order summary</h2>
        <div class="flex justify-between items-center mb-4">
          <span class="text-lg font-medium">Total</span>
          <span class="text-2xl font-bold">${total}</span>
        </div>

        <Button class="w-full mt-6 py-4 text-lg" size="lg">
          Proceed to checkout
        </Button>
      </div>
    </div>

    <div
      class="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg flex flex-col"
    >
      <div class="flex justify-between items-center mb-3">
        <span class="text-lg font-medium">Total</span>
        <span class="text-xl font-bold">${total}</span>
      </div>
      <Button class="w-full py-3 text-lg" size="lg">Proceed to checkout</Button>
    </div>
  {/if}
</div>
