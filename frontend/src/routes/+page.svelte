<script lang="ts">
  import { onMount } from "svelte";
  import Hero from "../components/Hero.svelte";
  import MangaLayout from "../components/layouts/MangaLayout.svelte";
  import LoadingElements from "../components/elements/LoadingElements.svelte";
  import SearchManga from "../components/SearchManga.svelte";
  import TopManga from "../components/TopManga.svelte";
  import Donation from "../components/Donation.svelte";
  // import Network from "../components/Network.svelte";

  let mangaList: {
    id: number;
    title: string;
    image: string;
    upload_on: string;
    description: string;
  }[] = [];

  let isLoading = false;

  // onMount(async () => {
  //   try {
  //     mangaList = await fetchPopularManga();
  //   } catch (error) {
  //     console.error("Failed to fetch manga data:", error);
  //   } finally {
  //     isLoading = false;
  //   }
  // });
</script>

<svelte:head>
  <title>Finime - Platform baca manga & nonton anime.</title>
  
  <meta
    name="title"
    content="Finime - Platform baca manga & nonton anime."
  />
  <meta name="description" content="" />

  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://c.tuxedolabs.xyz/" />
  <meta
    property="og:title"
    content="Finime - Platform baca manga & nonton anime."
  />
  <meta property="og:description" content="" />
  <meta property="og:image" content="https://c.tuxedolabs.xyz/icon.jpg" />

  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://c.tuxedolabs.xyz/" />
  <meta
    property="twitter:title"
    content="Finime - Platform baca manga & nonton anime."
  />
  <meta property="twitter:description" content="" />
  <meta property="twitter:image" content="https://c.tuxedolabs.xyz/icon.jpg" />
</svelte:head>

<main>
  {#if !isLoading}
    <Hero />
  {/if}
  <SearchManga />
  {#if isLoading}
    <LoadingElements />
  {:else}
    <Donation />
    <MangaLayout {mangaList} text="Last post">
      <TopManga />
    </MangaLayout>
  {/if}
</main>
