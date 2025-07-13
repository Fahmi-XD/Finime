<script lang="ts">
  import { fetchAnimeSearch, fetchAnimeDetail } from "$/hooks/animeHook";
  import LoadingElements from "$/components/elements/LoadingElements.svelte";
  import { page } from "$app/state";
  import type { IQuerySearch } from "./+page";
  import type { ISearchResponse, GenreList } from "$/types/animeSearch";
  import type { IAnimeDetail } from "$/types/animeType";
  import AnimeHeroSearchLayout from "$/components/nonton/layouts/AnimeHeroSearchLayout.svelte";
  import MangaHeroSearchLayout from "$/components/nonton/layouts/MangaHeroSearchLayout.svelte";
  import { filterStore } from "$/stores/filterStore";
  import type { IMangaSearchResponse } from "$/types/mangaSearchType";
  import type { IMangaDetailResponse } from "$/types/mangaDetailTypes";
  import { fetchMangaDetailOri, fetchMangaSearch } from "$/hooks/mangaHook";

  const { data } = $props<{
    data: IQuerySearch;
  }>();

  let path = $derived(page.url.pathname);

  let isLoading = $state(true);
  let animeList = $state<Partial<ISearchResponse>>({});
  let animeDetail = $state<Partial<IAnimeDetail>>({});

  let mangaList = $state<Partial<IMangaSearchResponse>>({});
  let mangaDetail = $state<Partial<IMangaDetailResponse>>({});

  $effect(() => {
    loadData(path.replace("/search/", ""));
  });

  async function loadData(query = "") {
    try {
      isLoading = true;
      if ($filterStore === "anime") {
        animeList = await fetchAnimeSearch(query);
        animeDetail = (await fetchAnimeDetail(animeList.data?.animeList[0].animeId as string)).data;
      } else {
        mangaList = (await fetchMangaSearch(query)) as IMangaSearchResponse;
        mangaDetail = (await fetchMangaDetailOri(
          mangaList?.manga_list?.[0]?.endpoint.replace("/", "") as string,
        )) as IMangaDetailResponse;
      }
    } catch (error) {
      console.error("Failed to fetch manga data:", error);
    } finally {
      isLoading = false;
    }
  }
</script>

<section class="mt-15 relative">
  <div
    class="absolute inset-0 -z-[1] bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(var(--secondary))] to-[hsl(var(--tertiary))] opacity-20 blur-lg"
  ></div>

  {#if isLoading}
    <div class="flex justify-center items-center h-screen">
      <LoadingElements />
    </div>
  {:else if $filterStore === "anime"}
    {#if animeList.data?.animeList && animeList.data?.animeList?.length > 0}
      <AnimeHeroSearchLayout {animeList} {animeDetail} />
    {:else}
      <div class="text-center py-16">
        <svg
          class="mx-auto h-12 w-12 text-[hsl(var(--muted-foreground))]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 class="mt-2 text-lg font-medium text-[hsl(var(--foreground))]">No anime found</h3>
        <p class="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
          Try adjusting your search or filter
        </p>
      </div>
    {/if}
  {:else if $filterStore === "manga"}
    {#if mangaList?.manga_list && mangaList.manga_list.length > 0}
      <MangaHeroSearchLayout {isLoading} {mangaDetail} {mangaList} />
    {:else}
      <div class="text-center py-16">
        <svg
          class="mx-auto h-12 w-12 text-[hsl(var(--muted-foreground))]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 class="mt-2 text-lg font-medium text-[hsl(var(--foreground))]">No manga found</h3>
        <p class="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
          Try adjusting your search or filter
        </p>
      </div>
    {/if}
  {/if}
</section>
