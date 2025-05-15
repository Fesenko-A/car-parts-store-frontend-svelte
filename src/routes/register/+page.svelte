<script lang="ts">
  import { goto } from "$app/navigation";
  import {
    register,
    validateEmail,
    validateName,
    validatePhoneNumber,
  } from "$lib";
  import { Input, Button } from "flowbite-svelte";
  import toast from "svelte-french-toast";

  let email = "";
  let firstName = "";
  let lastName = "";
  let phoneNumber = "";
  let password = "";
  let repeatPassword = "";

  let loading = false;
  let errorMessage: string | null = null;

  let emailValid = false;
  let firstNameIsValid = false;
  let lastNameIsValid = false;
  let phoneIsValid = false;
  let passwordValid = false;
  let passwordsMatch = false;

  const checkEmail = () => {
    return (emailValid = validateEmail(email));
  };

  const checkFirstName = () => {
    return (firstNameIsValid = validateName(firstName));
  };

  const checkLastName = () => {
    return (lastNameIsValid = validateName(lastName));
  };

  const checkPhoneNumber = () => {
    return (phoneIsValid = validatePhoneNumber(phoneNumber));
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

  const handleSubmit = async () => {
    errorMessage = null;

    loading = true;
    try {
      await register(email, firstName, lastName, phoneNumber, password);
      goto("/");
      toast.success("Successfully registered and logged in!");
    } catch (error) {
      errorMessage = (error as Error).message || "Register failed";
      toast.error(errorMessage);
    } finally {
      loading = false;
    }
  };
</script>

<svelte:head>
  <title>Register</title>
</svelte:head>

<div class="flex flex-col items-center justify-center mt-10 p-4">
  <form
    class="w-full max-w-md space-y-2"
    on:submit|preventDefault={handleSubmit}
  >
    <h1 class="text-2xl font-bold text-center">Register</h1>
    <div>
      <Input
        bind:value={email}
        on:blur={checkEmail}
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
        bind:value={firstName}
        on:blur={checkFirstName}
        id="firstName"
        type="text"
        placeholder="First name"
        class="w-full"
        color={firstName && !firstNameIsValid ? "red" : "base"}
      />
      {#if firstName && !firstNameIsValid}
        <p class="mt-2 text-sm text-red-600">
          Please enter a valid first name (only letters and "-" symbol are
          allowed)
        </p>
      {/if}
    </div>

    <div>
      <Input
        bind:value={lastName}
        on:blur={checkLastName}
        id="lastName"
        type="text"
        placeholder="Last name"
        class="w-full"
        color={lastName && !lastNameIsValid ? "red" : "base"}
      />
      {#if lastName && !lastNameIsValid}
        <p class="mt-2 text-sm text-red-600">
          Please enter a valid first name (only letters and "-" symbol are
          allowed)
        </p>
      {/if}
    </div>

    <div>
      <Input
        bind:value={phoneNumber}
        on:blur={checkPhoneNumber}
        id="phoneNumber"
        type="text"
        placeholder="Phone number"
        class="w-full"
        color={lastName && !lastNameIsValid ? "red" : "base"}
      />
      {#if lastName && !lastNameIsValid}
        <p class="mt-2 text-sm text-red-600">
          Please enter a valid phone number (max 15 characters with no spaces, +
          and () are allowed)
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
      type="submit"
      class="w-full"
      disabled={!emailValid || !passwordValid || !passwordsMatch}
    >
      Register
    </Button>
  </form>
  <p class="text-gray-500 mt-2">
    Already have an account? <a href="/login" class="underline">Login here</a>
  </p>
</div>
