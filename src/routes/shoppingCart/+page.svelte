<script lang="ts">
  import { Button, Spinner } from "flowbite-svelte";
  import { formatCurrency, getShoppingCart } from "$lib";
  import { CartOutline } from "flowbite-svelte-icons";
  import { onMount } from "svelte";
  import { cartIsEmpty, shoppingCart } from "../../stores/shoppingCartStore";
  import { goto } from "$app/navigation";
  import CartItem from "../../components/CartItem.svelte";

  let loading = false;

  onMount(async () => {
    try {
      loading = true;
      await getShoppingCart();
    } catch {
      goto("/");
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Shopping Cart</title>
</svelte:head>

<div class="max-w-6xl mx-auto p-4 sm:p-6 pb-28 relative">
  {#if !loading && $shoppingCart}
    {#if $cartIsEmpty}
      <div class="text-center py-16">
        <CartOutline class="h-18 w-18 text-gray-400 mx-auto" />
        <h3 class="mt-4 text-lg font-semibold">Your cart is empty</h3>
        <p class="mt-1 text-gray-500">
          Start adding some products to your cart
        </p>
      </div>
    {:else}
      <div class="space-y-10">
        <div class="space-y-8">
          {#each $shoppingCart.cartItems as cartItem}
            <CartItem {cartItem} />
          {/each}
        </div>

        <div class="hidden sm:block bg-white rounded-2xl shadow p-8 mt-8">
          <h2 class="text-xl font-semibold mb-6">Order summary</h2>
          <div class="flex justify-between items-center mb-4">
            <span class="text-lg font-medium">Total</span>
            <span class="text-2xl font-bold"
              >{formatCurrency($shoppingCart.cartTotal)}</span
            >
          </div>

          <Button class="w-full mt-6 py-4 text-lg" href="/checkout" size="lg">
            Proceed to checkout
          </Button>
        </div>
      </div>

      <div
        class="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg flex flex-col"
      >
        <div class="flex justify-between items-center mb-3">
          <span class="text-lg font-medium">Total</span>
          <span class="text-xl font-bold"
            >{formatCurrency($shoppingCart.cartTotal)}</span
          >
        </div>
        <Button class="w-full py-3 text-lg" href="/checkout" size="lg">
          Proceed to checkout
        </Button>
      </div>
    {/if}
  {:else}
    <div class="flex">
      <Spinner size={12} class="mx-auto mt-20" />
    </div>
  {/if}
</div>
