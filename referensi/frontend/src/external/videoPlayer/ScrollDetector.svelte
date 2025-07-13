<script lang="ts">
  import debounce from "./libs/debounce.js";
  import { onDestroy } from "svelte";

  export let isScrolling = false;

  let timeout: number;

  function onScroll(e: Event): void {
    isScrolling = true;
    setScrollEndTimeout();
  }

  const setScrollEndTimeout = debounce(
    () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        isScrolling = false;
      }, 100);
    },
    100,
    true
  );

  onDestroy(() => {
    clearTimeout(timeout);
  });
</script>

<svelte:window on:scroll={onScroll} />
