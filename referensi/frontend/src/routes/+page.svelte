<script lang="ts">
  import { onMount } from "svelte";
  import Hero from "$components/nonton/Hero.svelte";
  import HeroInformasi from "$/components/informasi/HeroInformasi.svelte";

  import MangaLayout from "$components/nonton/layouts/MangaLayout.svelte";
  import LoadingElements from "$/components/elements/LoadingElements.svelte";
  import { modeStore } from "$/stores/providerStore";
  import TopManga from "$components/nonton/TopManga.svelte";
  import Donation from "$/components/Donation.svelte";
  import { fetchPopularManga } from "$hooks/mangaHook";
  import UpdateList from "$components/nonton/UpdateList.svelte";
  // import Network from "$components/nonton/Network.svelte";

  let mangaList: {
    id: number;
    title: string;
    image: string;
    upload_on: string;
    description: string;
  }[] = [];

  let isLoading = false;

  onMount(async () => {
    try {
      mangaList = await fetchPopularManga();
    } catch (error) {
      console.error("Failed to fetch manga data:", error);
    } finally {
      isLoading = false;
    }
  });
</script>

<svelte:head>
  <title>Finime - Platform baca manga & nonton anime.</title>
  
  <meta
    name="title"
    content="Finime - Platform baca manga & nonton anime."
  />
  <meta name="description" content="Nonton anime dan baca manga favoritmu hanya di finime. Jelajahi konten yang seru dan fitur terlangkap." />

  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.finime.my.id/" />
  <meta
    property="og:title"
    content="Finime - Platform baca manga & nonton anime."
  />
  <meta property="og:description" content="" />
  <meta property="og:image" content="https://www.finime.my.id/icon.jpg" />

  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://www.finime.my.id/" />
  <meta
    property="twitter:title"
    content="Finime - Platform baca manga & nonton anime."
  />
  <meta property="twitter:description" content="" />
  <meta property="twitter:image" content="https://www.finime.my.id/icon.jpg" />
</svelte:head>

<main>
  <Donation />
  {#if $modeStore === "nonton"}  
    {#if !isLoading}
      <Hero />
      <UpdateList />
    {/if}
    <!-- <SearchManga /> -->
    {#if isLoading}
      <LoadingElements />
    {:else}
      <MangaLayout {mangaList} text="Last post">
        <TopManga />
      </MangaLayout>
    {/if}
  {:else}
      <!-- <LoadingElements teks="Mengalihkan ke mode nonton..." /> -->
      <HeroInformasi />
  {/if}
</main>
