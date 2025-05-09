import { derived, writable } from "svelte/store";
import type { User } from "../types";

// fake
export const users = writable<User[]>([
  {
    id: "u1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phoneNumber: "123456789",
    role: "Customer",
  },
  {
    id: "u2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    phoneNumber: "987654321",
    role: "Customer",
  },
]);

// real
const persist = <T>(key: string, initialValue: T) => {
  const storedValue =
    typeof window !== "undefined" ? localStorage.getItem(key) : null;
  const data = storedValue ? JSON.parse(storedValue) : initialValue;

  const store = writable<T>(data);

  if (typeof window !== "undefined") {
    store.subscribe((value) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }

  return store;
};

export const user = persist<User | null>("user", null);
export const isAdmin = derived(user, ($user) => $user?.role === "Admin");
