<section class="relative py-20">
  <div class="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent"></div>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div class="mb-8">
      <h1 class="text-5xl md:text-6xl font-bold text-red-500 mb-4">Search Everything</h1>
      <p class="text-xl text-gray-400 mb-8">
        Find your favorite anime and manga from our vast collection
      </p>
    </div>

    <div class="relative max-w-2xl mx-auto mb-8">
      <input
        type="text"
        placeholder="Search anime, manga, characters..."
        class="w-full px-6 py-4 pl-14 bg-[#1A1A1A] border border-gray-600 rounded-lg text-white text-lg focus:outline-none focus:border-red-500 transition-colors"
      />
      <svg
        class="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
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
      <button
        class="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        Search
      </button>
    </div>

    <div class="flex flex-wrap justify-center gap-4 mb-8">
      <button
        class="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
      >
        All
      </button>
      <button
        class="px-6 py-2 bg-[#1A1A1A] text-gray-300 rounded-full hover:bg-[#2A2A2A] hover:text-white transition-colors"
      >
        Anime
      </button>
      <button
        class="px-6 py-2 bg-[#1A1A1A] text-gray-300 rounded-full hover:bg-[#2A2A2A] hover:text-white transition-colors"
      >
        Manga
      </button>
      <button
        class="px-6 py-2 bg-[#1A1A1A] text-gray-300 rounded-full hover:bg-[#2A2A2A] hover:text-white transition-colors"
      >
        Characters
      </button>
    </div>
    
    <div class="text-center">
      <p class="text-gray-400 mb-4">Popular searches:</p>
      <div class="flex flex-wrap justify-center gap-2">
        <span
          class="px-3 py-1 bg-[#2A2A2A] text-gray-300 rounded-full text-sm cursor-pointer hover:bg-red-500 hover:text-white transition-colors"
          >Attack on Titan</span
        >
        <span
          class="px-3 py-1 bg-[#2A2A2A] text-gray-300 rounded-full text-sm cursor-pointer hover:bg-red-500 hover:text-white transition-colors"
          >Demon Slayer</span
        >
        <span
          class="px-3 py-1 bg-[#2A2A2A] text-gray-300 rounded-full text-sm cursor-pointer hover:bg-red-500 hover:text-white transition-colors"
          >One Piece</span
        >
        <span
          class="px-3 py-1 bg-[#2A2A2A] text-gray-300 rounded-full text-sm cursor-pointer hover:bg-red-500 hover:text-white transition-colors"
          >Naruto</span
        >
        <span
          class="px-3 py-1 bg-[#2A2A2A] text-gray-300 rounded-full text-sm cursor-pointer hover:bg-red-500 hover:text-white transition-colors"
          >Jujutsu Kaisen</span
        >
      </div>
    </div>
  </div>
</section>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
    <div class="lg:col-span-1">
      <div class="bg-[#1A1A1A] rounded-lg p-6 sticky top-24">
        <h3 class="text-xl font-bold text-white mb-6">Filters</h3>

        <div class="mb-6">
          <h4 class="font-semibold text-white mb-3">Type</h4>
          <div class="space-y-2">
            <label class="flex items-center">
              <input type="checkbox" checked class="mr-3 accent-red-500" />
              <span class="text-gray-300">Anime</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" checked class="mr-3 accent-red-500" />
              <span class="text-gray-300">Manga</span>
            </label>
          </div>
        </div>

        <div class="mb-6">
          <h4 class="font-semibold text-white mb-3">Genre</h4>
          <div class="space-y-2 max-h-48 overflow-y-auto">
            <label class="flex items-center">
              <input type="checkbox" class="mr-3 accent-red-500" />
              <span class="text-gray-300">Action</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" class="mr-3 accent-red-500" />
              <span class="text-gray-300">Adventure</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" class="mr-3 accent-red-500" />
              <span class="text-gray-300">Comedy</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" class="mr-3 accent-red-500" />
              <span class="text-gray-300">Drama</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" class="mr-3 accent-red-500" />
              <span class="text-gray-300">Fantasy</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" class="mr-3 accent-red-500" />
              <span class="text-gray-300">Horror</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" class="mr-3 accent-red-500" />
              <span class="text-gray-300">Romance</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" class="mr-3 accent-red-500" />
              <span class="text-gray-300">Sci-Fi</span>
            </label>
          </div>
        </div>

        <div class="mb-6">
          <h4 class="font-semibold text-white mb-3">Status</h4>
          <div class="space-y-2">
            <label class="flex items-center">
              <input type="checkbox" class="mr-3 accent-red-500" />
              <span class="text-gray-300">Ongoing</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" class="mr-3 accent-red-500" />
              <span class="text-gray-300">Completed</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" class="mr-3 accent-red-500" />
              <span class="text-gray-300">Upcoming</span>
            </label>
          </div>
        </div>

        <div class="mb-6">
          <h4 class="font-semibold text-white mb-3">Year</h4>
          <select
            class="w-full px-3 py-2 bg-[#2A2A2A] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
          >
            <option>All Years</option>
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
            <option>2021</option>
            <option>2020</option>
          </select>
        </div>

        <div class="mb-6">
          <h4 class="font-semibold text-white mb-3">Minimum Rating</h4>
          <input type="range" min="1" max="10" value="7" class="w-full accent-red-500" />
          <div class="flex justify-between text-gray-400 text-sm mt-1">
            <span>1</span>
            <span>10</span>
          </div>
        </div>

        <button
          class="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>

    <div class="lg:col-span-3">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-2xl font-bold text-white">Search Results</h2>
          <p class="text-gray-400">Found 1,234 results for "attack"</p>
        </div>
        <select
          class="px-3 py-2 bg-[#1A1A1A] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
        >
          <option>Most Relevant</option>
          <option>Latest</option>
          <option>Highest Rated</option>
          <option>Most Popular</option>
          <option>A-Z</option>
        </select>
      </div>

      <div class="space-y-6">
        <div
          class="bg-[#1A1A1A] rounded-lg p-6 hover:bg-[#2A2A2A] transition-colors cursor-pointer"
        >
          <div class="flex items-start space-x-4">
            <div
              class="w-20 h-28 bg-gradient-to-br from-red-500 to-red-800 rounded-lg flex-shrink-0"
            ></div>
            <div class="flex-1">
              <div class="flex items-center space-x-2 mb-2">
                <span class="bg-red-500 text-white text-xs px-2 py-1 rounded">ANIME</span>
                <span class="bg-green-600 text-white text-xs px-2 py-1 rounded">COMPLETED</span>
              </div>
              <h3 class="text-xl font-bold text-white mb-2 hover:text-red-500 transition-colors">
                Attack on Titan
              </h3>
              <p class="text-gray-400 mb-3">
                Humanity fights for survival against giant humanoid Titans that have brought
                civilization to the brink of extinction.
              </p>
              <div class="flex items-center space-x-4 text-sm">
                <span class="text-yellow-400">★ 9.0</span>
                <span class="text-gray-400">Action, Drama, Fantasy</span>
                <span class="text-gray-400">2013-2023</span>
                <span class="text-gray-400">87 Episodes</span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-[#1A1A1A] rounded-lg p-6 hover:bg-[#2A2A2A] transition-colors cursor-pointer"
        >
          <div class="flex items-start space-x-4">
            <div
              class="w-20 h-28 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex-shrink-0"
            ></div>
            <div class="flex-1">
              <div class="flex items-center space-x-2 mb-2">
                <span class="bg-blue-600 text-white text-xs px-2 py-1 rounded">MANGA</span>
                <span class="bg-green-600 text-white text-xs px-2 py-1 rounded">COMPLETED</span>
              </div>
              <h3 class="text-xl font-bold text-white mb-2 hover:text-red-500 transition-colors">
                Attack on Titan
              </h3>
              <p class="text-gray-400 mb-3">
                The original manga series that inspired the acclaimed anime adaptation. Follow
                Eren's journey from the beginning.
              </p>
              <div class="flex items-center space-x-4 text-sm">
                <span class="text-yellow-400">★ 9.2</span>
                <span class="text-gray-400">Action, Drama, Fantasy</span>
                <span class="text-gray-400">2009-2021</span>
                <span class="text-gray-400">139 Chapters</span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-[#1A1A1A] rounded-lg p-6 hover:bg-[#2A2A2A] transition-colors cursor-pointer"
        >
          <div class="flex items-start space-x-4">
            <div
              class="w-20 h-28 bg-gradient-to-br from-blue-600 to-purple-800 rounded-lg flex-shrink-0"
            ></div>
            <div class="flex-1">
              <div class="flex items-center space-x-2 mb-2">
                <span class="bg-red-500 text-white text-xs px-2 py-1 rounded">ANIME</span>
                <span class="bg-blue-600 text-white text-xs px-2 py-1 rounded">ONGOING</span>
              </div>
              <h3 class="text-xl font-bold text-white mb-2 hover:text-red-500 transition-colors">
                Demon Slayer
              </h3>
              <p class="text-gray-400 mb-3">
                A young boy becomes a demon slayer to avenge his family and cure his sister who has
                been turned into a demon.
              </p>
              <div class="flex items-center space-x-4 text-sm">
                <span class="text-yellow-400">★ 8.7</span>
                <span class="text-gray-400">Action, Supernatural, Historical</span>
                <span class="text-gray-400">2019-2024</span>
                <span class="text-gray-400">44 Episodes</span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-[#1A1A1A] rounded-lg p-6 hover:bg-[#2A2A2A] transition-colors cursor-pointer"
        >
          <div class="flex items-start space-x-4">
            <div
              class="w-20 h-28 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex-shrink-0"
            ></div>
            <div class="flex-1">
              <div class="flex items-center space-x-2 mb-2">
                <span class="bg-red-500 text-white text-xs px-2 py-1 rounded">ANIME</span>
                <span class="bg-blue-600 text-white text-xs px-2 py-1 rounded">ONGOING</span>
              </div>
              <h3 class="text-xl font-bold text-white mb-2 hover:text-red-500 transition-colors">
                My Hero Academia
              </h3>
              <p class="text-gray-400 mb-3">
                In a world where most people have superpowers, a powerless boy enrolls in a
                prestigious hero academy.
              </p>
              <div class="flex items-center space-x-4 text-sm">
                <span class="text-yellow-400">★ 8.5</span>
                <span class="text-gray-400">Action, School, Super Power</span>
                <span class="text-gray-400">2016-2024</span>
                <span class="text-gray-400">138 Episodes</span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-[#1A1A1A] rounded-lg p-6 hover:bg-[#2A2A2A] transition-colors cursor-pointer"
        >
          <div class="flex items-start space-x-4">
            <div
              class="w-20 h-28 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex-shrink-0"
            ></div>
            <div class="flex-1">
              <div class="flex items-center space-x-2 mb-2">
                <span class="bg-blue-600 text-white text-xs px-2 py-1 rounded">MANGA</span>
                <span class="bg-green-600 text-white text-xs px-2 py-1 rounded">COMPLETED</span>
              </div>
              <h3 class="text-xl font-bold text-white mb-2 hover:text-red-500 transition-colors">
                Jujutsu Kaisen
              </h3>
              <p class="text-gray-400 mb-3">
                A high school student joins a secret organization of Jujutsu Sorcerers to kill a
                powerful Curse named Ryomen Sukuna.
              </p>
              <div class="flex items-center space-x-4 text-sm">
                <span class="text-yellow-400">★ 8.9</span>
                <span class="text-gray-400">Action, Supernatural, School</span>
                <span class="text-gray-400">2018-2024</span>
                <span class="text-gray-400">271 Chapters</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-12">
        <nav class="flex items-center space-x-2">
          <button class="px-3 py-2 text-gray-400 hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
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
            >25</button
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
  </div>
</div>
