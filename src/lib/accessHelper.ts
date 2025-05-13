import { goto } from "$app/navigation";
import { get } from "svelte/store";
import toast from "svelte-french-toast";
import { browser } from "$app/environment";
import { user, isAdmin } from "../stores/userStore";

export const checkIfLoggedIn = () => {
  const currentUser = get(user);

  if (!currentUser) {
    if (browser) {
      goto("/login");
      toast.error("Please log in first");
    }
    return false;
  }

  return true;
};

export const checkIfAdmin = () => {
  if (!get(isAdmin)) {
    if (browser) {
      goto("/");
      toast.error("Access denied");
    }
    return false;
  }

  return true;
};
