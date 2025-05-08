<script lang="ts">
  import { Input, Button } from "flowbite-svelte";
  import { login } from "$lib";
  import { goto } from "$app/navigation";

  let email = "";
  let password = "";

  let loading = false;
  let errorMessage: string | null = null;

  const handleSubmit = async () => {
    errorMessage = null;

    loading = true;
    try {
      await login(email, password);
      goto("/");
    } catch (error) {
      errorMessage = (error as Error).message || "Login failed";
    } finally {
      loading = false;
    }
  };
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="flex flex-col items-center justify-center mt-10 p-4">
  <form
    class="w-full max-w-md space-y-4"
    on:submit|preventDefault={handleSubmit}
  >
    <h1 class="text-2xl font-bold text-center">Login</h1>

    <div>
      <Input
        bind:value={email}
        id="email"
        placeholder="Email"
        class="w-full"
        disabled={loading}
      />
    </div>

    <div>
      <Input
        bind:value={password}
        id="password"
        type="password"
        placeholder="Password"
        class="w-full"
        disabled={loading}
      />
    </div>

    {#if errorMessage}
      <p class="text-red-600 text-sm">{errorMessage}</p>
    {/if}

    <Button type="submit" class="w-full" disabled={loading}>
      {#if loading}
        Logging in...
      {:else}
        Login
      {/if}
    </Button>
  </form>

  <p class="text-gray-500 mt-2">
    Don't have an account?
    <a href="/register" class="underline">Register here</a>
  </p>
</div>
