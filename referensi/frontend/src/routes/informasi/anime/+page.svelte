<script lang="ts">
  import AnimeHero from "$/components/informasi/AnimeHero.svelte";
    import { onMount } from "svelte";

  onMount(() => {
    console.log(window.innerWidth)
  })
</script>

<svelte:head>
  <title>Anime Info - Finime</title>
  
  <meta
    name="title"
    content="Anime Info - Finime"
  />
  <meta name="description" content="Jelajahi informasi anime secara detail dan lengkap disini." />

  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.finime.my.id/" />
  <meta
    property="og:title"
    content="Anime Info - Finime"
  />
  <meta property="og:description" content="" />
  <meta property="og:image" content="https://www.finime.my.id/icon.jpg" />

  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://www.finime.my.id/" />
  <meta
    property="twitter:title"
    content="Anime Info - Finime"
  />
  <meta property="twitter:description" content="" />
  <meta property="twitter:image" content="https://www.finime.my.id/icon.jpg" />
</svelte:head>

<section>
  <AnimeHero />
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-white mb-4">Anime Collection</h1>
      <p class="text-gray-400 text-lg">Discover thousands of anime series and movies</p>
    </div>
  
    <div class="bg-[#1A1A1A] rounded-lg p-6 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Genre</label>
          <select
            class="w-full px-3 py-2 bg-[#2A2A2A] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
          >
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
          <label class="block text-sm font-medium text-gray-300 mb-2">Status</label>
          <select
            class="w-full px-3 py-2 bg-[#2A2A2A] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
          >
            <option>All Status</option>
            <option>Ongoing</option>
            <option>Completed</option>
            <option>Upcoming</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Year</label>
          <select
            class="w-full px-3 py-2 bg-[#2A2A2A] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
          >
            <option>All Years</option>
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
            <option>2021</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
          <select
            class="w-full px-3 py-2 bg-[#2A2A2A] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
          >
            <option>Latest</option>
            <option>Popular</option>
            <option>Rating</option>
            <option>A-Z</option>
          </select>
        </div>
      </div>
    </div>
  
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <div
        class="bg-[#1A1A1A] rounded-lg overflow-hidden hover:bg-[#2A2A2A] transition-colors cursor-pointer group"
      >
        <div class="aspect-[3/4] bg-gradient-to-br from-red-500 to-red-800 relative">
          <div class="bg-black bg-opacity-20">
                <img src="/placeholder.png" class="rounded-lg" alt="" />
              </div>
          <div class="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            EP 24
          </div>
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-white mb-1 group-hover:text-red-500 transition-colors">
            Attack on Titan
          </h3>
          <p class="text-gray-400 text-sm mb-2">Action, Drama</p>
          <div class="flex items-center justify-between">
            <span class="text-yellow-400 text-sm">★ 9.0</span>
            <span class="text-gray-500 text-xs">2013</span>
          </div>
        </div>
      </div>
  
      <div
        class="bg-[#1A1A1A] rounded-lg overflow-hidden hover:bg-[#2A2A2A] transition-colors cursor-pointer group"
      >
        <div class="aspect-[3/4] bg-gradient-to-br from-blue-600 to-purple-800 relative">
          <div class="bg-black bg-opacity-20">
                <img src="/placeholder.png" class="rounded-lg" alt="" />
              </div>
          <div class="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            ONGOING
          </div>
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-white mb-1 group-hover:text-red-500 transition-colors">
            Demon Slayer
          </h3>
          <p class="text-gray-400 text-sm mb-2">Action, Supernatural</p>
          <div class="flex items-center justify-between">
            <span class="text-yellow-400 text-sm">★ 8.7</span>
            <span class="text-gray-500 text-xs">2019</span>
          </div>
        </div>
      </div>
  
      <div
        class="bg-[#1A1A1A] rounded-lg overflow-hidden hover:bg-[#2A2A2A] transition-colors cursor-pointer group"
      >
        <div class="aspect-[3/4] bg-gradient-to-br from-orange-500 to-red-600 relative">
          <div class="bg-black bg-opacity-20">
                <img src="/placeholder.png" class="rounded-lg" alt="" />
              </div>
          <div class="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            EP 12
          </div>
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-white mb-1 group-hover:text-red-500 transition-colors">
            One Punch Man
          </h3>
          <p class="text-gray-400 text-sm mb-2">Action, Comedy</p>
          <div class="flex items-center justify-between">
            <span class="text-yellow-400 text-sm">★ 8.9</span>
            <span class="text-gray-500 text-xs">2015</span>
          </div>
        </div>
      </div>
  
      <div
        class="bg-[#1A1A1A] rounded-lg overflow-hidden hover:bg-[#2A2A2A] transition-colors cursor-pointer group"
      >
        <div class="aspect-[3/4] bg-gradient-to-br from-green-500 to-teal-600 relative">
          <div class="bg-black bg-opacity-20">
                <img src="/placeholder.png" class="rounded-lg" alt="" />
              </div>
          <div class="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            EP 26
          </div>
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-white mb-1 group-hover:text-red-500 transition-colors">
            My Hero Academia
          </h3>
          <p class="text-gray-400 text-sm mb-2">Action, School</p>
          <div class="flex items-center justify-between">
            <span class="text-yellow-400 text-sm">★ 8.5</span>
            <span class="text-gray-500 text-xs">2016</span>
          </div>
        </div>
      </div>
  
      <div
        class="bg-[#1A1A1A] rounded-lg overflow-hidden hover:bg-[#2A2A2A] transition-colors cursor-pointer group"
      >
        <div class="aspect-[3/4] bg-gradient-to-br from-purple-600 to-pink-600 relative">
          <div class="bg-black bg-opacity-20">
                <img src="/placeholder.png" class="rounded-lg" alt="" />
              </div>
          <div class="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            EP 11
          </div>
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-white mb-1 group-hover:text-red-500 transition-colors">
            Jujutsu Kaisen
          </h3>
          <p class="text-gray-400 text-sm mb-2">Action, Supernatural</p>
          <div class="flex items-center justify-between">
            <span class="text-yellow-400 text-sm">★ 8.8</span>
            <span class="text-gray-500 text-xs">2020</span>
          </div>
        </div>
      </div>
  
      <div
        class="bg-[#1A1A1A] rounded-lg overflow-hidden hover:bg-[#2A2A2A] transition-colors cursor-pointer group"
      >
        <div class="aspect-[3/4] bg-gradient-to-br from-indigo-600 to-blue-800 relative">
          <div class="bg-black bg-opacity-20">
                <img src="/placeholder.png" class="rounded-lg" alt="" />
              </div>
          <div class="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            EP 25
          </div>
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-white mb-1 group-hover:text-red-500 transition-colors">
            Death Note
          </h3>
          <p class="text-gray-400 text-sm mb-2">Thriller, Supernatural</p>
          <div class="flex items-center justify-between">
            <span class="text-yellow-400 text-sm">★ 9.1</span>
            <span class="text-gray-500 text-xs">2006</span>
          </div>
        </div>
      </div>
  
      <div
        class="bg-[#1A1A1A] rounded-lg overflow-hidden hover:bg-[#2A2A2A] transition-colors cursor-pointer group"
      >
        <div class="aspect-[3/4] bg-gradient-to-br from-yellow-500 to-orange-600 relative">
          <div class="bg-black bg-opacity-20">
                <img src="/placeholder.png" class="rounded-lg" alt="" />
              </div>
          <div class="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            ONGOING
          </div>
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-white mb-1 group-hover:text-red-500 transition-colors">
            Naruto
          </h3>
          <p class="text-gray-400 text-sm mb-2">Action, Adventure</p>
          <div class="flex items-center justify-between">
            <span class="text-yellow-400 text-sm">★ 8.4</span>
            <span class="text-gray-500 text-xs">2002</span>
          </div>
        </div>
      </div>
  
      <div
        class="bg-[#1A1A1A] rounded-lg overflow-hidden hover:bg-[#2A2A2A] transition-colors cursor-pointer group"
      >
        <div class="aspect-[3/4] bg-gradient-to-br from-red-600 to-pink-700 relative">
          <div class="bg-black bg-opacity-20">
                <img src="/placeholder.png" class="rounded-lg" alt="" />
              </div>
          <div class="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            EP 13
          </div>
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-white mb-1 group-hover:text-red-500 transition-colors">
            Tokyo Ghoul
          </h3>
          <p class="text-gray-400 text-sm mb-2">Action, Horror</p>
          <div class="flex items-center justify-between">
            <span class="text-yellow-400 text-sm">★ 8.2</span>
            <span class="text-gray-500 text-xs">2014</span>
          </div>
        </div>
      </div>
    </div>
  
    <div class="flex justify-center mt-12">
      <nav class="flex items-center space-x-2">
        <button class="px-3 py-2 text-gray-400 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
        <button class="px-4 py-2 bg-red-500 text-white rounded-lg">1</button>
        <button
          class="px-4 py-2 text-gray-400 hover:text-white hover:bg-[#1A1A1A] rounded-lg transition-colors"
          >2</button
        >
        <button
          class="px-4 py-2 text-gray-400 hover:text-white hover:bg-[#1A1A1A] rounded-lg transition-colors"
          >3</button
        >
        <span class="px-2 text-gray-500">...</span>
        <button
          class="px-4 py-2 text-gray-400 hover:text-white hover:bg-[#1A1A1A] rounded-lg transition-colors"
          >10</button
        >
        <button class="px-3 py-2 text-gray-400 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </nav>
    </div>
  </div>
</section>
