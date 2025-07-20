<script lang="ts">
  import Home from "$lib/components/mobile/Home.svelte";
  import SeeAll from "$lib/components/mobile/SeeAll.svelte";
  import Search from "$lib/components/mobile/Search.svelte";
  import Anime from "$lib/components/mobile/Anime.svelte";
  import Manga from "$lib/components/mobile/Manga.svelte";
  import About from "$lib/components/mobile/About.svelte";

  import { history } from "$lib/stores/history";
  import { goto } from "$app/navigation";
	import { onMount, type Component } from "svelte";
  import { mode } from "$lib/stores/mode";

  const fragments = {
    "Home": Home,
    "SeeAll": SeeAll,
    "Search": Search,
    "Anime": Anime,
    "Manga": Manga,
    "About": About
  }

  $: objActiveFragment = {
    "Home": Home
  }
  $: activeFragment = $history[$history.length - 1];
  $: (objActiveFragment as any)[(activeFragment as any)] = (fragments as any)[(activeFragment as any)]
  $: console.log($history)
  $: {
    if (typeof window != "undefined") goto(`/mobile?fragment=${activeFragment}`, { replaceState: true })
  }

  onMount(() => {
    mode.set("flat")

    const handlePopState = () => {
      history.update((prev) => [...prev, prev[prev.length - 2]])
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  })
</script>

<main class="relative flex w-screen bg-black h-screen overflow-hidden">
  {#each Object.entries(objActiveFragment) as [fragment, ComponentFragment], i (i)}
    <section
      class="fixed overscroll-contain block inset-0 w-auto h-auto bg-black will-change-auto transition-all duration-200"
      class:opacity-0={activeFragment !== fragment}
      class:opacity-100={activeFragment == fragment}
      class:z-0={activeFragment !== fragment}
      class:z-10={activeFragment == fragment}
      class:overflow-y-hidden={activeFragment !== fragment}
      class:overflow-y-auto={activeFragment == fragment}
      style="pointer-events: {activeFragment == fragment ? "auto" : "none"};"
    >
      <svelte:component this={ComponentFragment} />
    </section>
  {/each}
</main>