<script lang="ts">
  import { Button, Label } from "flowbite-svelte";
  import { isAdmin, user } from "../../../stores/userStore";
  import {
    ArrowRightToBracketOutline,
    RefreshOutline,
  } from "flowbite-svelte-icons";
  import { goto } from "$app/navigation";
  import { checkIfLoggedIn, logout } from "$lib";
  import { onMount } from "svelte";
  import UpdatePasswordModal from "../../../components/UpdatePasswordModal.svelte";
  import toast from "svelte-french-toast";
  import CustomSpinner from "../../../components/CustomSpinner.svelte";

  let isChecking = true;

  onMount(() => {
    if (!checkIfLoggedIn()) return;
    isChecking = false;
  });

  let updatePasswordModal = false;
</script>

<svelte:head>
  <title>My profile</title>
</svelte:head>

{#if !isChecking}
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
        <Button on:click={() => (updatePasswordModal = true)} class="p-3">
          <RefreshOutline />Update Password
        </Button>
        <Button
          on:click={() => {
            logout();
            goto("/");
            toast.success("Successfully logged out");
          }}
          class="p-3"
        >
          <ArrowRightToBracketOutline />
          Log out
        </Button>
        {#if $isAdmin}
          <Button href="/admin" class="p-3">Admin panel</Button>
        {/if}
      </div>
    {/if}
  </div>
{:else}
  <CustomSpinner />
{/if}

<UpdatePasswordModal bind:open={updatePasswordModal} />
