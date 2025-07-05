<script lang="ts">
  import { onMount } from "svelte";
  import SearchManga from "$components/SearchManga.svelte";
  import MangaLayout from "$components/layouts/MangaLayout.svelte";
  import LoadingElements from "$components/elements/LoadingElements.svelte";
  import Pagination from "$components/elements/Pagination.svelte";
  import MenuHero from "$components/MenuHero.svelte";
  import MangaHero from "$/components/MangaHero.svelte";
  import { fetchMangaDetail, fetchMangaPage, fetchNewsManga } from "$hooks/mangaHook";
  import { mangaProvider } from "$/stores/providerStore";

  let mangaList: any[] = [];
  let currentPage = 1;
  let isLoading = true;
  let hasMorePages = true;

  const MenuHeroData = {
    title: "Explore the Latest Manga & Manhwa",
    description: "Enjoy your favorite Manga & Manhwa only on ComicHive!",
    imageUrl: "/icon.jpg",
  };

  const loadMangaPage = async (page: number) => {
    if (!hasMorePages) return;

    try {
      // isLoading = true;
      const newMangaList = await fetchMangaPage(page);

      if (newMangaList.length > 0) {
        mangaList = newMangaList;
      } else {
        hasMorePages = false;
      }
    } catch (err) {
      console.error("Failed to load manga data:", err);
    }
  };

  onMount(() => {
    loadMangaPage(currentPage);
    fetchTrending();
  });

  let trending: any = [];
  let mangaDetail: any = {};

  async function fetchTrending() {
    try {
      const response = await fetchNewsManga();
      const detail = await fetchMangaDetail(response[0].endpoint);
      trending = response.slice(0, 5);
      mangaDetail = detail;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      isLoading = false;
    }
  }

  $: {
    if ($mangaProvider) {
      fetchTrending();
    }
  }

  const handlePageChange = (page: number) => {
    currentPage = page;
    loadMangaPage(page);
  };
</script>

<svelte:head>
  <title>ComicHive - Read manga for free!</title>
</svelte:head>

<main>
  {#if isLoading}
    <LoadingElements />
  {:else}
    <MangaHero {trending} {mangaDetail} />
    <MenuHero {...MenuHeroData} />
    <MangaLayout {mangaList} text="Updated at " />
    <Pagination
        {currentPage}
        totalPages={Infinity}
        onPageChange={handlePageChange}
      />
    <!-- {#if mangaList.length === 0}
      <div class="text-center pb-10">
        <svg class="mx-auto h-12 w-12 text-[hsl(var(--muted-foreground))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="mt-2 text-lg font-medium text-[hsl(var(--foreground))]">No manga found</h3>
        <p class="mt-1 text-sm text-[hsl(var(--muted-foreground))]">Try adjusting your search or filter</p>
      </div>
    {:else} -->
    <!-- {/if} -->
  {/if}
</main>
