<script lang="ts">
  import Button from "./Button.svelte";
  import VolumeIcon from "./VolumeIcon.svelte";

  export let muted: boolean;
</script>

<Button on:pointerup>
  <VolumeIcon {muted} />
</Button>
