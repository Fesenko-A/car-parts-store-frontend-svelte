<script lang="ts">
  import { changePassword } from "$lib";
  import { Button, Input, Label, Modal } from "flowbite-svelte";
  import toast from "svelte-french-toast";
  import { fade } from "svelte/transition";

  export let open: boolean = false;

  let oldPassword = "";
  let newPassword = "";
  let repeatPassword = "";
  let passwordValid = false;
  let passwordsMatch = false;
  let error: string | null = null;
  let success = false;
  let loading = false;

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

  const handleSubmit = async () => {
    error = null;
    success = false;

    if (!validateRepeatPassword()) {
      error = "Passwords do not match";
      return;
    }

    loading = true;
    try {
      await changePassword(oldPassword, newPassword);
      toast.success("Password has been changed successfully!");
      success = true;
      oldPassword = newPassword = repeatPassword = "";
      passwordValid = false;
      passwordsMatch = false;
      open = false;
    } catch (e) {
      error = (e as Error).message;
      toast.error(error);
    } finally {
      loading = false;
    }
  };
</script>

{#if open}
  <div transition:fade={{ duration: 100 }}>
    <Modal
      {open}
      size="xs"
      autoclose={false}
      class="w-full"
      on:close={() => (open = false)}
    >
      <form
        class="flex flex-col space-y-6"
        action="#"
        on:submit|preventDefault={handleSubmit}
      >
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
          Update password
        </h3>
        <Label class="space-y-2">
          <div>
            <Input
              type="password"
              name="oldPassword"
              placeholder="Current password"
              required
              bind:value={oldPassword}
            />
          </div>
        </Label>
        <Label class="space-y-2">
          <div>
            <Input
              type="password"
              name="newPassword"
              placeholder="New password"
              required
              bind:value={newPassword}
              on:blur={validatePassword}
              on:input={validatePassword}
            />
            {#if newPassword && !passwordValid}
              <p class="text-sm text-red-600">
                Password must be at least 8 characters and contain numbers
              </p>
            {/if}
          </div>
        </Label>
        <Label class="space-y-2">
          <div>
            <Input
              type="password"
              name="repeatPassword"
              placeholder="Repeat new password"
              required
              bind:value={repeatPassword}
              on:blur={validateRepeatPassword}
              on:input={validateRepeatPassword}
            />
            {#if repeatPassword && !passwordsMatch}
              <p class="text-sm text-red-600">Passwords do not match</p>
            {/if}
          </div>
        </Label>
        <Button
          type="submit"
          class="w-full"
          disabled={!passwordValid || !passwordsMatch || oldPassword.length < 8}
        >
          {#if loading}
            Updating...
          {:else}
            Submit
          {/if}
        </Button>
      </form>
    </Modal>
  </div>
{/if}
