<script lang="ts">
  // import { onMount, tick } from "svelte";
  import Loading from "$/components/elements/Loading.svelte";
  import ChapterLayout from "$components/nonton/layouts/ChapterLayout.svelte";
  import type { ChapterSlug } from "./+page";
  // import { FetchApi } from "$utils/Fetch";

  export let data: ChapterSlug;

  let chapter: any = null;
  let isLoading = false;
  let notFound = false;
  let title: any;
  // let soundCloudPlayer: HTMLIFrameElement | null = null;

  // onMount(async () => {
  //   try {
  //     const response = await FetchApi.get(`/manga/chapter/${data.slug}`);

  //     if (response.data.status == false) {
  //       notFound = true;
  //     } else {
  //       chapter = response.data;
  //       title = response.data.chapter_name;
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch chapter:", error);
  //     notFound = true;
  //   } finally {
  //     isLoading = false;
  //     await tick();
  //   }
  //   if (soundCloudPlayer) {
  //     (soundCloudPlayer as HTMLIFrameElement).contentWindow?.postMessage(
  //       JSON.stringify({ method: "play" }),
  //       "https://w.soundcloud.com",
  //     );
  //   };
  // });
</script>

<svelte:head>
  <title>ComicHive - Chapter {title}</title>
</svelte:head>

{#if isLoading}
  <div class="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] h-full py-[250px]">
    <Loading />
  </div>
{:else if notFound}
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-[hsl(var(--background))] text-[hsl(var(--foreground))] p-6"
  >
    <div class="max-w-md w-full space-y-6 text-center">
      <div class="space-y-2">
        <div
          class="mx-auto h-24 w-24 rounded-full bg-[hsl(var(--destructive)/0.2)] p-4 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="hsl(var(--destructive))"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
          </svg>
        </div>
        <h2 class="text-2xl font-semibold">Not Found</h2>
        <p class="text-[hsl(var(--muted-foreground))]">
          Chapter Tidak Ditemukan atau mungkin belum release.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href="/"
          class="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)/0.9)] transition-colors"
        >
          Go to Homepage
        </a>
        <a
          href="/manga/{data.slug.replace('-chapter-60', '')}"
          class="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary)/0.9)] transition-colors"
        >
          Manga Detail
        </a>
      </div>
    </div>
  </div>
{:else}
  <ChapterLayout />
{/if}
