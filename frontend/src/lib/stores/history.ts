import { writable, fromStore } from "svelte/store";
// import { goto } from "$app/navigation";

export const history = writable<string[][]>([["/", "Home"]]);
export const navigate = writable<string[]>(["", "Home"]);

history.subscribe(() => {
  if (fromStore(history).current.length > 5) {
    history.set(fromStore(history).current.slice(-5))
  }
})
navigate.subscribe((value) => {
  if (value[0] != "back") {
    history.update((prev) => [...prev, value])
  }
  // if (typeof window != "undefined") {
  //   goto("/mobile?fragment=" + value[1].replaceAll(",", ""));
  // }
})