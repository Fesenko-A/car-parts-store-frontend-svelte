<script lang="ts">
  import { Input, Button } from "flowbite-svelte";

  let email = "";
  let password = "";
  let repeatPassword = "";

  let emailValid = false;
  let passwordValid = false;
  let passwordsMatch = false;

  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailValid = regex.test(email);
    return emailValid;
  };

  const validatePassword = () => {
    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    passwordValid = hasMinLength && hasNumber;
    return passwordValid;
  };

  const validateRepeatPassword = () => {
    passwordsMatch = password === repeatPassword && password !== "";
    return passwordsMatch;
  };

  const handleSubmit = () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const doPasswordsMatch = validateRepeatPassword();

    // Registration logic here
  };
</script>

<svelte:head>
  <title>Register</title>
</svelte:head>

<div class="flex flex-col items-center justify-center mt-10 p-4">
  <div class="w-full max-w-md space-y-2">
    <h1 class="text-2xl font-bold text-center">Register</h1>
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
        on:blur={validatePassword}
        id="password"
        type="password"
        placeholder="Password"
        class="w-full"
        color={password && !passwordValid ? "red" : "base"}
      />
      {#if password && !passwordValid}
        <p class="mt-2 text-sm text-red-600">
          Password must be at least 8 characters and contain numbers
        </p>
      {/if}
    </div>

    <div>
      <Input
        bind:value={repeatPassword}
        on:blur={validateRepeatPassword}
        id="repeat-password"
        type="password"
        placeholder="Repeat Password"
        class="w-full"
        color={repeatPassword && !passwordsMatch ? "red" : "base"}
      />
      {#if repeatPassword && !passwordsMatch}
        <p class="mt-2 text-sm text-red-600">Passwords do not match</p>
      {/if}
    </div>

    <Button
      on:click={handleSubmit}
      class="w-full"
      disabled={!emailValid || !passwordValid || !passwordsMatch}
    >
      Register
    </Button>
  </div>
  <p class="text-gray-500 mt-2">
    Already have an account? <a href="/login" class="underline">Login here</a>
  </p>
</div>
