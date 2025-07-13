<script lang="ts">
  import type { ITopStandarResponse } from "$lib/api/types/animeTopType";
  import { mode as modeStore } from '$lib/stores/mode';

  import { truncate } from "$lib";

  import { Star } from "@lucide/svelte";

  export let topAnimeList: ITopStandarResponse[] = [];
  export let seasonNowAnimeList: ITopStandarResponse[] = [];
</script>

<div class="relative mt-15 w-full h-full {$modeStore === 'colorful' ? 'bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden py-12' : 'bg-black overflow-hidden py-12'}">
  <!-- Floating Gradient Orbs -->
  {#if $modeStore === 'colorful'}
    <div class="absolute top-10 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute top-40 right-20 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
    <div class="absolute bottom-40 left-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
  {/if}

  <div class="relative z-10 flex flex-col lg:flex-row max-w-7xl h-auto gap-10 items-center mx-auto px-4 sm:px-6 lg:px-8">
    <div class="w-[220px] h-[300px] sm:w-[300px] sm:h-[400px] md:w-[400px] md:h-[500px] shrink-0 mb-8 lg:mb-0">
      <img src={topAnimeList[0]?.images?.webp?.image_url} class="object-cover rounded-3xl h-full w-full shadow-2xl border-4 border-white/20" alt="Anime Hero" />
    </div>
    <div class="flex-1 w-full">
      <div class="flex flex-col md:flex-row md:items-center md:gap-8">
        <div class="flex-1">
          <div class="flex items-center mb-4">
            <div class="relative mr-3">
              <div class="w-3 h-3 absolute inset-0 animate-ping bg-red-500 rounded-full"></div>
              <div class="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            <span class="text-gray-400 font-medium">New episodes every day</span>
          </div>
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-black mb-4 leading-tight">
            <span class="{$modeStore === 'colorful' ? 'bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent' : 'text-red-500'}">
              Ada anime baru nih!
            </span>
          </h1>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Tak kenal maka tak sayang
          </h2>
          <p class="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
            Temukan anime terbaru, terpopuler, dan rekomendasi terbaik setiap hari. Nikmati pengalaman menonton dengan UI modern, bebas iklan, dan sepenuhnya gratis!
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button class="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-bold shadow-lg hover:from-red-600 hover:to-pink-700 transition-all flex items-center justify-center group">
              Jelajahi Info
              <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button class="px-8 py-4 border-2 border-blue-500 text-blue-400 rounded-xl font-bold hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white transition-all">
              {topAnimeList[0]?.episodes || "N/A"} Episode
            </button>
          </div>
        </div>
        <div class="relative hidden md:block ml-8">
          <div class="aspect-square bg-gradient-to-br from-red-500 to-purple-500 rounded-2xl relative overflow-hidden shadow-xl">
            <div class="absolute inset-0 bg-black/20"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-20 h-20 bg-[hsl(var(--background))] rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full opacity-60"></div>
          <div class="absolute -bottom-6 -left-6 w-12 h-12 border-2 border-red-500 rounded-full opacity-40"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <h2 class="text-3xl font-bold text-white">Top Anime</h2>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
        {#each topAnimeList.slice(0, topAnimeList.length - 3) as anime}
        <div class="bg-[hsl(var(--background))] rounded-2xl overflow-hidden hover:bg-[hsl(var(--background))] transition-all duration-300 cursor-pointer border border-white/20 hover:border-white/20 shadow-lg hover:shadow-xl transform hover:scale-105">
          <div class="aspect-[3/4] bg-gradient-to-br relative">
            <div class="absolute inset-0 bg-black/30"></div>
            <img src={anime.images?.webp?.image_url} class="w-full h-full object-cover" alt={anime.title} />
            {#if anime.score}
              <div class="absolute bottom-3 right-3">
                <span class="bg-yellow-500 text-white text-xs px-2 py-1 rounded-lg font-semibold shadow-lg flex items-center gap-1">
                  <Star class="w-4 h-4" />
                  {anime.score}
                </span>
              </div>
            {/if}
            {#if anime.episodes && anime.episodes > 0}
              <div class="absolute top-3 left-3">
                <span class="bg-green-500 text-white text-xs px-2 py-1 rounded-lg font-semibold shadow-lg">
                  {anime.episodes} Episode
                </span>
              </div>
            {/if}
            {#if anime?.status && anime?.status !== "Finished Airing"}
              <div class="absolute top-3 right-3">
                <span class="bg-red-500 text-white text-xs px-2 py-1 rounded-lg font-semibold shadow-lg">
                  On Going
                </span>
              </div>
            {/if}
          </div>
          <div class="p-4">
            <h3 class="font-bold text-white mb-2 group-hover:text-red-400 transition-colors line-clamp-2 text-sm md:text-base">
              {anime.title}
            </h3>
            <p class="text-gray-400 text-xs mb-3 line-clamp-1">{anime.genres?.map((genre) => genre.name).join(", ")}</p>
            <div class="flex items-center justify-between">
              <span class="text-yellow-400 text-xs font-semibold">★ {anime.rating}</span>
              <span class="text-gray-500 text-xs">{anime.year}</span>
            </div>
          </div>
        </div>
        {/each}
      </div>
    </div>
  </div>

  <div class="bg-[hsl(var(--background))]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <h2 class="text-3xl font-bold text-white">Popular This Week</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each topAnimeList.slice(topAnimeList.length - 3, topAnimeList.length) as anime}
        <div class="bg-[hsl(var(--background))] rounded-2xl p-6 hover:bg-[hsl(var(--background))] transition-colors cursor-pointer shadow-xl border border-white/20">
          <div class="flex items-center space-x-4">
            <div class="w-16 h-20 bg-gradient-to-br rounded-lg flex-shrink-0 overflow-hidden">
              <img src={anime.images?.webp?.image_url} class="w-full h-full object-cover rounded-lg" alt={anime.title} />
            </div>
            <div class="flex-1">
              <h3 class="font-bold text-white mb-1 text-base md:text-lg">{truncate(anime?.title || "", 30)}</h3>
              <p class="text-gray-400 text-xs md:text-sm mb-2">{anime.genres?.map((genre) => genre.name).join(", ") || "N/A"} • {anime.year}</p>
              <div class="flex items-center justify-between">
                <span class="text-yellow-400 text-xs md:text-sm font-bold">★ {anime.rating}</span>
                <span class="text-red-500 text-xs md:text-sm font-semibold">Episode {anime.episodes || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
        {/each}
      </div>
    </div>
  </div>

  <div class="pt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <h2 class="text-3xl font-bold text-white">Season Now</h2>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {#each seasonNowAnimeList as anime}
        <div class="bg-[hsl(var(--background))] rounded-2xl overflow-hidden hover:bg-[hsl(var(--background))] transition-all duration-300 cursor-pointer border border-white/20 hover:border-white/20 shadow-lg hover:shadow-xl transform hover:scale-105">
          <div class="aspect-[3/4] bg-gradient-to-br relative">
            <div class="absolute inset-0 bg-black/30"></div>
            <img src={anime.images?.webp?.image_url} class="w-full h-full object-cover" alt={anime.title} />
            <div class="absolute top-3 right-3">
              <span class="bg-red-500 text-white text-xs px-2 py-1 rounded-lg font-semibold shadow-lg">
                NEW
              </span>
            </div>
          </div>
          <div class="p-4">
            <h3 class="font-bold text-white mb-2 group-hover:text-red-400 transition-colors line-clamp-2 text-sm md:text-base">
              {truncate(anime?.title || "", 30)}
            </h3>
            <p class="text-gray-400 text-xs mb-3 line-clamp-1">{anime.genres?.map((genre) => genre.name).join(", ") || "N/A"}</p>
            <div class="flex items-center justify-between">
              <span class="text-yellow-400 text-xs font-semibold">★ {anime.rating || "N/A"}</span>
              <span class="text-gray-500 text-xs">{anime.year || "N/A"}</span>
            </div>
          </div>
        </div>
        {/each}
      </div>
    </div>
  </div>

  <style>
    .line-clamp-1 {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
    .line-clamp-2 {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  </style>
</div>
