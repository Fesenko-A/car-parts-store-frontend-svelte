import { goto } from "$app/navigation";
import { get } from "svelte/store";
import { user, isAdmin } from "../stores/userStore";
import toast from "svelte-french-toast";

export function checkIfLoggedIn() {
  const currentUser = get(user);

  if (!currentUser) {
    goto("/login");
    toast.error("Please log in first");
    return false;
  }

  return true;
}

export function checkIfAdmin() {
  if (!get(isAdmin)) {
    goto("/");
    toast.error("Access denied");
    return false;
  }

  return true;
}
