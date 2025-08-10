import { writable, fromStore } from "svelte/store";

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
})