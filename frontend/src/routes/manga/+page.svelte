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
    <Pagination {currentPage} totalPages={Infinity} onPageChange={handlePageChange} />
  {/if}
</main>
