<script lang="ts">
  import { scale } from "svelte/transition";

  import Home from "$lib/components/mobile/Home.svelte";
  import Anime from "$lib/components/mobile/Anime.svelte";
  import Manga from "$lib/components/mobile/Manga.svelte";

  import { navigate } from "$lib/stores/history";

  const tabs = {
    Home: Home,
    Anime: Anime,
    Manga: Manga
  }

  let tabsCache: Partial<Record<keyof typeof tabs, any>> = {};
  tabsCache["Home"] = tabs.Home;
    
  $: currentTab = $navigate[1];
  $: tabsCache[currentTab as keyof typeof tabs] = tabs[currentTab as keyof typeof tabs];
</script>

<main class="relative block w-full h-screen overflow-hidden" in:scale={{ duration: 200, start: 0.9 }}>
  {#each Object.entries(tabsCache) as [key, component], i (i)}
    <section
      class="block w-full h-full absolute bg-black transition-opacity duration-200 inset-0 {key == currentTab ? "overflow-y-auto z-10 pointer-events-auto opacity-100" : "overflow-y-hidden z-0 pointer-events-none opacity-0"}"
    >
      <svelte:component this={component} />
    </section>
  {/each}
</main>