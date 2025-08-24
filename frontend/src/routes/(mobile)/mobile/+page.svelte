<script lang="ts">
  import { scale } from "svelte/transition";

  import Home from "$lib/components/mobile/Home.svelte";
  import Anime from "$lib/components/mobile/Anime.svelte";
  import Manga from "$lib/components/mobile/Manga.svelte";
  import Other from "$lib/components/mobile/Other.svelte";

  import { navigate, history as his } from "$lib/stores/history";

  const tabs = {
    Home: Home,
    Anime: Anime,
    Manga: Manga,
    Other: Other
  }

  let tabsCache: Partial<Record<keyof typeof tabs, any>> = {};
  tabsCache["Home"] = tabs.Home;

  $: currentTab = $navigate[1]
  $: tabsCache[currentTab as keyof typeof tabs] = tabs[currentTab as keyof typeof tabs];

  let time: number;

  async function onPop(e: PopStateEvent) {
    if (time) clearTimeout(time);

    time = setTimeout(() => {
      let current = $his.pop();
      if (current) {
        if (current[1] == currentTab) current = $his.pop();
        console.log("Tombol kembali ditekan", current)
        navigate.set(["back", current?.[1] || "Home"]);
      } else {
        navigate.set(["back", "Home"]);
      }
    }, 100)
  }
</script>

<main class="relative block w-full h-screen overflow-hidden will-change-auto" in:scale={{ duration: 200, start: 1.2 }}>
  {#each Object.entries(tabsCache) as [key, component], i (i)}
    <section
      class="block w-full h-full overflow-x-hidden absolute bg-black transition-opacity duration-200 inset-0 {key == currentTab ? "overflow-y-auto z-10 pointer-events-auto opacity-100" : "overflow-y-hidden z-0 pointer-events-none opacity-0"}"
    >
      <svelte:component this={component} />
    </section>
  {/each}
</main>