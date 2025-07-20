<script lang="ts">
  import AnimeHero from "$lib/components/layouts/AnimeHero.svelte";
  import { AnimeClient } from "$lib/api/clients/animeClient";
  import type { ITopStandarResponse } from "$lib/api/types/animeTopType";
  import { onMount } from "svelte";
  import { mode as modeStore } from '$lib/stores/mode';

  let topAnimeList: ITopStandarResponse[] = [];
  let seasonNowAnimeList: ITopStandarResponse[] = [];

  onMount(async () => {
    topAnimeList = await AnimeClient.getTopAnimeList("1");
    seasonNowAnimeList = await AnimeClient.getSeasonNowAnimeList("1");
  });
</script>

<svelte:head>
  <title>Jelajahi Anime Terbaru & Terlengkap di Finime | Streaming Anime Sub Indo Gratis</title>
  <meta
    name="description"
    content="Jelajahi koleksi anime terlengkap di Finime. Streaming anime sub Indo gratis, update episode terbaru setiap hari, kualitas HD, tanpa iklan judi, dan komunitas anime aktif. Temukan anime favoritmu sekarang!"
  />
  <meta
    name="keywords"
    content="jelajahi anime, discover anime, koleksi anime, daftar anime, anime terbaru, anime populer, streaming anime gratis, anime sub indo, anime update, anime HD, anime tanpa iklan, anime indonesia, anime legal, nonton anime, anime ongoing, anime completed, anime terbaik, anime rekomendasi, finime, komunitas anime, streaming anime indonesia, anime subtitle indonesia"
  />
  <meta name="author" content="Finime Team" />
  <link rel="canonical" href="https://www.finime.my.id/anime" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  
  <!-- Additional SEO Meta Tags -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="theme-color" content="#111827" />
  <meta name="msapplication-TileColor" content="#da532c" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="Finime Anime" />

  <!-- Open Graph Meta Tags -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.finime.my.id/anime" />
  <meta
    property="og:title"
    content="Jelajahi Anime Terbaru & Terlengkap di Finime | Streaming Anime Sub Indo Gratis"
  />
  <meta
    property="og:description"
    content="Jelajahi koleksi anime terlengkap di Finime. Streaming anime sub Indo gratis, update episode terbaru setiap hari, kualitas HD, tanpa iklan judi, dan komunitas anime aktif. Temukan anime favoritmu sekarang!"
  />
  <meta property="og:image" content="https://www.finime.my.id/web-app-manifest-512x512.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Finime Discover Anime - Jelajahi Koleksi Anime Gratis" />
  <meta property="og:locale" content="id_ID" />
  <meta property="og:site_name" content="Finime" />

  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@finime_id" />
  <meta name="twitter:creator" content="@finime_id" />
  <meta name="twitter:url" content="https://www.finime.my.id/anime" />
  <meta
    name="twitter:title"
    content="Jelajahi Anime Terbaru & Terlengkap di Finime | Streaming Anime Sub Indo Gratis"
  />
  <meta
    name="twitter:description"
    content="Jelajahi koleksi anime terlengkap di Finime. Streaming anime sub Indo gratis, update episode terbaru setiap hari, kualitas HD, tanpa iklan judi, dan komunitas anime aktif. Temukan anime favoritmu sekarang!"
  />
  <meta
    name="twitter:image"
    content="https://www.finime.my.id/web-app-manifest-512x512.png"
  />
  <meta name="twitter:image:alt" content="Finime Discover Anime - Jelajahi Koleksi Anime Gratis" />

  <!-- Structured Data for Anime Collection Page -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Jelajahi Anime di Finime",
      "description": "Halaman koleksi anime terlengkap di Finime. Streaming anime sub Indo gratis, update episode terbaru, kualitas HD, tanpa iklan judi.",
      "url": "https://www.finime.my.id/anime",
      "hasPart": [
        {
          "@type": "CreativeWorkSeries",
          "name": "Anime Series",
          "url": "https://www.finime.my.id/anime"
        }
      ],
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.finime.my.id/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Anime",
            "item": "https://www.finime.my.id/anime"
          }
        ]
      },
      "publisher": {
        "@type": "Organization",
        "name": "Finime",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.finime.my.id/web-app-manifest-512x512.png"
        }
      }
    }
  </script>

  <!-- Favicon and App Icons -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
  <link
    rel="apple-touch-icon"
    sizes="180x180"
    href="/apple-touch-icon.png"
  />
  <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
  
  <!-- Preconnect for Performance -->
  <link rel="preconnect" href="https://www.finime.my.id" />
  <link rel="dns-prefetch" href="https://www.finime.my.id" />
</svelte:head>

<section class="{$modeStore === 'colorful' ? 'bg-gradient-to-br from-black via-gray-900 to-black min-h-screen' : 'bg-black min-h-screen'}">
  <!-- Background Elements -->
  {#if $modeStore === 'colorful'}
  <div class="absolute inset-0 overflow-hidden">
    <div class="absolute top-20 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute top-40 right-20 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
    <div class="absolute bottom-40 left-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
  </div>
  {/if}

  <AnimeHero {topAnimeList} {seasonNowAnimeList} />
  
  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header Section -->
    <div class="mb-12 text-center">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
        <span class="{$modeStore === 'colorful' ? 'bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent' : 'text-red-500'}">
          Anime Collection
        </span>
      </h1>
      <p class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
        Discover thousands of anime series and movies with our comprehensive collection
      </p>
    </div>
  
    <!-- Enhanced Filters -->
    <div class="bg-[hsl(var(--background))] rounded-2xl p-6 md:p-8 mb-12 border border-white/20 shadow-xl">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div>
          <label class="block text-sm font-semibold text-white mb-3">Genre</label>
          <select class="w-full px-4 py-3 bg-[hsl(var(--background))] border border-white/20 rounded-xl text-white focus:outline-none focus:border-red-500 transition-all">
            <option>All Genres</option>
            <option>Action</option>
            <option>Adventure</option>
            <option>Comedy</option>
            <option>Drama</option>
            <option>Fantasy</option>
            <option>Romance</option>
            <option>Sci-Fi</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-semibold text-white mb-3">Status</label>
          <select class="w-full px-4 py-3 bg-[hsl(var(--background))] border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all">
            <option>All Status</option>
            <option>Ongoing</option>
            <option>Completed</option>
            <option>Upcoming</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-semibold text-white mb-3">Year</label>
          <select class="w-full px-4 py-3 bg-[hsl(var(--background))] border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-all">
            <option>All Years</option>
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
            <option>2021</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-semibold text-white mb-3">Sort By</label>
          <select class="w-full px-4 py-3 bg-[hsl(var(--background))] border border-white/20 rounded-xl text-white focus:outline-none focus:border-red-500 transition-all">
            <option>Latest</option>
            <option>Popular</option>
            <option>Rating</option>
            <option>A-Z</option>
          </select>
        </div>
      </div>
    </div>
  
    <!-- Anime Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {#each [
        { title: "Attack on Titan", genres: ["Action", "Drama"], rating: 9.0, year: 2013, episodes: 24, status: "EP", statusColor: "red", gradient: "from-red-500 to-red-800" },
        { title: "Demon Slayer", genres: ["Action", "Supernatural"], rating: 8.7, year: 2019, episodes: "ONGOING", status: "ONGOING", statusColor: "green", gradient: "from-blue-600 to-purple-800" },
        { title: "One Punch Man", genres: ["Action", "Comedy"], rating: 8.9, year: 2015, episodes: 12, status: "EP", statusColor: "red", gradient: "from-orange-500 to-red-600" },
        { title: "My Hero Academia", genres: ["Action", "School"], rating: 8.5, year: 2016, episodes: 26, status: "EP", statusColor: "red", gradient: "from-green-500 to-teal-600" },
        { title: "Jujutsu Kaisen", genres: ["Action", "Supernatural"], rating: 8.8, year: 2020, episodes: 11, status: "EP", statusColor: "red", gradient: "from-purple-600 to-pink-600" },
        { title: "Death Note", genres: ["Thriller", "Supernatural"], rating: 9.1, year: 2006, episodes: 25, status: "EP", statusColor: "red", gradient: "from-indigo-600 to-blue-800" },
        { title: "Naruto", genres: ["Action", "Adventure"], rating: 8.4, year: 2002, episodes: "ONGOING", status: "ONGOING", statusColor: "green", gradient: "from-yellow-500 to-orange-600" },
        { title: "Tokyo Ghoul", genres: ["Action", "Horror"], rating: 8.2, year: 2014, episodes: 13, status: "EP", statusColor: "red", gradient: "from-red-600 to-pink-700" },
        { title: "Fullmetal Alchemist", genres: ["Action", "Adventure"], rating: 9.2, year: 2003, episodes: 51, status: "EP", statusColor: "red", gradient: "from-amber-500 to-orange-600" },
        { title: "Steins;Gate", genres: ["Sci-Fi", "Thriller"], rating: 9.3, year: 2011, episodes: 24, status: "EP", statusColor: "red", gradient: "from-cyan-500 to-blue-600" },
        { title: "Hunter x Hunter", genres: ["Action", "Adventure"], rating: 9.0, year: 2011, episodes: 148, status: "EP", statusColor: "red", gradient: "from-emerald-500 to-green-600" },
        { title: "One Piece", genres: ["Action", "Adventure"], rating: 8.9, year: 1999, episodes: "ONGOING", status: "ONGOING", statusColor: "green", gradient: "from-red-500 to-orange-600" }
      ] as anime}
        <div class="group relative bg-[hsl(var(--background))] rounded-2xl overflow-hidden hover:bg-[hsl(var(--background))] transition-all duration-300 cursor-pointer border border-white/20 hover:border-white/20 shadow-lg hover:shadow-xl transform hover:scale-105">
          <div class="aspect-[3/4] bg-gradient-to-br {anime.gradient} relative overflow-hidden">
            <div class="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300"></div>
            <img 
              src="https://via.placeholder.com/300x400/1f2937/ffffff?text=Anime" 
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              alt={anime.title} 
            />
            <div class="absolute top-3 right-3">
              <span class="bg-{anime.statusColor}-500 text-white text-xs px-2 py-1 rounded-lg font-semibold shadow-lg">
                {anime.status} {anime.episodes}
              </span>
              </div>
            <div class="absolute bottom-3 left-3">
              <span class="bg-black/70 text-yellow-400 text-xs px-2 py-1 rounded-lg font-bold">
                ★ {anime.rating}
              </span>
          </div>
        </div>
        <div class="p-4">
            <h3 class="font-bold text-white mb-2 group-hover:text-red-400 transition-colors line-clamp-2 text-sm md:text-base">
              {anime.title}
          </h3>
            <p class="text-gray-400 text-xs mb-3 line-clamp-1">{anime.genres.join(", ")}</p>
          <div class="flex items-center justify-between">
              <span class="text-yellow-400 text-xs font-semibold">★ {anime.rating}</span>
              <span class="text-gray-500 text-xs">{anime.year}</span>
              </div>
          </div>
        </div>
      {/each}
    </div>
  
    <!-- Enhanced Pagination -->
    <div class="flex justify-center mt-16">
      <nav class="flex items-center space-x-2 bg-[hsl(var(--background))] rounded-xl px-6 py-3 shadow-lg border border-white/20">
        <button class="px-3 py-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50" disabled>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <button class="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-bold shadow">1</button>
        <button class="px-4 py-2 text-gray-400 hover:text-white hover:bg-white/20 rounded-lg transition-colors">2</button>
        <button class="px-4 py-2 text-gray-400 hover:text-white hover:bg-white/20 rounded-lg transition-colors">3</button>
        <span class="px-2 text-gray-500">...</span>
        <button class="px-4 py-2 text-gray-400 hover:text-white hover:bg-white/20 rounded-lg transition-colors">10</button>
        <button class="px-3 py-2 text-gray-400 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </nav>
    </div>
  </div>
</section>

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
