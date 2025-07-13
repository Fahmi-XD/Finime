<script lang="ts">
  import { filterStore } from "$stores/filterStore";
  import { onMount } from "svelte";
  import { Minimize2 } from "@lucide/svelte";

  export let isFilterSearchOpen: boolean = false;
  export let handleFilterIsOpen: () => void;

  let filterType: "manga" | "anime" = "anime";

  function handleFilter(type: "manga" | "anime") {
    filterType = type;
    filterStore.set(filterType);
  }

  onMount(() => {
    filterStore.set(filterType);
  });
</script>

<div
  class="fixed {isFilterSearchOpen
    ? 'pointer-events-auto opacity-100'
    : 'pointer-events-none opacity-0'} transition-opacity duration-300 inset-0 bg-[hsl(var(--background))] z-60 bg-opacity-50 flex items-center justify-center"
>
  <div class="bg-[hsl(var(--background))] border border-red-500 rounded-2xl shadow-xl p-6 w-80">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-semibold text-[hsl(var(--foreground))] text-center">
        Filter Search
      </h2>
      <Minimize2 class="cursor-pointer" onclick={handleFilterIsOpen} size="20" />
    </div>
    <p class="text-sm text-[hsl(var(--foreground))] mb-4 opacity-70 text-center">
      Pilih jenis konten yang ingin dicari:
    </p>
    <div class="flex justify-center space-x-4">
      <button
        id="filter-anime"
        class:bg-red-500={filterType === "anime"}
        on:click={() => handleFilter("anime")}
        class="px-4 py-2 text-base font-medium text-[hsl(var(--foreground))] hover:text-white hover:bg-red-600 rounded-full transition"
      >
        Anime
      </button>
      <button
        id="filter-manga"
        class:bg-red-500={filterType === "manga"}
        on:click={() => handleFilter("manga")}
        class="px-4 py-2 text-base font-medium text-[hsl(var(--foreground))] hover:text-white hover:bg-red-600 rounded-full transition"
      >
        Manga
      </button>
    </div>
  </div>
</div>
