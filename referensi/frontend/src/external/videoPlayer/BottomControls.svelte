<script lang="ts">
  import { getContext } from "svelte";

  export let hidden: boolean;
  export let isPointerOver: boolean;

  const cfg = getContext<any>("config");

  let lastFocusElement: HTMLElement | null = null;
  let wasTabDown: boolean = false;

  function onPointerOver(e: Event): void {
    isPointerOver = true;
  }

  function onPointerOut(e: Event): void {
    isPointerOver = false;
  }

  function onTransitionEnd(e: TransitionEvent): void {
    if (e.propertyName == "visibility") {
      if (!hidden && wasTabDown && lastFocusElement) {
        lastFocusElement.focus({ preventScroll: true }); // Restore focus when controls opened by tab press
      } else {
        lastFocusElement = document.activeElement as HTMLElement;
      }
    }
  }
</script>

<style>
  .controls {
    position: relative;
    box-sizing: border-box;
    min-height: 40px;
    max-height: 150px;
    top: 100%;
    transform: translateY(-100%);
    padding: 10px;
    display: flex;
    gap: 6px;
    visibility: visible;
    transition: transform 0.5s ease, visibility 0.5s linear;
    z-index: 10;
    pointer-events: auto;
  }

  .hidden {
    visibility: hidden;
    transform: translateY(100%);
    pointer-events: none;
  }
</style>

<svelte:window
  on:pointermove={() => (wasTabDown = false)}
  on:keydown={(e) => (wasTabDown = e.code === 'Tab')} />

<div
  class:hidden
  class="controls"
  style="height:{$cfg.controlsHeight}; background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.2) 80%);"
  on:pointerover={onPointerOver}
  on:pointerout={onPointerOut}
  on:transitionend={onTransitionEnd}>
  <slot />
</div>
