<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";
  import { get } from "svelte/store";
  import { loadStripe } from "@stripe/stripe-js";
  import { createOnlinePayment, createOnlinePaymentIntent } from "$lib";
  import { Button } from "flowbite-svelte";
  import { Elements, PaymentElement } from "svelte-stripe";
  import CustomSpinner from "../../components/CustomSpinner.svelte";

  const stripeKey =
    "pk_test_51OVYpoCBJO48XwYLSsNgcWVvG6Ub2rNmAnODV9NPn6ehINDKpn9TwghaC8tRE8OqCOUWx9Il9alyK2PHKzhlfdrA00qfdMTCBV";
  let stripe: any = null;
  let clientSecret: string | null = null;
  let loading = false;
  let elements: any;
  let orderId: number | null;

  onMount(async () => {
    loading = true;
    const state = get(page).state as { orderId: number };
    orderId = state?.orderId || null;

    if (orderId == null) {
      toast.error(
        "Online payment is only available via the 'Pay Online' button on the order details page."
      );
      return history.back();
    }

    stripe = await loadStripe(stripeKey);
    await createPaymentIntent();
    loading = false;
  });

  const createPaymentIntent = async () => {
    const state = get(page).state as { orderId: number };
    try {
      clientSecret = await createOnlinePaymentIntent(state.orderId);
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const submit = async () => {
    if (loading) return;

    const { error } = await elements.submit();
    if (error) {
      toast.error(error.message || "Please complete the required fields.");
      return;
    }

    try {
      loading = true;

      const result = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      const paymentId = result.paymentIntent?.id;
      await createOnlinePayment(Number(orderId), paymentId);
      toast.success("Thank you! Your payment was successful.");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      history.back();
    }
  };
</script>

<svelte:head>
  <title>Payment form</title>
</svelte:head>

{#if clientSecret}
  <div class="flex">
    <div class="mx-auto w-80 md:w-2/3 lg:w-1/2 mt-10 mb-10">
      <Elements
        {stripe}
        {clientSecret}
        theme="flat"
        labels="above"
        bind:elements
      >
        <form on:submit|preventDefault={submit}>
          <PaymentElement />

          <Button type="submit" disabled={loading} class="w-full mt-2">
            {#if loading}
              Processing...
            {:else}
              Pay
            {/if}
          </Button>
        </form>
      </Elements>
    </div>
  </div>
{:else}
  <CustomSpinner />
{/if}
