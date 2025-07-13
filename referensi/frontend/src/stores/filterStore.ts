import { writable } from "svelte/store";

export const filterStore = writable<"manga" | "anime">("anime");