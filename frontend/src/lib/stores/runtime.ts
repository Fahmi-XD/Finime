import { writable } from "svelte/store";

export const runtimeData = writable<Record<string, any>>({});