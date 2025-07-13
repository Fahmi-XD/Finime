import type { IGetAllBadges } from "$lib/api/types/userType";
import { writable } from "svelte/store";

export const user = writable({});
export const badges = writable<IGetAllBadges[]>([]);