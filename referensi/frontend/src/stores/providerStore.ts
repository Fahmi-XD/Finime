import { writable, fromStore } from "svelte/store";

export const modeStore = writable<string>(loadFromLocalStorage() || "nonton"); // Default mode

function saveToLocalStorage(value: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("modeStore", value);
}

function loadFromLocalStorage() {
  if (typeof window === "undefined") return;
  return window.localStorage.getItem("modeStore");
}

modeStore.subscribe((value: string) => {
  saveToLocalStorage(value);
})