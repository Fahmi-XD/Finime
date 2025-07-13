<script lang="ts">
  import { ArrowLeft, Home, RefreshCcw, Check, ArrowRight, Bot, Maximize } from "@lucide/svelte";
  import { onDestroy, tick } from "svelte";
  import { modeStore } from "$/stores/providerStore";

  const DELTA = 10;
  const DRAG_THRESHOLD = 50;
  const modeProvider = [
    {
      id: "umum",
      name: "Umum",
    },
    {
      id: "info",
      name: "Informasi",
    },
  ];

  let overlayElement: HTMLButtonElement | null = null;
  let asideElement: HTMLElement | null = null;
  let isDrag = false;
  let right = 0;
  let top = 160;
  let x0 = 0,
    y0 = 0,
    r0 = 0,
    t0 = 0;
  let anim: number = 0;
  let isClick: boolean = false;
  let cleanupClickOutside: (() => void) | null = null;
  let currentPosition: "right" | "left" = "right";
  let isIncreaseing = false;
  let rightOffset = 0;
  let btnSaveDisabled = true;

  let modeSelect: string = "komiku";

  $: {
    btnSaveDisabled = $modeStore === modeSelect;
    if (!isClick) {
      modeSelect = $modeStore;
    }
  }
  
  function handleClickSave() {
    btnSaveDisabled = true;
    modeStore.set(modeSelect);
    isClick = false;
  }

  function backtoPosition() {
    if (typeof window === "undefined") return;

    const btnWidth = overlayElement?.offsetWidth || 48;
    const minRight = 0;
    const maxRight = window.innerWidth - btnWidth - 15;

    if (right < 0) {
      right = minRight;
      currentPosition = "right";
    }
    if (right > maxRight) {
      right = maxRight;
      currentPosition = "left";
    }

    if (isDrag || right < minRight + 20 || right > maxRight - 20) {
      cancelAnimationFrame(anim);
      isIncreaseing = false;
      rightOffset = 1;
      return;
    }

    if (right > minRight && right < maxRight / 2 + 48) {
      right -= rightOffset;
      currentPosition = "right";
      if (right < minRight) right = minRight;
    } else {
      right += rightOffset;
      currentPosition = "left";
      if (right > maxRight) right = maxRight;
    }

    rightOffset += DELTA;
    isIncreaseing = true;
    anim = requestAnimationFrame(backtoPosition);
  }

  function onClickOutside() {
    isClick = false;
  }

  function getClientXY(e: MouseEvent | TouchEvent, type: 'start' | 'move' | 'end' = 'move') {
    if (e instanceof MouseEvent) {
      return { x: e.clientX, y: e.clientY };
    } else {
      let touch: Touch | undefined;
      if (type === 'end') {
        touch = (e as TouchEvent).changedTouches[0];
      } else {
        touch = (e as TouchEvent).touches[0];
      }
      return { x: touch?.clientX ?? 0, y: touch?.clientY ?? 0 };
    }
  }

  function handleDragStart(e: MouseEvent | TouchEvent) {
    if (typeof window === "undefined") return;
    isDrag = true;
    const { x, y } = getClientXY(e, 'start');
    x0 = x;
    y0 = y;
    if (overlayElement) {
      const style = getComputedStyle(overlayElement);
      r0 = parseInt(style.right, 10) || 0;
      t0 = parseInt(style.top, 10) || 0;
    }
    if (e instanceof MouseEvent) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    } else {
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("touchend", onTouchEnd);
    }
  }

  function handleDragMove(e: MouseEvent | TouchEvent) {
    if (isDrag) {
      const { x, y } = getClientXY(e);
      const dx = x - x0;
      const dy = y - y0;
      right = r0 - dx;
      top = t0 + dy;
    }
  }

  async function handleDragEnd(e: MouseEvent | TouchEvent) {
    if (typeof window === "undefined") return;
    const { x, y } = getClientXY(e, 'end');
    const dx = x - x0;
    const dy = y - y0;
    if (Math.hypot(dx, dy) < DRAG_THRESHOLD) {
      isClick = !isClick;
      await tick();
      const handleClickOutside = (ev: MouseEvent | TouchEvent) => {
        if (
          !overlayElement?.contains(ev.target as Node) &&
          !asideElement?.contains(ev.target as Node)
        ) {
          isClick = false;
          cleanupClickOutside?.();
        }
      };
      if (e instanceof MouseEvent) {
        window.addEventListener("click", handleClickOutside as EventListener);
        cleanupClickOutside = () => {
          window.removeEventListener("click", handleClickOutside as EventListener);
          cleanupClickOutside = null;
        };
      } else {
        window.addEventListener("touchstart", handleClickOutside as EventListener);
        cleanupClickOutside = () => {
          window.removeEventListener("touchstart", handleClickOutside as EventListener);
          cleanupClickOutside = null;
        };
      }
    }
    isDrag = false;
    backtoPosition();
    if (e instanceof MouseEvent) {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    } else {
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    }
  }

  function onMouseDown(e: MouseEvent) { handleDragStart(e); }
  function onMouseMove(e: MouseEvent) { handleDragMove(e); }
  async function onMouseUp(e: MouseEvent) { await handleDragEnd(e); }
  function onTouchStart(e: TouchEvent) { handleDragStart(e); }
  function onTouchMove(e: TouchEvent) { handleDragMove(e); }
  async function onTouchEnd(e: TouchEvent) { await handleDragEnd(e); }

  onDestroy(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("click", onClickOutside);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    }
  });
</script>

<section class="fixed top-30 right-0 block z-50">
  <button
    bind:this={overlayElement}
    class="w-12 select-none border border-red-500 fixed h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center text-red-500 hover:bg-red-600 hover:text-white shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
    style="right: {right}px; top: {top}px; cursor: {isDrag ? 'grabbing' : 'grab'}"
    title="Menu provider"
    on:mousedown={onMouseDown}
    on:touchstart={onTouchStart}
  >
    <Bot />
  </button>
  <aside
    bind:this={asideElement}
    class="bg-[#121212] text-white {isClick
      ? 'translate-x-0 pointer-events-auto'
      : currentPosition === 'left'
        ? '-translate-x-full pointer-events-none'
        : 'translate-x-full pointer-events-none'} fixed border border-white/40 {currentPosition ===
    'right'
      ? 'right-0'
      : 'left-0'} rounded-2xl shadow-lg w-72 p-6 flex flex-col space-y-6 z-40 {!isIncreaseing
      ? 'transition-transform duration-300 ease-in-out'
      : ''}"
    style="will-change: transform;"
  >
    <header class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-semibold text-red-500">Mode Settings</h2>
      </div>
      <button
        on:click={() => (isClick = false)}
        aria-label="Close Provider Settings"
        class="text-white hover:text-red-400 focus:outline-none"
      >
        <ArrowRight />
      </button>
    </header>

    <!-- <section>
      <label for="anime-provider" class="block mb-2 text-sm font-semibold text-white/80">
        Select Anime Provider
      </label>
      <select
        id="anime-provider"
        bind:value={animeProviderSelect}
        class="w-full rounded-md bg-[#1a1a1a] text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        {#each animeProvider as provider}
          <option value={provider.id}>{provider.name}</option>
        {/each}
      </select>
    </section> -->

    <section>
      <label for="manga-provider" class="block mb-2 text-sm font-semibold text-white/80">
        Select Mode
      </label>
      <select
        id="manga-provider"
        bind:value={modeSelect}
        class="w-full rounded-md bg-[#1a1a1a] text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        {#each modeProvider as provider}
          <option value={provider.id}>{provider.name}</option>
        {/each}
      </select>
    </section>

    <p class="text-xs opacity-50">Tombol pintasan cepat</p>

    <section class="flex flex-wrap items-center justify-between gap-5">
      <button
        aria-label="Back"
        title="Back"
        class="w-12 border border-red-500 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center text-red-500 hover:bg-red-600 hover:text-white shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        <ArrowLeft />
      </button>
      <button
        aria-label="Home"
        title="Home"
        class="w-12 border border-red-500 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center text-red-500 hover:bg-red-600 hover:text-white shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        <Home />
      </button>
      <button
        aria-label="Reload"
        title="Reload"
        class="w-12 border border-red-500 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center text-red-500 hover:bg-red-600 hover:text-white shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        <RefreshCcw />
      </button>
      <button
        aria-label="Save"
        title="Save"
        disabled={btnSaveDisabled}
        on:click={handleClickSave}
        class="w-12 disabled:opacity-30 border border-red-500 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center text-red-500 hover:bg-red-600 hover:text-white shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        <Check />
      </button>
    </section>
  </aside>
</section>
