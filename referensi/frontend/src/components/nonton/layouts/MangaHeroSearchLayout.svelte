<script lang="ts">
  import type { IMangaSearchResponse } from "$/types/mangaSearchType";
  import type { IMangaDetailResponse } from "$/types/mangaDetailTypes";
  import ResultSearchLayout from "./ResultSearchLayout.svelte";

  export let mangaList: Partial<IMangaSearchResponse> = {};
  export let mangaDetail: Partial<IMangaDetailResponse> = {};
  export let isLoading: boolean = true;
</script>

<section class="">
  <div class="relative mt-25 flex items-center justify-center">
    <div
      class="max-w-7xl w-full px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center md:items-start justify-between gap-10 md:gap-20"
    >
      <div class="flex flex-col max-w-xl text-[hsl(var(--foreground))]">
        <nav class="flex gap-6 mb-6 text-xs font-semibold tracking-widest uppercase text-[hsl(var(--foreground))]">
          <span class="hover:text-[hsl(var(--foreground))] transition"> Comics </span>
          <span class="border-l border-white/30 h-4 self-center"> </span>
          <span class="hover:text-[hsl(var(--foreground))] transition"> Novels </span>
          <span class="border-l border-white/30 h-4 self-center"> </span>
          <span class="hover:text-[hsl(var(--foreground))] transition"> Manga </span>
        </nav>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6">
          {mangaDetail?.title}
        </h1>
        {#if mangaDetail?.synopsis}
          <p class="text-sm sm:text-base max-h-[200px] overflow-y-auto mb-8 max-w-md leading-relaxed">
            {mangaDetail?.synopsis}
          </p>
        {:else}
          <p class="text-sm sm:text-base mb-8 max-w-md leading-relaxed">
            Finime adalah tempat terbaik untuk menemukan dan menikmati anime favoritmu. Temukan berbagai judul anime terbaru, ulasan menarik, dan komunitas penggemar yang aktif hanya di sini. Jelajahi dunia anime tanpa batas bersama Finime!
          </p>
        {/if}
        <a
          href="/manga/{mangaDetail?.manga_endpoint}"
          class="bg-red-600 hover:bg-red-700 transition text-[hsl(var(--foreground))] font-semibold rounded-full px-6 py-3 w-max"
        >
          Read Manga
        </a>
      </div>
      <div class="relative w-72 sm:w-80 md:w-[360px] lg:w-[400px] flex-shrink-0">
        <img
          alt="Anime character with brown hair and purple eyes holding a glowing red and purple sword, wearing a brown cloak, with a dark purple magical background"
          class="rounded-2xl shadow-lg"
          height="600"
          src={mangaDetail?.thumb || "/placeholder.png"}
          width="400"
        />
      </div>
    </div>
  </div>

  <div class="mt-20">
    <ResultSearchLayout {isLoading} mangaList={mangaList.manga_list} />
  </div>
</section>
