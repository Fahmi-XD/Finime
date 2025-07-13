<script lang="ts">
  import AnimeLayout from "$components/nonton/layouts/AnimeLayout.svelte";
  import LoadingElements from "$/components/elements/LoadingElements.svelte";
  import { onMount } from "svelte";
  import AnimeHero from "$components/nonton/AnimeHero.svelte";
  import { fetchAnimeDetail, fetchAnimeHome, fetchToAnimeListSearch } from "$/hooks/animeHook";
  import type { IAnimeDetail } from "$/types/animeType";
  import type { Characters } from "$/types/toanimelistType";

  let animeList: any[] = [];
  let isLoading = true;
  let message = "";
  let animeDetail: Partial<IAnimeDetail> = {};
  let animeCharacters: Characters = { data: [] };
  let synopsis = "";

  onMount(async () => {
    try {
      const response = await fetchAnimeHome();
      animeList = response.ongoing.animeList || [];

      const response2 = await fetchAnimeDetail(animeList[0]?.animeId || "");
      const responseAnimeList = (await fetchToAnimeListSearch(response2.data.title || ""))[0];
      animeCharacters = responseAnimeList.characters || { data: [] };
      animeDetail = response2.data;
      synopsis = responseAnimeList.fullInfo?.data.synopsis || "";
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
      <AnimeHero {animeList} {animeDetail} {animeCharacters} {synopsis} />
      <AnimeLayout {animeList} />
    {/if}
  {/if}
</div>
