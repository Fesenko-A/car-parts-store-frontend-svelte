<script lang="ts">
  import { Input, Button } from "flowbite-svelte";

  let email = "";
  let password = "";

  let emailValid = false;

  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailValid = regex.test(email);
    return emailValid;
  };

  const handleSubmit = () => {
    const isEmailValid = validateEmail();

    // Login logic here
  };
</script>

<div class="flex flex-col items-center justify-center mt-10 p-4">
  <div class="w-full max-w-md space-y-2">
    <h1 class="text-2xl font-bold text-center">Login</h1>
    <div>
      <Input
        bind:value={email}
        on:blur={validateEmail}
        id="email"
        type="email"
        placeholder="Email"
        class="w-full"
        color={email && !emailValid ? "red" : "base"}
      />
      {#if email && !emailValid}
        <p class="mt-2 text-sm text-red-600">
          Please enter a valid email address
        </p>
      {/if}
    </div>

    <div>
      <Input
        bind:value={password}
        id="password"
        type="password"
        placeholder="Password"
        class="w-full"
      />
    </div>

    <Button on:click={handleSubmit} class="w-full" disabled={!emailValid}>
      Login
    </Button>
  </div>
  <p class="text-gray-500 mt-2">
    Don't have an account? <a href="/register" class="underline"
      >Register here</a
    >
  </p>
</div>
