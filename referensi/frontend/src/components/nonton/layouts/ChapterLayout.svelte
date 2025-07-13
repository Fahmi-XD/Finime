<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import { listChapter, currentChapterReading, type MangaChapterType } from "$/stores/chapterStore";
  import { page } from "$app/state";
  import { FetchApi } from "$/utils/Fetch";
  import Loading from "$/components/elements/Loading.svelte";

  type ChapterType = {
    chapter_endpoint: string;
    chapter_name: string;
    title: string;
    chapter_pages: number;
    chapter_image: { chapter_image_link: string; image_number: number }[];
  };

  // const { chapter } = $props<{
  //   chapter: {
  //     chapter_endpoint: string;
  //     chapter_name: string;
  //     title: string;
  //     chapter_pages: number;
  //     chapter_image: { chapter_image_link: string; image_number: number }[];
  //   };
  // }>();

  let prevChapter: string | null = $state(null);
  let nextChapter: string | null = $state(null);
  let nextExists = $state(true);
  let rev: MangaChapterType[] = $listChapter.slice().reverse();
  let current = $state(0);
  let currentChapter = $state<Partial<ChapterType>>({});
  let isLoading = $state(false);
  let time: NodeJS.Timeout | null = null;
  const pathName = $derived(page.url.pathname);

  $effect(() => {
    const path = pathName;
    // console.log({ path });
    if (time) clearTimeout(time);
    time = setTimeout(() => {
      updatePage(true);
      // console.log(prevChapter, nextChapter);
      newChapter(path.replace("/chapter/", ""));
    }, 500);
  });

  function updatePage(setup: boolean) {
    if (rev[$currentChapterReading + 1]?.chapter_endpoint) {
      if (setup) {
        // console.log({ current });
        currentChapterReading.set(current);
        // console.log($currentChapterReading);
      }
      prevChapter =
        $currentChapterReading == 0
          ? null
          : "/chapter" + rev[$currentChapterReading - 1]?.chapter_endpoint;
      nextChapter =
        $currentChapterReading > rev.length
          ? null
          : "/chapter" + rev[$currentChapterReading + 1]?.chapter_endpoint;
    }
  }

  async function newChapter(slug: string) {
    try {
      isLoading = true;
      const response = await FetchApi.get(`/manga/chapter/${slug}`);
      // console.log(response);
      currentChapter = response.data;
      isLoading = false;
    } catch (error) {
      console.error("Failed to fetch chapter:", error);
    } finally {
      await tick();
    }
  }

  onMount(async () => {
    updatePage(false);
    current = $currentChapterReading;
  });

  onDestroy(() => {
    rev = [];
  });

  function handleImage(event: Event) {
    if ((event.target as HTMLImageElement)?.src !== (event.target as HTMLImageElement)?.getAttribute('data-src')) (event.target as HTMLImageElement).src=(event.target as HTMLImageElement)?.getAttribute('data-src') as string;
  }
</script>

<section class="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] py-6 sm:py-10">
  {#if isLoading}
    <div class="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] h-full py-[250px]">
      <Loading />
    </div>
  {:else}
    <div class="max-w-4xl mx-auto px-4 py-[100px]">
      <div class="text-center mb-6">
        <h1 class="text-2xl sm:text-3xl font-bold">{(currentChapter as ChapterType).title}</h1>
        <p class="text-sm text-[hsl(var(--muted-foreground))]">
          {(currentChapter as ChapterType).chapter_name}
        </p>
      </div>

      <div class="-mt-1">
        {#each (currentChapter as ChapterType).chapter_image as image, i (i)}
          <!-- <div class="img-wrapper block w-[800px] h-full">
            <img
              src={image.chapter_image_link}
              alt="Page {image.image_number}"
              class="full w-full h-auto object-contain"
              onload={handleLoad}
            />
            </div> -->
            <img src="/placeholder.png" data-src={image.chapter_image_link} alt="Page {image.image_number}" onload={handleImage}>
          <!-- <div class="relative">
            <img
              src="/placeholder.png"
              alt="blur"
              class="placeholder top-0 left-0 object-contain w-full h-auto"
            />
            <img
              src={image.chapter_image_link}
              alt="Page {image.image_number}"
              loading="lazy"
              decoding="async"
              class="w-full z-[1] top-0 left-0 absolute h-auto object-contain"
            />
          </div> -->
        {/each}
      </div>

      <div class="flex justify-between mt-6">
        {#if prevChapter}
          <a
            href={prevChapter}
            onclick={() => current--}
            class="px-4 py-2 rounded-lg bg-[hsl(var(--background))] text-[hsl(var(--background-foreground))] hover:bg-[hsl(var(--background)/0.8)] transition-colors"
          >
            ← Sebelumnya
          </a>
        {/if}

        {#if nextExists}
          <a
            href={nextChapter}
            onclick={() => current++}
            class="px-4 py-2 rounded-lg bg-[hsl(var(--background))] text-[hsl(var(--background-foreground))] hover:bg-[hsl(var(--background)/0.8)] transition-colors"
          >
            Selanjutnya →
          </a>
        {/if}
      </div>
    </div>
  {/if}
</section>

<style>
  .img-wrapper {
    position: relative;
    overflow: hidden;
  }

  .img-wrapper img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.3s ease;
  }

  .img-wrapper img.full.loaded {
    opacity: 1 !important;
  }
</style>
