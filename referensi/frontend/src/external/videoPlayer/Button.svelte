<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { getContext } from "svelte";

  export let round = false;

  const dispatch = createEventDispatcher();

  const cfg = getContext<any>("config");

  let offsetHeight: number = 0;

  function onPointerDown(e: Event): void {
    e.preventDefault(); // Prevent focus on pointerdown
  }

  function onPointerUp(e: Event): void {
    dispatch("pointerup");
  }

  function onKeydown(e: KeyboardEvent): void {
    switch (e.code) {
      case "Enter":
      case "NumpadEnter":
      case "Space":
        e.preventDefault(); // Prevent scroll
        e.stopPropagation();
        dispatch("pointerup");
        break;
    }
  }
</script>

<style>
  .button {
    box-sizing: border-box;
    position: relative;
    height: 100%;
    border-style: none;
    border-radius: 10px;
    border-width: 2px;
    outline: none;
    cursor: pointer;
  }

  @media (hover: hover) and (pointer: fine) {
    .button:focus {
      border-style: solid;
    }
  }
</style>

<div
  class="button"
  style="width:{offsetHeight}px; min-width:{offsetHeight}px; background-color:{$cfg.color}; border-color:{$cfg.focusColor}; border-radius:{round ? '9999px' : '10px'};"
  tabindex="0"
  bind:offsetHeight
  on:pointerdown={onPointerDown}
  on:pointerup={onPointerUp}
  on:keydown={onKeydown}>
  <slot />
</div>
