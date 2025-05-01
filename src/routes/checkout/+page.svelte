<script>
  import { Label, Input, Radio, Button } from "flowbite-svelte";
  import { PhoneSolid, UserSolid } from "flowbite-svelte-icons";
  import { PAYMENT_METHODS } from "../../constants";
  import { formatCurrency } from "../../utils/utils";

  let pickupPhone = "";
  let pickupName = "";
  let paymentMethod = PAYMENT_METHODS.CASH;
  const confirmOrder = () => {};
</script>

<svelte:head>
  <title>Checkout</title>
</svelte:head>

<div class="max-w-2xl mx-auto p-4 space-y-6">
  <script>
    import { Label, Input } from "flowbite-svelte";
  </script>

  <div class="mb-6">
    <Label class="block mb-2 mt-2">
      <span class="text-lg">Pickup phone number</span>
    </Label>
    <Input id="phone" placeholder="+38(000)0000000">
      <PhoneSolid slot="left" class="w-5 h-5 " />
    </Input>

    <Label class="block mb-2 mt-2">
      <span class="text-lg">Pickup name</span>
    </Label>
    <Input placeholder="Your name">
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
    Your Total: <span class="font-bold">{formatCurrency(1000)}</span>
  </div>

  <Button
    on:click={confirmOrder}
    class="w-full sm:w-auto text-lg font-semibold rounded-xl px-6 py-3 transition-all"
  >
    Confirm Order{paymentMethod === PAYMENT_METHODS.ONLINE
      ? " & Pay Online"
      : ""}
  </Button>
</div>
