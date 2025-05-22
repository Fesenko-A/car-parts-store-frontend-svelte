<script lang="ts">
  import { Label, Input, Radio, Button } from "flowbite-svelte";
  import { PhoneSolid, UserSolid } from "flowbite-svelte-icons";
  import { PAYMENT_METHODS } from "../../constants";
  import {
    checkIfLoggedIn,
    createOrder,
    formatCurrency,
    validateName,
    validatePhoneNumber,
  } from "$lib";
  import { onMount } from "svelte";
  import { cartIsEmpty, shoppingCart } from "../../stores/shoppingCartStore";
  import toast from "svelte-french-toast";
  import { afterNavigate, goto } from "$app/navigation";
  import { user } from "../../stores/userStore";
  import { get } from "svelte/store";
  import CustomSpinner from "../../components/CustomSpinner.svelte";

  let paymentMethod = PAYMENT_METHODS.CASH;
  let isChecking = false;
  let loading = false;

  let pickupPhone = get(user)!.phoneNumber;
  let pickupName = get(user)!.firstName;

  let pickupNameIsValid = false;
  let phoneIsValid = false;

  const checkPickupName = () => {
    return (pickupNameIsValid = validateName(pickupName));
  };

  const checkPhoneNumber = () => {
    return (phoneIsValid = validatePhoneNumber(pickupPhone));
  };

  onMount(() => {
    initializeCheckoutPage();
  });

  afterNavigate(() => {
    initializeCheckoutPage();
  });

  const initializeCheckoutPage = () => {
    isChecking = true;
    checkIfLoggedIn();
    checkIfCartHasItems();
    checkPickupName();
    checkPhoneNumber();
    isChecking = false;
  };

  const checkIfCartHasItems = () => {
    if ($cartIsEmpty) {
      toast.error(
        "Your cart is empty. Please add something to it so you can proceed to checkout",
        {
          duration: 8000,
        }
      );
      goto("/");
      return false;
    } else return true;
  };

  const handleSubmit = async () => {
    loading = true;
    const userId = get(user)!.id;
    const pickupEmail = get(user)!.email;

    try {
      const result = await createOrder(
        userId,
        pickupName,
        pickupPhone,
        pickupEmail
      );
      const orderId = result.orderId;
      toast.success("Thank you! Your order has been created");
      if (paymentMethod == PAYMENT_METHODS.ONLINE) {
        toast.success("Redirecting to an online payment form...");
        goto("/payment", {
          state: {
            orderId: orderId,
          },
        });
      } else {
        goto(`/order/${orderId}`);
      }
    } catch (err) {
      toast.error((err as Error).message);
      history.back();
    } finally {
      loading = false;
    }
  };
</script>

<svelte:head>
  <title>Checkout</title>
</svelte:head>

{#if !isChecking}
  {#if $shoppingCart}
    <form on:submit|preventDefault={handleSubmit}>
      <div class="max-w-2xl mx-auto p-4 space-y-6">
        <div class="mb-6">
          <Label class="block mb-2 mt-2">
            <span class="text-lg">Pickup phone number</span>
          </Label>
          <Input
            bind:value={pickupPhone}
            on:blur={checkPhoneNumber}
            id="phone"
            placeholder="+38(000)0000000"
          >
            <PhoneSolid slot="left" class="w-5 h-5 " />
          </Input>

          <Label class="block mb-2 mt-2">
            <span class="text-lg">Pickup name</span>
          </Label>
          <Input
            placeholder="Pickup name"
            bind:value={pickupName}
            on:blur={checkPickupName}
          >
            <UserSolid slot="left" class="w-5 h-5 " />
          </Input>
        </div>

        <div>
          <Label class="block mb-2 mt-2">
            <span class=" text-lg">Payment method</span>
          </Label>
          <Radio
            name="paymentMethod"
            checked={true}
            bind:group={paymentMethod}
            value={PAYMENT_METHODS.CASH}
          >
            <span class=" text-lg">{PAYMENT_METHODS.CASH}</span>
          </Radio>
          <Radio
            name="paymentMethod"
            bind:group={paymentMethod}
            value={PAYMENT_METHODS.ONLINE}
          >
            <span class="text-lg">{PAYMENT_METHODS.ONLINE}</span>
          </Radio>
        </div>
      </div>

      <div
        class="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex flex-col items-center gap-4"
      >
        <div class="text-lg font-semibold text-center">
          Your Total: <span class="font-bold"
            >{formatCurrency($shoppingCart!.cartTotal)}</span
          >
        </div>

        <Button
          type="submit"
          class="w-full sm:w-auto text-lg font-semibold rounded-xl px-6 py-3 transition-all"
          disabled={!phoneIsValid || !pickupNameIsValid || loading}
        >
          {#if loading}
            Processing...
          {:else}
            Confirm Order{paymentMethod === PAYMENT_METHODS.ONLINE
              ? " & Pay Online"
              : ""}
          {/if}
        </Button>
      </div>
    </form>
  {:else}
    {goto("/")}
  {/if}
{:else}
  <CustomSpinner />
{/if}
