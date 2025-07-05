import { writable } from "svelte/store";

export const mangaProvider = writable<string>("komiku");
export const animeProvider = writable<string>("otakudesu")