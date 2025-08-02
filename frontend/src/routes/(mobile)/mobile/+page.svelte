<script lang="ts">
  import { scale } from "svelte/transition";
  import { goto } from "$app/navigation";
  import { onMount, onDestroy } from "svelte";

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

  $: currentTab = $navigate[1]
  $: tabsCache[currentTab as keyof typeof tabs] = tabs[currentTab as keyof typeof tabs];
  $: {
    if (currentTab) {
      if (typeof window != "undefined") goto(`/mobile?fragment=${currentTab}`)
    }
  }
  let time: number;

  async function onPop(e: PopStateEvent) {
    e.preventDefault();

    if (time) clearTimeout(time);

    time = setTimeout(() => {
      console.log("Tombol kembali ditekan")
      navigate.set(["/", "Home"])
    }, 200)
  }

  onMount(() => {
    function initBackButtonInterceptor() {
      history.pushState({ isApp: true }, '', "/");
      console.log(history.length)

      window.addEventListener('popstate', onPop);
    }

    initBackButtonInterceptor();
  })

  onDestroy(() => {
    if (typeof window != "undefined") {
      window.removeEventListener("popstate", onPop);
    }
  })
</script>

<main class="relative block w-full h-screen overflow-hidden" in:scale={{ duration: 200, start: 0.95 }}>
  {#each Object.entries(tabsCache) as [key, component], i (i)}
    <section
      class="block w-full h-full absolute bg-black transition-opacity duration-200 inset-0 {key == currentTab ? "overflow-y-auto z-10 pointer-events-auto opacity-100" : "overflow-y-hidden z-0 pointer-events-none opacity-0"}"
    >
      <svelte:component this={component} />
    </section>
  {/each}
</main>