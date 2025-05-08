<script lang="ts">
  import { Button, Input, Label, Modal } from "flowbite-svelte";
  import { user } from "../../../stores/userStore";
  import {
    ArrowRightToBracketOutline,
    RefreshOutline,
  } from "flowbite-svelte-icons";
  import { goto } from "$app/navigation";
  import { logout } from "$lib";
  import { onMount } from "svelte";

  onMount(() => {
    if (!$user) {
      goto("/login");
    }
  });

  let updatePasswordModal = false;
  let oldPassword = "";
  let newPassword = "";
  let repeatPassword = "";
  let passwordValid = false;
  let passwordsMatch = false;

  const updatePassword = () => {
    updatePasswordModal = true;
  };

  const validatePassword = () => {
    const hasMinLength = newPassword.length >= 8;
    const hasNumber = /\d/.test(newPassword);
    passwordValid = hasMinLength && hasNumber;
    return passwordValid;
  };

  const validateRepeatPassword = () => {
    passwordsMatch = newPassword === repeatPassword && newPassword !== "";
    return passwordsMatch;
  };
</script>

<svelte:head>
  <title>My profile</title>
</svelte:head>

<div class="max-w-2xl mx-auto mt-10 bg-white rounded-2xl p-6 space-y-6">
  {#if $user}
    <h2 class="text-center font-medium text-xl">My profile</h2>
    <div class="flex justify-center h-20">
      <img
        src="/avatar_placeholder.png"
        alt="avatar placeholder"
        class="rounded-full"
      />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
      <div>
        <Label for="firstName" />
        <div id="firstName" class="mt-1 p-2 bg-gray-50 rounded-md">
          {$user.firstName}
        </div>
      </div>

      <div>
        <Label for="lastName" />
        <div id="lastName" class="mt-1 p-2 bg-gray-50 rounded-md">
          {$user.lastName}
        </div>
      </div>

      <div class="sm:col-span-2">
        <Label for="email" />
        <div id="email" class="mt-1 p-2 bg-gray-50 rounded-md">
          {$user.email}
        </div>
      </div>

      <div>
        <Label for="phone" />
        <div id="phone" class="mt-1 p-2 bg-gray-50 rounded-md">
          {$user.phoneNumber}
        </div>
      </div>

      <div>
        <Label for="role" />
        <div id="role" class="mt-1 p-2 bg-gray-50 rounded-md">
          {$user.role}
        </div>
      </div>
    </div>

    <div class="flex justify-center space-x-1">
      <Button on:click={updatePassword} class="p-3">
        <RefreshOutline />Update Password
      </Button>
      <Button
        on:click={() => {
          logout();
          goto("/");
        }}
        class="p-3"
      >
        <ArrowRightToBracketOutline />
        Log out
      </Button>
    </div>
  {:else}
    <p class="text-center">Redirecting...</p>
  {/if}
</div>

<Modal
  bind:open={updatePasswordModal}
  size="xs"
  autoclose={false}
  class="w-full"
>
  <form class="flex flex-col space-y-6" action="#">
    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
      Update password
    </h3>
    <Label class="space-y-2">
      <span>Your current password</span>
      <div>
        <Input
          type="password"
          name="oldPassword"
          placeholder="•••••"
          required
          bind:value={oldPassword}
        />
      </div>
    </Label>
    <Label class="space-y-2">
      <span>New password</span>
      <div>
        <Input
          type="password"
          name="newPassword"
          placeholder="•••••"
          required
          bind:value={newPassword}
          on:blur={validatePassword}
        />
        {#if newPassword && !passwordValid}
          <p class="mt-2 text-sm text-red-600">
            Password must be at least 8 characters and contain numbers
          </p>
        {/if}
      </div>
    </Label>
    <Label class="space-y-2">
      <span>Repeat new password</span>
      <div>
        <Input
          type="password"
          name="repeatPassword"
          placeholder="•••••"
          required
          bind:value={repeatPassword}
          on:blur={validateRepeatPassword}
        />
        {#if repeatPassword && !passwordsMatch}
          <p class="mt-2 text-sm text-red-600">Passwords do not match</p>
        {/if}
      </div>
    </Label>
    <Button
      type="submit"
      class="w-full1"
      disabled={!passwordValid || !passwordsMatch || oldPassword.length < 8}
      >Submit</Button
    >
  </form>
</Modal>
