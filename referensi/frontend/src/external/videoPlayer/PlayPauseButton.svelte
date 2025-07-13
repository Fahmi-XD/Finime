<script lang="ts">
  import Button from "./Button.svelte";
  import PlayPauseIcon from "./PlayPauseIcon.svelte";

  export let paused: boolean;
</script>

<Button on:pointerup>
  <PlayPauseIcon {paused} />
</Button>
