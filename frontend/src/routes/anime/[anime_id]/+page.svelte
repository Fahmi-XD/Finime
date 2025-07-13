<script lang="ts">
  import type { IAnimeSlug } from "./+page";
  import { onMount } from "svelte";
  import { AnimeClient } from "$lib/api/clients/animeClient";
  import type { IDetailStandarResponse } from "$lib/api/types/detailType";
  import { truncate } from "$lib";
  import { Star } from "@lucide/svelte";
  import type { IConvertOtakudesuDetailModel } from "$lib/api/types/convertOtakudesuType";
  import LoadingElements from "$lib/components/ui/LoadingElements.svelte";

  export let data: IAnimeSlug;

  let animeDetail: IDetailStandarResponse;
  let animeDetailOtakudesu: IConvertOtakudesuDetailModel;

  let episodesRangeList: number = 4;
  let charactersRangeList: number = 4;
  let staffRangeList: number = 4;

  let isLoading: boolean = true;

  onMount(async () => {
    isLoading = true;
    const anime = await AnimeClient.getDetailAnime(data.animeId);
    animeDetail = anime;

    const animeOtakudesu = await AnimeClient.getDetailOtakudesuAnime(animeDetail.title || "");
    animeDetailOtakudesu = animeOtakudesu;

    isLoading = false;
  });
</script>

{#if isLoading}
  <LoadingElements />
{:else}
  <section class="mt-20">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
      <div class="flex items-center space-x-2 text-sm">
        <a href="/" class="text-gray-400 hover:text-[hsl(var(--foreground))] transition-colors">Home</a>
        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"
          ></path>
        </svg>
        <a href="/anime" class="text-gray-400 hover:text-[hsl(var(--foreground))] transition-colors">Anime</a>
        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"
          ></path>
        </svg>
        <span class="text-red-500">{truncate(animeDetail?.title || "", 30) || "N/A"}</span>
      </div>
    </nav>
  
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        <div class="lg:col-span-1">
          <div class="top-24 space-y-6">
            <div class="relative group">
              <div
                class="aspect-[3/4] bg-gradient-to-br from-red-500 to-red-800 rounded-lg overflow-hidden shadow-2xl"
              >
                <div class="image-zoom w-full h-full bg-black bg-opacity-20 cursor-pointer relative">
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                  >
                    <img src={animeDetail?.images?.jpg?.image_url || "https://cdn.myanimelist.net/images/anime/1222-large.jpg"} alt={animeDetail?.title || "N/A"} class="w-full h-full object-cover" />
                  </div>
                  <div class="absolute bottom-4 left-4 right-4">
                    <div class="bg-black/80 backdrop-blur-sm rounded-lg p-3">
                      <div class="text-[hsl(var(--foreground))] font-bold text-sm">{animeDetail?.title || "N/A"}</div>
                      <div class="text-gray-300 text-xs">{animeDetail?.type || "N/A"}</div>
                      <div class="flex items-center mt-2">
                        <span class="text-yellow-400 text-sm">★</span>
                        <span class="text-[hsl(var(--foreground))] text-sm ml-1">{animeDetail?.score || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <div class="bg-black/60 backdrop-blur-sm rounded-full p-2">
                      <svg
                        class="w-5 h-5 text-[hsl(var(--foreground))]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- <div class="bg-finime-gray rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-[hsl(var(--foreground))] text-sm font-medium">Your Progress</span>
                <span class="text-gray-400 text-xs">Episode {animeDetail?.episodes_list?.length || 0}/{animeDetail?.episodes}</span>
              </div>
              <div class="w-full bg-finime-light-gray rounded-full h-2 mb-3">
                <div class="progress-bar bg-red-500 h-2 rounded-full" style="width: 28.7%"></div>
              </div>
              <div class="text-gray-400 text-xs">Last watched: Episode {animeDetail?.episodes_list?.length || 0} - "{animeDetail?.episodes_list?.[0]?.title}"</div>
            </div> -->
  
            <div class="space-y-3">
              <a
                href={animeDetailOtakudesu?.series_id ? `/anime/watch/${animeDetailOtakudesu?.series_id}` : `/anime/${data.animeId}`}
                class="w-full {animeDetailOtakudesu?.series_id ? "" : "opacity-70 cursor-not-allowed"} px-4 py-3 bg-red-500 text-[hsl(var(--foreground))] rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center"
              >
                {#if animeDetailOtakudesu?.series_id}
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Tonton Sekarang
                {:else}
                  Anime Belum Tersedia
                {/if}
              </a>
              <button
                class="w-full px-4 py-3 border-2 border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-500 hover:text-[hsl(var(--foreground))] transition-colors flex items-center justify-center"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
                Add to Watchlist
              </button>
              <!-- <button
                class="w-full px-4 py-3 bg-finime-gray text-[hsl(var(--foreground))] rounded-lg font-semibold hover:bg-finime-light-gray transition-colors flex items-center justify-center"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                Add to List
              </button> -->
            </div>
  
            <div class="bg-finime-gray rounded-lg p-4">
              <h3 class="font-semibold text-[hsl(var(--foreground))] mb-4 text-sm">Information</h3>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between items-start">
                  <span class="text-gray-400">Type:</span>
                  <span class="text-[hsl(var(--foreground))] text-right">{animeDetail?.type || "N/A"}</span>
                </div>
                <div class="flex justify-between items-start">
                  <span class="text-gray-400">Studio:</span>
                  <span class="text-[hsl(var(--foreground))] text-right">{animeDetail?.studios?.map((studio) => studio.name).join(", ") || "N/A"}</span>
                </div>
                <div class="flex justify-between items-start max-h-[100px] overflow-y-auto">
                  <span class="text-gray-400">Director:</span>
                  <span class="text-[hsl(var(--foreground))] text-justify">{animeDetail?.staff?.map((staff) => staff?.person?.name).join(", ") || "N/A"}</span>
                </div>
                <div class="flex justify-between items-start">
                  <span class="text-gray-400">Status:</span>
                  <span class="text-green-400 text-right">{animeDetail?.status}</span>
                </div>
                <div class="flex justify-between items-start">
                  <span class="text-gray-400">Aired:</span>
                  <span class="text-[hsl(var(--foreground))] text-right">{animeDetail?.aired?.string || "N/A"}</span>
                </div>
                <div class="flex justify-between items-start">
                  <span class="text-gray-400">Season:</span>
                  <span class="text-[hsl(var(--foreground))] text-right">{animeDetail?.season || "N/A"}</span>
                </div>
                <div class="flex justify-between items-start">
                  <span class="text-gray-400">Episodes:</span>
                  <span class="text-[hsl(var(--foreground))] text-right">{animeDetail?.episodes || "N/A"}</span>
                </div>
                <div class="flex justify-between items-start">
                  <span class="text-gray-400">Duration:</span>
                  <span class="text-[hsl(var(--foreground))] text-right">{animeDetail?.duration || "N/A"}</span>
                </div>
                <div class="flex justify-between items-start">
                  <span class="text-gray-400">Rating:</span>
                  <span class="text-[hsl(var(--foreground))] text-right">{animeDetail?.rating || "N/A"}</span>
                </div>
                <div class="flex justify-between items-start">
                  <span class="text-gray-400">Score:</span>
                  <span class="text-yellow-400 text-right">{animeDetail?.score || "N/A"}</span>
                </div>
                <div class="flex justify-between items-start">
                  <span class="text-gray-400">Popularity:</span>
                  <span class="text-[hsl(var(--foreground))] text-right">{animeDetail?.popularity || "N/A"}</span>
                </div>
                <div class="flex justify-between items-start">
                  <span class="text-gray-400">Members:</span>
                  <span class="text-[hsl(var(--foreground))] text-right">{animeDetail?.members || "N/A"}</span>
                </div>
                <div class="flex justify-between items-start">
                  <span class="text-gray-400">Themes:</span>
                  <span class="text-[hsl(var(--foreground))] text-right">{animeDetail?.themes?.map((theme) => theme.name).join(", ") || "N/A"}</span>
                </div>
                <div class="flex justify-between items-start">
                  <span class="text-gray-400">Source:</span>
                  <span class="text-[hsl(var(--foreground))] text-right">{animeDetail?.source || "N/A"}</span>
                </div>
                <div class="flex justify-between items-start">
                  <span class="text-gray-400">Duration:</span>
                  <span class="text-[hsl(var(--foreground))] text-right">{animeDetail?.duration || "N/A"}</span>
                </div>
                <div class="flex justify-between items-start">
                  <span class="text-gray-400">Producers:</span>
                  <span class="text-[hsl(var(--foreground))] text-right">{animeDetail?.producers?.map((producer) => producer.name).join(", ") || "N/A"}</span>
                </div>
                <div class="flex justify-between items-start">
                  <span class="text-gray-400">Licensors:</span>
                  <span class="text-[hsl(var(--foreground))] text-right">{animeDetail?.licensors?.map((licensor) => licensor.name).join(", ") || "N/A"}</span>
                </div>
                <div class="flex justify-between items-start">
                  <span class="text-gray-400">Broadcast:</span>
                  <span class="text-[hsl(var(--foreground))] text-right">{animeDetail?.broadcast?.string || "N/A"}</span>
                </div>
              </div>
  
              <hr class="border-finime-light-gray my-4" />
  
              <h3 class="font-semibold text-[hsl(var(--foreground))] mb-4 text-sm">Statistics</h3>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between items-start">
                  <span class="text-gray-400">Rank:</span>
                  <span class="text-[hsl(var(--foreground))] text-right">{animeDetail?.rank || "N/A"}</span>
                </div>
                <div class="flex justify-between items-start">
                  <span class="text-gray-400">Popularity:</span>
                  <span class="text-[hsl(var(--foreground))] text-right">{animeDetail?.popularity || "N/A"}</span>
                </div>
                <div class="flex justify-between items-start max-h-[100px] overflow-y-auto">
                  <span class="text-gray-400">Members:</span>
                  <span class="text-[hsl(var(--foreground))] text-right">{animeDetail?.members || "N/A"}</span>
                </div>
                <div class="flex justify-between items-start">
                  <span class="text-gray-400">Favorites:</span>
                  <span class="text-[hsl(var(--foreground))] text-right">{animeDetail?.favorites || "N/A"}</span>
                </div>
                <div class="flex justify-between items-start">
                  <span class="text-gray-400">Score:</span>
                  <span class="text-[hsl(var(--foreground))] text-right">{animeDetail?.score || "N/A"}</span>
                </div>
              </div>
  
              <hr class="border-finime-light-gray my-4" />
  
              <h4 class="font-semibold text-[hsl(var(--foreground))] mb-3 text-sm">Genres</h4>
              <div class="flex flex-wrap gap-2">
                {#if animeDetail?.genres}
                  {#each animeDetail?.genres as genre}
                    <span class="px-2 py-1 bg-red-500 text-[hsl(var(--foreground))] text-xs rounded-full">{genre.name}</span>
                  {/each}
                {/if}
              </div>
  
              <hr class="border-finime-light-gray my-4" />
  
              <h4 class="font-semibold text-[hsl(var(--foreground))] mb-3 text-sm">External Links</h4>
              <div class="space-y-2">
                {#if animeDetail?.external}
                  {#each animeDetail?.external as external}
                    <a
                      href={external.url}
                      class="flex items-center justify-between p-2 bg-finime-light-gray rounded hover:bg-gray-600 transition-colors"
                    >
                      <span class="text-gray-300 text-sm">{external.name}</span>
                      <svg
                        class="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        ></path>
                      </svg>
                    </a>
                  {/each}
                {/if}
              </div>
            </div>
          </div>
        </div>
  
        <div class="lg:col-span-3 space-y-6">
          <div class="mobile-optimized">
            <div class="flex items-center mb-4">
              <span class="bg-green-600 text-[hsl(var(--foreground))] text-xs px-2 py-1 rounded mr-3">{animeDetail?.status}</span>
              <span class="text-gray-400 text-sm">{animeDetail?.year} • {animeDetail?.episodes} Episodes • {animeDetail?.type}</span>
            </div>
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-[hsl(var(--foreground))] mb-3">
              {animeDetail?.title || "N/A"}
            </h1>
            <h2 class="text-lg md:text-xl text-gray-300 mb-4">{animeDetail?.title_japanese || "N/A"}</h2>
            <div class="flex items-center space-x-6 mb-6">
              <div class="flex items-center">
                <span class="text-yellow-400 text-xl md:text-2xl mr-2">★</span>
                <span class="text-[hsl(var(--foreground))] text-lg md:text-xl font-semibold">{animeDetail?.score || "N/A"}</span>
                <span class="text-gray-400 ml-2 text-sm">({animeDetail?.scored_by || "N/A"} votes)</span>
              </div>
              <div class="text-gray-400 text-sm md:text-base">
                <span>{animeDetail?.genres?.map((genre) => genre.name).join(", ") || "N/A"}</span>
              </div>
            </div>
          </div>
  
          <div class="bg-finime-gray rounded-lg p-4 md:p-6 mobile-optimized">
            <h2 class="text-xl md:text-2xl font-bold text-[hsl(var(--foreground))] mb-4">Official Trailer</h2>
            <div class="video-container bg-finime-light-gray rounded-lg overflow-hidden">
              <div
                class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-500 to-red-800"
              >
                <div class="text-center"> 
                  <div class="text-[hsl(var(--foreground))] font-semibold">{animeDetail?.title || "N/A"}</div>
                </div>
              </div>
              {#if animeDetail?.trailer?.youtube_id}
                <iframe title="Trailer" src="https://www.youtube.com/embed/{animeDetail?.trailer?.youtube_id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              {/if}
            </div>
          </div>
  
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mobile-optimized">
            <div class="bg-finime-gray rounded-lg p-3 md:p-4 text-center">
              <div class="text-xl md:text-2xl font-bold text-red-500">{animeDetail?.episodes || "N/A"}</div>
              <div class="text-gray-400 text-xs md:text-sm">Episodes</div>
            </div>
            <div class="bg-finime-gray rounded-lg p-3 md:p-4 text-center">
              <div class="text-xl md:text-2xl font-bold text-red-500">{animeDetail?.season || "N/A"}</div>
              <div class="text-gray-400 text-xs md:text-sm">Seasons</div>
            </div>
            <div class="bg-finime-gray rounded-lg p-3 md:p-4 text-center">
              <div class="text-xl md:text-2xl font-bold text-red-500">{animeDetail?.year || "N/A"}</div>
              <div class="text-gray-400 text-xs md:text-sm">Years</div>
            </div>
            <div class="bg-finime-gray rounded-lg p-3 md:p-4 text-center">
              <div class="text-xl md:text-2xl font-bold text-red-500">{animeDetail?.members || "N/A"}</div>
              <div class="text-gray-400 text-xs md:text-sm">Members</div>
            </div>
          </div>
  
          <div class="bg-finime-gray rounded-lg p-4 md:p-6 mobile-optimized">
            <h2 class="text-xl md:text-2xl font-bold text-[hsl(var(--foreground))] mb-4">Synopsis</h2>
            <div class="space-y-4 text-gray-300 leading-relaxed text-sm md:text-base">
              <p>
                {animeDetail?.synopsis || "N/A"}
              </p>
            </div>
            <!-- <button
              class="mt-4 text-red-500 hover:text-red-400 transition-colors text-sm font-medium"
            >
              Read Full Synopsis →
            </button> -->
          </div>
  
          <div class="bg-finime-gray rounded-lg p-4 md:p-6 mobile-optimized">
            <div
              class="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0"
            >
              <h2 class="text-xl md:text-2xl font-bold text-[hsl(var(--foreground))]">Episodes</h2>
              <div
                class="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4"
              >
                <div class="flex items-center space-x-2">
                  <!-- <button
                    class="p-2 bg-finime-light-gray rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <svg
                      class="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      ></path>
                    </svg>
                  </button> -->
                  <button aria-label="Grid View" class="p-2 bg-red-500 rounded-lg">
                    <svg
                      class="w-4 h-4 text-[hsl(var(--foreground))]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
  
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-6">
              {#if animeDetail?.episodes_list?.length}
                {#each animeDetail?.episodes_list?.slice(0, episodesRangeList) as episode, i (i)}
                  <a
                    href={`/anime/watch/${animeDetailOtakudesu?.series_id}?eps=${episode.mal_id}`}
                    class="episode-item flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-finime-light-gray rounded-lg hover:bg-gray-600 transition-all cursor-pointer group"
                  >
                    <div
                      class="w-20 md:w-24 h-12 md:h-14 bg-gradient-to-br from-red-500 to-red-800 rounded flex-shrink-0 relative overflow-hidden"
                    >
                      <div class="absolute inset-0 bg-black bg-opacity-20">
                        <img src="/placeholder.png" alt={episode.title} class="w-full h-full object-cover" />
                      </div>
                      <div class="absolute inset-0 flex items-center justify-center">
                        <svg
                          class="w-6 h-6 text-[hsl(var(--foreground))] opacity-80"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <div class="absolute bottom-1 right-1 bg-black bg-opacity-60 rounded px-1">
                        <!-- <span class="text-[hsl(var(--foreground))] text-xs">{episode.duration || "N/A"}</span> -->
                      </div>
                      <div class="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-40">
                        <div class="h-full bg-red-500" style="width: 100%"></div>
                      </div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <h3
                        class="font-semibold text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors truncate text-sm md:text-base"
                      >
                        {episode.title}
                      </h3>
                      <p class="text-gray-400 text-xs md:text-sm mb-1 line-clamp-2">
                        <!-- {episode.description || "N/A"} -->
                      </p>
                      <div class="flex gap-2 items-center">
                        <!-- <div class="text-gray-500 text-xs">{episode.aired?.string || "N/A"} • {episode.type || "N/A"}</div> -->
                        <div class="flex items-center space-x-2">
                          {#if i == 0}
                            <span class="text-red-500 text-xs bg-red-500/20 px-2 py-1 rounded">New</span>
                          {/if}
                        </div>
                        <div class="flex items-center space-x-1">
                          <p class="text-gray-500 text-xs">{episode.score || "N/A"}</p>
                          <Star class="w-3 h-3" fill="yellow" />
                        </div>
                        <p class="text-gray-500 text-xs">Ep {episode.mal_id || "N/A"}</p>
                      </div>
                      <p class="text-gray-500 text-xs">{episode.aired || "N/A"}</p>
                      <p class="text-gray-500 text-xs">{episode.title_japanese || "N/A"}</p>
                    </div>
                  </a>
                {/each}
              {:else}
                <div class="flex items-center">
                  <p class="text-gray-400">Episodes Belum Tersedia</p>
                </div>
              {/if}
            </div>
  
            {#if animeDetail?.episodes_list && animeDetail?.episodes_list?.length > episodesRangeList || episodesRangeList == animeDetail?.episodes_list?.length}
              <button
                on:click={() => episodesRangeList = episodesRangeList == animeDetail?.episodes_list?.length ? 4 : episodesRangeList + (animeDetail?.episodes_list?.slice(episodesRangeList)?.length || 0)}
                class="w-full px-4 py-3 text-red-500 border border-red-500 rounded-lg hover:bg-red-500 hover:text-[hsl(var(--foreground))] transition-colors font-medium"
              >
                {episodesRangeList == animeDetail?.episodes_list?.length ? "Show Less" : `Load More Episodes (${animeDetail?.episodes_list?.length - episodesRangeList} remaining)`}
              </button>
            {/if}
          </div>
  
          <div class="bg-finime-gray rounded-lg p-4 md:p-6 mobile-optimized">
            <h2 class="text-xl md:text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
              Main Characters & Voice Actors
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {#if animeDetail?.characters?.length}
                {#each animeDetail?.characters?.slice(0, charactersRangeList) as character}
                  <div class="flex items-center space-x-4 group cursor-pointer">
                    <div
                      class="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex-shrink-0 group-hover:scale-105 transition-transform"
                    >
                      <img src={character.character?.images?.webp?.image_url || "/placeholder.png"} alt={character.character?.name || "N/A"} class="w-full h-full object-cover rounded-2xl" />
                    </div>
                    <div class="flex-1">
                      <h3
                        class="font-semibold text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors text-sm md:text-base"
                      >
                        {character.character?.name || "N/A"}
                      </h3>
                      <p class="text-gray-400 text-xs md:text-sm">{character.role}</p>
                      <p class="text-gray-500 text-xs">CV: {character.voice_actors?.[0]?.person?.name || "N/A"}</p>
                    </div>
                  </div>
                {/each}
              {:else}
                <div class="flex items-center">
                  <p class="text-gray-400">Main Characters & Voice Actors Belum Tersedia</p>
                </div>
              {/if}
            </div>
  
            {#if animeDetail?.characters && animeDetail?.characters?.length > charactersRangeList || charactersRangeList == animeDetail?.characters?.length}
              <button
                on:click={() => charactersRangeList = charactersRangeList == animeDetail?.characters?.length ? 4 : charactersRangeList + (animeDetail?.characters?.slice(charactersRangeList)?.length || 0)}
                class="w-full px-4 py-3 mt-10 text-red-500 border border-red-500 rounded-lg hover:bg-red-500 hover:text-[hsl(var(--foreground))] transition-colors font-medium"
              >
                {charactersRangeList == animeDetail?.characters?.length ? "Show Less" : `Load More Characters (${animeDetail?.characters?.length - charactersRangeList} remaining)`}
              </button>
            {/if}
          </div>
  
          <div class="bg-finime-gray rounded-lg p-4 md:p-6 mobile-optimized">
            <h2 class="text-xl md:text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
              Staff & Producers
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {#if animeDetail?.staff?.length}
                {#each animeDetail?.staff?.slice(0, staffRangeList) as staff}
                  <div class="flex items-center space-x-4 group cursor-pointer">
                    <div
                      class="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex-shrink-0 group-hover:scale-105 transition-transform"
                    >
                      <img src={staff.person?.images?.jpg?.image_url || "/placeholder.png"} alt={staff.person?.name || "N/A"} class="w-full h-full object-cover rounded-2xl" />
                    </div>
                    <div class="flex-1">
                      <h3
                        class="font-semibold text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors text-sm md:text-base"
                      >
                          {staff.person?.name || "N/A"}
                      </h3>
                      <p class="text-gray-400 text-xs md:text-sm">{staff.positions?.join(", ") || "N/A"}</p>
                    </div>
                  </div>
                {/each}
              {:else}
                <div class="flex items-center">
                  <p class="text-gray-400">Staff Belum Tersedia</p>
                </div>
              {/if}
            </div>
  
            {#if animeDetail?.staff && animeDetail?.staff?.length > staffRangeList || staffRangeList == animeDetail?.staff?.length}
              <button
                on:click={() => staffRangeList = staffRangeList == animeDetail?.staff?.length ? 4 : staffRangeList + (animeDetail?.staff?.slice(staffRangeList)?.length || 0)}
                class="w-full px-4 py-3 mt-10 text-red-500 border border-red-500 rounded-lg hover:bg-red-500 hover:text-[hsl(var(--foreground))] transition-colors font-medium"
              >
                {staffRangeList == animeDetail?.staff?.length ? "Show Less" : `Load More Staff (${animeDetail?.staff?.length - staffRangeList} remaining)`}
              </button>
            {/if}
          </div>
  
          <!-- <div class="bg-finime-gray rounded-lg p-4 md:p-6 mobile-optimized">
            <div
              class="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0"
            >
              <h2 class="text-xl md:text-2xl font-bold text-[hsl(var(--foreground))]">User Reviews</h2>
              <button
                class="px-4 py-2 bg-red-500 text-[hsl(var(--foreground))] rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
              >
                Write Review
              </button>
            </div>
            <div class="space-y-4">
              <div class="bg-finime-light-gray rounded-lg p-4">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-red-500 to-red-800 rounded-full flex-shrink-0"
                    ></div>
                    <div>
                      <div class="font-semibold text-[hsl(var(--foreground))] text-sm md:text-base">AnimeFan2024</div>
                      <div class="text-gray-400 text-xs md:text-sm">3 days ago</div>
                    </div>
                  </div>
                  <div class="flex items-center">
                    <span class="text-yellow-400 mr-1 text-sm">★★★★★</span>
                    <span class="text-[hsl(var(--foreground))] font-semibold text-sm">10/10</span>
                  </div>
                </div>
                <p class="text-gray-300 leading-relaxed text-sm md:text-base">
                  "An absolute masterpiece that redefined anime storytelling. The animation quality,
                  especially in the final season, is breathtaking. Every episode leaves you wanting
                  more, and the character development is phenomenal."
                </p>
                <div class="flex items-center space-x-4 mt-3 text-sm">
                  <button
                    class="text-gray-400 hover:text-red-500 transition-colors flex items-center"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      ></path>
                    </svg>
                    256
                  </button>
                  <button class="text-gray-400 hover:text-red-500 transition-colors">Reply</button>
                </div>
              </div>
              <div class="bg-finime-light-gray rounded-lg p-4">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex-shrink-0"
                    ></div>
                    <div>
                      <div class="font-semibold text-[hsl(var(--foreground))] text-sm md:text-base">TitanHunter</div>
                      <div class="text-gray-400 text-xs md:text-sm">1 week ago</div>
                    </div>
                  </div>
                  <div class="flex items-center">
                    <span class="text-yellow-400 mr-1 text-sm">★★★★☆</span>
                    <span class="text-[hsl(var(--foreground))] font-semibold text-sm">9/10</span>
                  </div>
                </div>
                <p class="text-gray-300 leading-relaxed text-sm md:text-base">
                  "The ending was divisive but I think it was perfect for the themes explored. The
                  voice acting is top-tier and the soundtrack by Hiroyuki Sawano is absolutely
                  incredible. A must-watch series."
                </p>
                <div class="flex items-center space-x-4 mt-3 text-sm">
                  <button
                    class="text-gray-400 hover:text-red-500 transition-colors flex items-center"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      ></path>
                    </svg>
                    142
                  </button>
                  <button class="text-gray-400 hover:text-red-500 transition-colors">Reply</button>
                </div>
              </div>
            </div>
            <button
              class="mt-4 text-red-500 hover:text-red-400 transition-colors text-sm font-medium"
            >
              View All Reviews →
            </button>
          </div> -->
  
          <!-- <div class="bg-finime-gray rounded-lg p-4 md:p-6 mobile-optimized">
            <h2 class="text-xl md:text-2xl font-bold text-[hsl(var(--foreground))] mb-6">Related & Recommended Anime</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                class="flex items-center space-x-3 cursor-pointer group bg-finime-light-gray rounded-lg p-3 hover:bg-gray-600 transition-colors"
              >
                <div
                  class="w-12 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded flex-shrink-0"
                ></div>
                <div class="flex-1 min-w-0">
                  <h4
                    class="font-medium text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors truncate text-sm md:text-base"
                  >
                    Attack on Titan: Junior High
                  </h4>
                  <p class="text-gray-400 text-xs">Spin-off • Comedy</p>
                  <div class="text-yellow-400 text-xs">★ 7.1 • 12 Episodes</div>
                </div>
              </div>
              <div
                class="flex items-center space-x-3 cursor-pointer group bg-finime-light-gray rounded-lg p-3 hover:bg-gray-600 transition-colors"
              >
                <div
                  class="w-12 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex-shrink-0"
                ></div>
                <div class="flex-1 min-w-0">
                  <h4
                    class="font-medium text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors truncate text-sm md:text-base"
                  >
                    Attack on Titan: Lost Girls
                  </h4>
                  <p class="text-gray-400 text-xs">OVA • Drama</p>
                  <div class="text-yellow-400 text-xs">★ 7.8 • 3 Episodes</div>
                </div>
              </div>
              <div
                class="flex items-center space-x-3 cursor-pointer group bg-finime-light-gray rounded-lg p-3 hover:bg-gray-600 transition-colors"
              >
                <div
                  class="w-12 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded flex-shrink-0"
                ></div>
                <div class="flex-1 min-w-0">
                  <h4
                    class="font-medium text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors truncate text-sm md:text-base"
                  >
                    Tokyo Ghoul
                  </h4>
                  <p class="text-gray-400 text-xs">Similar • Dark Fantasy</p>
                  <div class="text-yellow-400 text-xs">★ 7.8 • 48 Episodes</div>
                </div>
              </div>
              <div
                class="flex items-center space-x-3 cursor-pointer group bg-finime-light-gray rounded-lg p-3 hover:bg-gray-600 transition-colors"
              >
                <div
                  class="w-12 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded flex-shrink-0"
                ></div>
                <div class="flex-1 min-w-0">
                  <h4
                    class="font-medium text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors truncate text-sm md:text-base"
                  >
                    Demon Slayer
                  </h4>
                  <p class="text-gray-400 text-xs">Recommended • Action</p>
                  <div class="text-yellow-400 text-xs">★ 8.7 • 44 Episodes</div>
                </div>
              </div>
              <div
                class="flex items-center space-x-3 cursor-pointer group bg-finime-light-gray rounded-lg p-3 hover:bg-gray-600 transition-colors"
              >
                <div
                  class="w-12 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded flex-shrink-0"
                ></div>
                <div class="flex-1 min-w-0">
                  <h4
                    class="font-medium text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors truncate text-sm md:text-base"
                  >
                    Vinland Saga
                  </h4>
                  <p class="text-gray-400 text-xs">Recommended • Historical</p>
                  <div class="text-yellow-400 text-xs">★ 9.0 • 48 Episodes</div>
                </div>
              </div>
              <div
                class="flex items-center space-x-3 cursor-pointer group bg-finime-light-gray rounded-lg p-3 hover:bg-gray-600 transition-colors"
              >
                <div
                  class="w-12 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded flex-shrink-0"
                ></div>
                <div class="flex-1 min-w-0">
                  <h4
                    class="font-medium text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors truncate text-sm md:text-base"
                  >
                    Jujutsu Kaisen
                  </h4>
                  <p class="text-gray-400 text-xs">Recommended • Supernatural</p>
                  <div class="text-yellow-400 text-xs">★ 8.5 • 24 Episodes</div>
                </div>
              </div>
            </div>
            <button
              class="mt-4 text-red-500 hover:text-red-400 transition-colors text-sm font-medium"
            >
              View More Recommendations →
            </button>
          </div> -->
        </div>
      </div>
    </div>
  </section>
{/if}

<style>
  .image-zoom {
    transition: transform 0.3s ease;
  }
  .image-zoom:hover {
    transform: scale(1.05);
  }
  .episode-item {
    transition: all 0.2s ease;
  }
  .episode-item:hover {
    transform: translateX(4px);
  }
  .social-share {
    transition: all 0.2s ease;
  }
  .social-share:hover {
    transform: translateY(-2px);
  }
  .progress-bar {
    transition: width 0.3s ease;
  }
  .video-container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
  }
  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  @media (max-width: 768px) {
    .mobile-optimized {
      padding: 0.75rem;
    }
  }
</style>
