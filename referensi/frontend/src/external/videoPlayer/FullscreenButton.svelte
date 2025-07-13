<script lang="ts">
  import Button from "./Button.svelte";
  import FullscreenIcon from "./FullscreenIcon.svelte";

  export let isFullscreen: boolean;
</script>

<Button on:pointerup>
  <FullscreenIcon {isFullscreen} />
</Button>
