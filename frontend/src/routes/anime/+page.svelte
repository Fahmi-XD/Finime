<script lang="ts">
  import AnimeLayout from "$components/layouts/AnimeLayout.svelte";
  import MenuHero from "$components/MenuHero.svelte";
  import LoadingElements from "$components/elements/LoadingElements.svelte";
  import { onMount } from "svelte";
  import SearchAnime from "$components/SearchAnime.svelte";
  import AnimeHero from "$/components/AnimeHero.svelte";
  import { fetchAnimeHome } from "$/hooks/animeHook";

  let animeList: any[] = [];
  let isLoading = true;
  let message = "";

  const MenuHeroData = {
    title: "Watch Latest Anime",
    description: "Enjoy streaming your favorite anime only on ComicHive!",
    imageUrl: "/icon.jpg",
  };

  onMount(async () => {
    try {
      const response = await fetchAnimeHome();
      animeList = response.ongoing.animeList || [];
    } catch (error) {
      console.error("Error fetching data:", error);
      isLoading = false;
      message = "Server error";
    } finally {
      isLoading = false;
    }
  });
</script>

<svelte:head>
  <title>ComicHive - Watch anime for free without ads!</title>
</svelte:head>

<div>
  {#if isLoading}
    <LoadingElements />
  {:else}
    {#if animeList.length !== 0}
      <AnimeHero {animeList} />
      <AnimeLayout {animeList} />
    {/if}
  {/if}
</div>
