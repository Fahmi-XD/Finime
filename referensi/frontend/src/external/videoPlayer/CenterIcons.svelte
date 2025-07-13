<script lang="ts">
  import { getContext } from "svelte";

  import PlayIconCenter from "./PlayIconCenter.svelte";
  import Spinner from "./Spinner.svelte";

  export let isBuffering: boolean;
  export let isSpinnerVisible: boolean;
  export let isIconVisible: boolean;

  let offsetWidth: number = 0;

  const cfg = getContext<any>("config");
</script>

<style>
  .center-icons {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>

<div
  class="center-icons"
  style="width:{$cfg.centerIconSize}; height:{$cfg.centerIconSize};"
  bind:offsetWidth>
  <PlayIconCenter hidden={!isIconVisible} />
  <Spinner
    hidden={!isSpinnerVisible}
    color={isBuffering ? $cfg.color : $cfg.iconColor}
    size="{offsetWidth + 10}px" />
</div>
