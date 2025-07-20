import { writable, fromStore } from "svelte/store";

export const history = writable<string[]>(["Home"]);

history.subscribe((value) => {
  if (fromStore(history).current.length > 5) {
    history.set(fromStore(history).current.slice(-5))
  }
})