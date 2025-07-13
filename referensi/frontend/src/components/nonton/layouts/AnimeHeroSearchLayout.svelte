<script lang="ts">
  import { truncate } from "$/lib";
  import AnimeLayout from "$components/nonton/layouts/AnimeLayout.svelte";
  import type { ISearchResponse, GenreList } from "$/types/animeSearch";
  import type { IAnimeDetail } from "$/types/animeType";

  export let animeList: Partial<ISearchResponse> = {};
  export let animeDetail: Partial<IAnimeDetail> = {};
</script>

<section>
  <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <div class="lg:w-1/3">
          <div class="bg-white rounded-lg overflow-hidden shadow-lg">
            <div class="relative">
              <img
                src={animeList.data?.animeList[0].poster || "/placeholder.png"}
                alt="Tokyo Ghoul Poster"
                class="w-full h-auto object-cover"
              />

              <div
                class="absolute bottom-4 right-4 bg-gray-800 text-white px-2 py-1 rounded text-sm"
              >
                Glénat
              </div>
            </div>
          </div>

          <div class="mt-6 text-center lg:text-left">
          </div>
        </div>

        <div class="lg:w-2/3">
          <div class="">
            <h1 class="text-4xl md:text-3xl lg:text-4xl font-bold mb-2">
              {animeList.data?.animeList[0].title || "-"}
            </h1>
            <p class="text-text-gray mb-1 opacity-70">
              {animeDetail?.japanese} • {animeDetail?.aired}
            </p>
            <div class="flex gap-2 items-center mt-1 md:mt-7">
              <span
                class="w-[15px] h-[15px] {animeList.data?.animeList[0].status == 'Completed'
                  ? 'bg-green-500'
                  : 'bg-red-500'} rounded-full block"
              ></span>
              <span class="text-[15px] opacity-70">{animeList.data?.animeList[0].status}</span>
            </div>

            <a
              href="/anime/{animeList.data?.animeList[0].animeId}"
              class="bg-red-500 mt-5 md:mt-1 text-center justify-center text-white px-6 py-2 rounded-full max-w-[200px] max-h-[50px] flex items-center gap-2 hover:bg-red-600 transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fill-rule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clip-rule="evenodd"
                />
              </svg>
              Watching
            </a>
          </div>

          <div class="flex mt-7 md:mt-3 flex-row h-auto min-h-0 items-center gap-8">
            <div class="flex h-auto w-auto">
              <div class="flex items-center gap-3">
                <img
                  src="/placeholder.png"
                  alt="Author 1"
                  class="w-5 h-5 rounded-full object-cover"
                />
                <img
                  src="/placeholder.png"
                  alt="Author 2"
                  class="w-5 h-5 rounded-full object-cover"
                />
                <img
                  src="/placeholder.png"
                  alt="Author 3"
                  class="w-5 h-5 rounded-full object-cover"
                />
                <span class="text-text-gray">{animeDetail?.episodeList?.length} Eps</span>
              </div>
            </div>

            <div class="flex items-center justify-center lg:justify-start gap-1">
              <svg class="w-5 h-5 text-teal-400 fill-current" viewBox="0 0 20 20">
                <path
                  d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                />
              </svg>
              <span class="text-xl font-bold ml-2">{animeDetail?.score}</span>
            </div>
          </div>

          <div class="mb-2">
            {#if animeDetail?.synopsis?.paragraphs && animeDetail?.synopsis?.paragraphs.length > 0}
              <p class="text-text-gray text-[12px] leading-relaxed opacity-70">
                {truncate(animeDetail?.synopsis?.paragraphs.map((p) => p).join(" "), 632)}
              </p>
            {:else}
              <p class="text-text-gray leading-relaxed opacity-70">
                Finime adalah tempat terbaik untuk menemukan dan menikmati anime favoritmu. Temukan berbagai judul anime terbaru, ulasan menarik, dan komunitas penggemar yang aktif hanya di sini. Jelajahi dunia anime tanpa batas bersama Finime!
              </p>
            {/if}
          </div>

          <div class="flex flex-wrap gap-2 mb-8">
            {#each animeList?.data?.animeList[0]?.genreList as GenreList[] as genre}
              <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm">{genre?.title}</span>
            {/each}
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="relative rounded-lg overflow-hidden">
              <img
                src={animeList?.data?.animeList[1]?.poster || "/placeholder.png"}
                alt="Related content 1"
                class="w-full h-32 sm:h-40 object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            </div>
            <div class="relative rounded-lg overflow-hidden">
              <img
                src={animeList?.data?.animeList[2]?.poster || "/placeholder.png"}
                alt="Related content 2"
                class="w-full h-32 sm:h-40 object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AnimeLayout animeList2={animeList} />

    <AnimeLayout text="Recomended Anime" animeList3={animeDetail?.recommendedAnimeList} />
</section>