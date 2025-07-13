<script lang="ts">
  import { onDestroy } from "svelte";
  import * as screenfull from "./libs/screenfull.js";

  export let element: HTMLElement;
  export let isFullscreen: boolean;
  export let isFullscreenEnabled: boolean;

  isFullscreenEnabled = (screenfull as any).isEnabled;

  if (isFullscreenEnabled) screenfull.on("change", onChange);

  function onChange(e: Event): void {
    if (element == e.target) isFullscreen = (screenfull as any).isFullscreen;
  }

  $: {
    if (isFullscreenEnabled)
      isFullscreen ? screenfull.request(element) : screenfull.exit();
  }

  onDestroy(() => {
    screenfull.off("change", onChange);
  });
</script>
