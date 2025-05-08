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
export const user = writable<User | null>(null);
export const isAdmin = derived(user, ($user) => $user?.role === "Admin");
